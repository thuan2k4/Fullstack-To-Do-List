from flask import Blueprint, request, jsonify
from flask_restful import Resource, Api
from extensions import db
from models import Todo, User
from flask_jwt_extended import jwt_required, get_jwt_identity
import joblib
import pandas as pd

apiTask_bp = Blueprint('apiTask', __name__)
api = Api(apiTask_bp)


#API
class TodoAPI(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=get_jwt_identity()).first() 
        # find user who add task
        
        task = Todo (
            user_id=user.id, 
            title=data.get("title"),
            description=data.get("description"),
        )
        
        db.session.add(task)
        db.session.commit()
        return task.to_dict(), 201
    
    @jwt_required()
    def put(self, todo_id):
        data = request.get_json()
        user = User.query.filter_by(username=get_jwt_identity()).first()
        task = Todo.query.filter_by(id=todo_id, user_id=user.id).first()
        
        if not task:
            return {"error": "Task not found"}, 404
        
        task.title = data.get("title")
        task.description = data.get("description")
        task.complete = data.get("complete")
        
        db.session.commit()
        return task.to_dict(), 200
    
    @jwt_required()
    def delete(self, todo_id):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        obj = Todo.query.filter_by(id=todo_id, user_id=user.id).first()
        if obj:
            db.session.delete(obj)
            db.session.commit()
            return {"message": "Task deleted"}, 200
        else:
            return {"error": "Task not found or you do not have permission"}, 404

class ToDoListAPI(Resource):
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        if not user:
            return {"error": "User not found"}, 404
        
        tasks = Todo.query.filter_by(user_id=user.id).all()
        data = [
            {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "complete": task.complete,
                "user_id": task.user_id
            } for task in tasks
        ]
        
        return data

def getModel(input):
    try:
        model_dict = joblib.load('iris_logistic_model_with_outliers.pkl')
        scaler = model_dict['scaler']
        model = model_dict['model']
        accuracy = model_dict.get('accuracy', None)
        
        input_transformed = scaler.transform(input)
        prediction = model.predict(input_transformed)[0]
        
        return {
            "prediction": int(prediction),
            "accuracy": accuracy
        }
    except Exception as e:
        raise Exception(f"Prediction failed: {str(e)}")

class Iris(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        sepal_length = data['sepal_length']
        sepal_width = data['sepal_width']
        petal_length = data['petal_length']
        petal_width = data['petal_width']
        
        input = pd.DataFrame(
            [[sepal_length, sepal_width, petal_length, petal_width]],
            columns=['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']
        )

        result = getModel(input)
        return result, 200

#Register API
api.add_resource(ToDoListAPI, "/todos")
api.add_resource(TodoAPI, "/todo", methods=["POST"], endpoint="Create") 
api.add_resource(TodoAPI, "/todo/<int:todo_id>", methods=["PUT", "DELETE"], endpoint="Update-Delete")
api.add_resource(Iris, '/predict', methods=["POST"])