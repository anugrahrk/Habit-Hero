# Habit Hero - Habit Tracker Application

## Overview  
Habit Hero is a React-based habit tracking app supporting daily and weekly habits, notes, progress tracking, streaks, XP, AI recommended habits, and PDF reports.

---

## Frontend Setup Instructions

1. Clone the repo:  
   `git clone https://github.com/yourusername/habit-hero.git`  
   `cd habit-hero`
   `cd frontend`


2. Install dependencies:  
   `npm install`


3. Create `.env` file in project root with:  
   `VITE_API_URL=http://localhost:5000/api/`  
   (Update the URL to your backend API)

4. Run frontend dev server:  
   `npm run dev`

5. Make sure your backend API is running and supports routes:  
   - `GET /api/view` (fetch all habits)  
   - `PUT /api/habits/:id` (update habit fields)  
   - `DELETE /api/habits/delete/:id` (delete habit)  
   - `POST /api/add` (add new habit)  
   - `POST /api/habits/recommend` (fetch AI recommended habits)

6. Open the browser at the given URL (usually `http://localhost:3000`)


---

## Frontend Setup Instructions

1. Change Directory:    
   `cd habit-hero`
   `cd backend`


2. Install dependencies:  
    `python -m venv venv`
   `.\venv\Scripts\Activate`
   `pip install -r requirements.txt`


3. Create `.env` file in project root with:  
   `DATABASE_URL=`
   `GEMINI_API_KEY=`  

4. Run frontend dev server:  
   `python app.py`


5. Open the browser/postman at the given URL (usually `http://127.0.0.1:5000/`)
---

## Features

- Track daily and weekly habits  
- Filter habits by categories (Health, Work, Learning)  
- Add new habits with title, start date, frequency, and category  
- Add and edit notes for each habit  
- View progress with completion percentage, streak count, best day, and XP earned  
- Earn 100 XP for each completed habit  
- Calendar view to select and track dates  
- AI generated habit recommendations to add with a click  
- Generate weekly PDF reports for habits

---

## Technologies Used

- React  
- Jotai (state management)  
- Axios (API calls)  
- React Calendar  
- React Circular Progressbar  
- React PDF Renderer  
- Flask
- gemini

---

## Notes

- XP increments by 100 for every completed habit  
- Weekly habits logic based on ISO week number comparison  
- Backend API must follow the expected REST routes and data formats  
- Uses localStorage to persist streak count and last checked date  

---