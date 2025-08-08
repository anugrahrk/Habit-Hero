
from flask import Flask, jsonify,request
from flask_cors import CORS
from db import db
import google.generativeai as genai
from models import Habit
import os
from dotenv import load_dotenv
import json
from datetime import date

load_dotenv()


app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/signin', methods=['POST'])
def signin():
    data=request.get_json()
    username=data.get("username")
    password=data.get("password")
    if username=="admin" and password=="admin":
        return jsonify({"msg":"Login sucess"}),200
    else:
        return jsonify({"msg":"Invalid Credentials"}),401
@app.route('/view',methods=['GET'])
def get_habit():
    habit=Habit.query.all()
    habits_list=[{
        "id":h.id,
        "name":h.name,
        "frequency":h.frequency,
        "completed":h.completed ,
        "startdate":h.startdate,
        "category":h.category 
    }
    for h in habit 
    ]
    return jsonify(habits_list),200
    
@app.route("/add",methods=['POST'])
def add_habit():
    data=request.get_json()
    name=data.get('name')
    frequency=data.get('frequency')
    startdate=data.get('startdate')
    category=data.get('category')

    new_habit = Habit(name=name, frequency=frequency,startdate=startdate,category=category)
    db.session.add(new_habit)
    db.session.commit()
    return jsonify({"message":"Habit added successfully","habit_id":new_habit.id}),200
@app.route("/habits/<int:habit_id>", methods=['PUT'])
def update_habit(habit_id):
    habit=Habit.query.get(habit_id)
    if not habit:
        return jsonify({"msg":"Habit not found"}),404
    data=request.get_json()
    
    habit.name=data.get("name",habit.name)
    habit.frequency=data.get("frequency",habit.frequency)
    habit.completed=data.get("completed",habit.completed)
    habit.notes=data.get("notes",habit.notes)
    db.session.commit()
    return jsonify({"msg":"Habit updated sucessfully"},200)
@app.route("/habits/delete/<int:habit_id>",methods=['DELETE'])
def delete_habit(habit_id):
    habit=Habit.query.get(habit_id)
    if not habit:
        return jsonify({"msg":"Habit not found"}),404
    db.session.delete(habit)
    db.session.commit()
    return jsonify({"msg":"Habit deleted"}),200
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
@app.route("/habits/recommend", methods=['GET'])
def recommend_habits():
    habits = Habit.query.all()
    habit_list = [habit.name for habit in habits] 

    prompt = f"""
You are an AI habit coach.
The user currently has these habits: {habit_list}
Recommend 5 new habits based on these, but return ONLY valid JSON in this format:
[
  {{"habit": "Drink 2L water daily", "reason": "Improves hydration and skin health", "category": "health"}},
  {{"habit": "Read 10 pages of a book", "reason": "Improves focus and knowledge" , "category": "learning"}}
]
category must either three of these health, work, learning select wisely

"""

    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    raw_response = response.text.strip()

    raw_response = raw_response.replace("```json", "").replace("```", "").strip()

    try:
        habits_data = json.loads(raw_response)
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid response from AI", "raw": raw_response}), 500

    structured_habits = []
    for h in habits_data:
        structured_habits.append({
            "name": h["habit"],
            "frequency": "daily",
            "category": h["category"],
            "startdate": str(date.today()),
            "completed": False,
            "notes": h["reason"]
        })

    return jsonify(structured_habits)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
