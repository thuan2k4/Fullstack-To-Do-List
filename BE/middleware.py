from extensions import jwt
from flask import jsonify
from models import User

def init_app_jwt(app):
    jwt.init_app(app)
    
    #load user
    @jwt.user_lookup_loader
    def user_lookup_callback(jwt_header, jwt_data):
        identity = jwt_data['sub']
        return User.query.filter_by(username=identity).one_or_none() 
    
    #additional claims loader
    @jwt.additional_claims_loader
    def add_claims_to_access_token(identity):
        if identity == 'Admin':
            return {"is_staff": True}
        return {"is_staff": False}
    
    #Token expired
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "message": "The token has expired.",
            "error": "token_expired"
        }), 401
    
    #Invalid Token
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            "message": "Signature verification failed.",
            "error": "invalid_token"
        }), 401
    
    #Miss token
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            "message": "Request does not contain an access token.",
            "error": "authorization_required"
        }), 401
    
    #Token Revoke
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        jti = jwt_payload['jti']
        token_type = jwt_payload['type']
        identity = jwt_payload['sub']
        
        user = User.query.filter_by(username=identity).first()
        if not user:
            return True
        
        if token_type == 'access':
            return user.access_jti != jti
        elif token_type == 'refresh':
            return user.refresh_jti != jti
        return True