from extension import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

#Models
class Todo(db.Model):
    __tablename__ = 'todo_task'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    complete = db.Column(db.String(10), default='danger')
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "complete": self.complete
        }
    def __repr__(self):
        return f"<Todo {self.title}>"


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.Text())
    access_jti = db.Column(db.String(), nullable=True)
    refresh_jti = db.Column(db.String(), nullable=True)
    token_expiry = db.Column(db.DateTime(), nullable=True)
    todos = db.relationship('Todo', backref='user', lazy=True, cascade="all, delete-orphan")
    # task có thể truy ngược về User thông qua tham số user
    # lazy=True là để select, cascade: all-> khi xóa 1 user - xóa hết task, delete-orphan - xóa các task không có relation
    
    def set_password(self, password):
        self.password = generate_password_hash(password) #hashes the password
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    def add(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()