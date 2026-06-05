from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List
import pickle
import numpy as np
import logging
from datetime import datetime

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="NSAP Eligibility Predictor API",
    description="ML-based API to predict NSAP scheme eligibility for districts",
    version="1.0.0",
    contact={
        "name": "NSAP Predictor Team",
        "url": "https://github.com/your-repo",
    }
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model load
try:
    with open('nsap_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('label_encoder.pkl', 'rb') as f:
        le = pickle.load(f)
    logger.info("✅ Model loaded successfully!")
except Exception as e:
    logger.error(f"❌ Model loading failed: {e}")
    raise RuntimeError("Model files not found!")

# Scheme info
scheme_names = {
    'IGNOAPS': 'Indira Gandhi National Old Age Pension Scheme',
    'IGNWPS': 'Indira Gandhi National Widow Pension Scheme',
    'IGNDPS': 'Indira Gandhi National Disability Pension Scheme',
    'NFBS': 'National Family Benefit Scheme'
}

scheme_descriptions = {
    'IGNOAPS': 'Provides financial assistance to elderly persons above 60 years from BPL households',
    'IGNWPS': 'Provides financial assistance to widows aged 40-79 years from BPL households',
    'IGNDPS': 'Provides financial assistance to severely/multiple disabled persons from BPL households',
    'NFBS': 'Provides lump sum financial assistance on death of primary breadwinner in BPL household'
}

# Input model with validation
class PredictRequest(BaseModel):
    lgdstatecode: int = Field(..., ge=1, le=35, description="LGD State Code (1-35)")
    lgddistrictcode: int = Field(..., ge=1, le=800, description="LGD District Code")
    totalbeneficiaries: int = Field(..., ge=1, description="Total beneficiaries must be at least 1")
    totalmale: int = Field(..., ge=0, description="Total male beneficiaries")
    totalfemale: int = Field(..., ge=0, description="Total female beneficiaries")
    totaltransgender: int = Field(..., ge=0, description="Total transgender beneficiaries")
    totalsc: int = Field(..., ge=0, description="Total SC beneficiaries")
    totalst: int = Field(..., ge=0, description="Total ST beneficiaries")
    totalgen: int = Field(..., ge=0, description="Total General beneficiaries")
    totalobc: int = Field(..., ge=0, description="Total OBC beneficiaries")
    totalaadhaar: int = Field(..., ge=0, description="Total Aadhaar linked")
    totalmpbilenumber: int = Field(..., ge=0, description="Total mobile linked")

    @validator('totalbeneficiaries')
    def check_total(cls, v, values):
        male = values.get('totalmale', 0)
        female = values.get('totalfemale', 0)
        transgender = values.get('totaltransgender', 0)
        if male + female + transgender > v:
            raise ValueError('Male + Female + Transgender cannot exceed Total Beneficiaries')
        return v

    @validator('totalaadhaar')
    def check_aadhaar(cls, v, values):
        total = values.get('totalbeneficiaries', 0)
        if v > total:
            raise ValueError('Aadhaar linked cannot exceed Total Beneficiaries')
        return v

    @validator('totalmpbilenumber')
    def check_mobile(cls, v, values):
        total = values.get('totalbeneficiaries', 0)
        if v > total:
            raise ValueError('Mobile linked cannot exceed Total Beneficiaries')
        return v

# Batch input
class BatchPredictRequest(BaseModel):
    records: List[PredictRequest] = Field(..., max_items=50, description="Max 50 records at once")

# Response model
class PredictResponse(BaseModel):
    scheme: str
    scheme_full_name: str
    scheme_description: str
    confidence: float
    all_probabilities: dict
    timestamp: str

# Routes
@app.get("/", tags=["Health"])
def root():
    return {
        "message": "NSAP Eligibility Predictor API",
        "status": "running",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "model": "Random Forest Classifier",
        "accuracy": "95%",
        "schemes": list(scheme_names.keys()),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/schemes", tags=["Info"])
def get_schemes():
    return {
        "schemes": [
            {
                "code": code,
                "full_name": scheme_names[code],
                "description": scheme_descriptions[code]
            }
            for code in scheme_names
        ]
    }

@app.post("/predict", response_model=PredictResponse, tags=["Prediction"])
def predict(data: PredictRequest):
    try:
        features = [[
            data.lgdstatecode, data.lgddistrictcode,
            data.totalbeneficiaries, data.totalmale,
            data.totalfemale, data.totaltransgender,
            data.totalsc, data.totalst, data.totalgen,
            data.totalobc, data.totalaadhaar, data.totalmpbilenumber
        ]]

        prediction = model.predict(features)
        proba = model.predict_proba(features)[0]
        scheme = le.inverse_transform(prediction)[0]
        confidence = round(float(max(proba)) * 100, 2)

        all_probs = {
            le.classes_[i]: round(float(proba[i]) * 100, 2)
            for i in range(len(le.classes_))
        }

        logger.info(f"Prediction: {scheme} ({confidence}%) for State {data.lgdstatecode}, District {data.lgddistrictcode}")

        return PredictResponse(
            scheme=scheme,
            scheme_full_name=scheme_names.get(scheme, scheme),
            scheme_description=scheme_descriptions.get(scheme, ""),
            confidence=confidence,
            all_probabilities=all_probs,
            timestamp=datetime.now().isoformat()
        )

    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed. Please try again.")

@app.post("/predict/batch", tags=["Prediction"])
def batch_predict(data: BatchPredictRequest):
    try:
        results = []
        for record in data.records:
            features = [[
                record.lgdstatecode, record.lgddistrictcode,
                record.totalbeneficiaries, record.totalmale,
                record.totalfemale, record.totaltransgender,
                record.totalsc, record.totalst, record.totalgen,
                record.totalobc, record.totalaadhaar, record.totalmpbilenumber
            ]]

            prediction = model.predict(features)
            proba = model.predict_proba(features)[0]
            scheme = le.inverse_transform(prediction)[0]
            confidence = round(float(max(proba)) * 100, 2)

            results.append({
                "scheme": scheme,
                "scheme_full_name": scheme_names.get(scheme, scheme),
                "confidence": confidence,
                "state_code": record.lgdstatecode,
                "district_code": record.lgddistrictcode
            })

        logger.info(f"Batch prediction: {len(results)} records processed")
        return {
            "total_records": len(results),
            "predictions": results,
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        logger.error(f"Batch prediction error: {e}")
        raise HTTPException(status_code=500, detail="Batch prediction failed.")