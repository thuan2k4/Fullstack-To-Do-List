from flask import Blueprint, request, jsonify
from flask_restful import Resource
from extension import db, api
from models import Todo

apiTask_bp = Blueprint('apiTask', __name__)

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

class ToDoListAPI(Resource):
    def get(self):
        tasks = Todo.query.all()
        data = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "complete": task.complete
        } for task in tasks]
        
        return jsonify(data)

#Register API
api.add_resource(ToDoListAPI, "/api/todos")
api.add_resource(TodoAPI, "/api/todo", methods=["POST"], endpoint="Create") 
api.add_resource(TodoAPI, "/api/todo/<int:todo_id>", methods=["PUT", "DELETE"], endpoint="Update-Delete")