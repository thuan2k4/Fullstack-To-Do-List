from flask import Flask
from extensions import db, cors, api
from middleware import init_app_jwt
from api import apiTask_bp
from dotenv import load_dotenv
from auth import auth_bp
from datetime import timedelta
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI", "")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", "")
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "")
    
    jwt_expires = os.getenv("JWT_ACCESS_TOKEN_EXPIRES", "3600") 
    try:
        app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(jwt_expires)
    except ValueError:
        app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(seconds=int(jwt_expires))
    
    db.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    init_app_jwt(app)
    
    app.register_blueprint(apiTask_bp, url_prefix='/tasks/api/v1')
    app.register_blueprint(auth_bp, url_prefix='/users/api/v1')

    with app.app_context():
        db.create_all()

    return app