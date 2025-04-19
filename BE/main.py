from flask import Flask, redirect, url_for, request, jsonify
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)
CORS(app)

#Routes
@app.get("/api/getTaskList")
def index():
    tasks=Todo.query.all()
    data = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "complete": task.complete
        }
        for task in tasks
    ]
    return jsonify(data)

#Models
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    complete = db.Column(db.String(10), default="danger")
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "complete": self.complete
        }
    def __repr__(self):
        return f"<Todo {self.title}>"

#API
class TodoAPI(Resource):
    def post(self):
        data = request.get_json()
        task = Todo (
            title=data.get("title"),
            description=data.get("description")
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict(), 201
            
    def put(self, todo_id):
        data = request.get_json()
        task = Todo.query.filter_by(id=todo_id).first()
        
        if not task:
            return {"error": "Task not found"}, 404
        
        task.title = data.get("title")
        task.description = data.get("description")
        task.complete = data.get("complete")
        
        db.session.commit()
        return task.to_dict(), 200
            
    def delete(self, todo_id):
        obj = Todo.query.filter_by(id=todo_id).first()
        if obj:
            db.session.delete(obj)
            db.session.commit()
            return {"message": "Task deleted"}, 200
        else:
            return {"error": "Task not found"}, 404

#Register API
api.add_resource(TodoAPI, "/api/todo", methods=["POST"], endpoint="Create") 
api.add_resource(TodoAPI, "/api/todo/<int:todo_id>", methods=["PUT", "DELETE"], endpoint="Update-Delete")


#create db
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host=os.getenv("HOST"), port=os.getenv("PORT"))

#update no reload