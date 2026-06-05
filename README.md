# 🏛️ NSAP Eligibility Predictor

> Predicting NSAP Scheme Eligibility using Machine Learning
> IBM SkillsBuild University Engagements — AICTE 2026 | Problem Statement No. 34

---

## 📌 Problem Statement

The National Social Assistance Programme (NSAP) provides financial aid to elderly, widows, and disabled persons from BPL households. Manually verifying and assigning the correct scheme is time-consuming and error-prone.

This project builds an ML model that **automatically predicts the most appropriate NSAP scheme** for a district based on demographic and socio-economic data.

---

## 🏗️ Project Structure
NSAP_Project/
├── backend/
│   ├── main.py              # FastAPI Backend
│   ├── nsap_model.pkl       # Trained Random Forest Model
│   ├── label_encoder.pkl    # Label Encoder
│   └── requirements.txt     # Python Dependencies
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main React App
│   │   ├── App.css          # Styling
│   │   ├── pages/
│   │   │   └── Dashboard.tsx
│   │   └── data/
│   │       └── states.ts
│   └── package.json
└── README.md

---

## 🤖 ML Model

| Property | Value |
|---|---|
| Algorithm | Random Forest Classifier |
| Dataset | AI Kosh — District-wise NSAP Pension Data |
| Training Records | 100 |
| Accuracy | **95%** |
| Platform | IBM Watson Studio |

### Per-Scheme Performance

| Scheme | Precision | Recall | F1 Score |
|---|---|---|---|
| IGNOAPS | 100% | 100% | 100% |
| IGNWPS | 100% | 80% | 89% |
| IGNDPS | 89% | 100% | 94% |
| **Overall** | **96%** | **95%** | **95%** |

---

## 🏛️ NSAP Schemes

| Code | Full Name | Beneficiary |
|---|---|---|
| IGNOAPS | Indira Gandhi National Old Age Pension Scheme | Elderly BPL citizens |
| IGNWPS | Indira Gandhi National Widow Pension Scheme | Widows from BPL families |
| IGNDPS | Indira Gandhi National Disability Pension Scheme | Severely disabled persons |
| NFBS | National Family Benefit Scheme | On death of primary breadwinner |

---

## ✅ Latest Updates

- Fixed the header layout and restored the search bar to its proper position.
- Removed the backend status badge from the top UI.
- Wired the frontend predictor to call the backend `/predict` endpoint.
- Completed broader Hindi translation support for UI sections.
- Confirmed frontend build success after the latest changes.

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** — REST API
- **Uvicorn** — ASGI Server
- **Scikit-learn** — ML Model
- **IBM Watson Studio** — Model Training Platform

### Frontend
- **React + TypeScript** — UI Framework
- **Recharts** — Data Visualization
- **Axios** — API Calls
- **React Router** — Navigation

---

## 🚀 How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Access
- Frontend: http://localhost:5173
- Backend API: http://127.0.0.1:8000
- API Docs: http://127.0.0.1:8000/docs

---

## 📊 Dataset

- **Source:** AI Kosh (Government of India)
- **Link:** https://aikosh.indiaai.gov.in/web/datasets/details/district_wise_pension_data_under_the_national_social_assistance_programme_nsap_1.html
- **Records:** 100 district-wise pension records
- **Features:** 16 columns including state, district, gender, category, digital inclusion data

---

## 👩‍💻 Team
-**Name:** Diksha Phartyal
- **Institution:** Govind Ballabh Pant Institute of Engineering & Technology
- **Program:** IBM SkillsBuild University Engagements — AICTE 2026
- **Problem Statement:** No. 34 — Predicting NSAP Scheme Eligibility using ML
