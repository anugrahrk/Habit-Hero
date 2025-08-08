
from db import db

class Habit(db.Model):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    frequency = db.Column(db.String(20), nullable=False) 
    category = db.Column(db.String(10), nullable=True)
    completed = db.Column(db.Boolean, default=False)
    startdate=db.Column(db.String(10), nullable=False)
    notes=db.Column(db.String(),nullable=True)

    def __repr__(self):
        return f"<Habit {self.name}>"
