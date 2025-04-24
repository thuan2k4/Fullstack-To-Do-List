from flask import Flask
from extension import db, cors, api
from api import apiTask_bp
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI", "")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", "")
    
    db.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    
    app.register_blueprint(apiTask_bp)
    
    with app.app_context():
        db.create_all()

    return app