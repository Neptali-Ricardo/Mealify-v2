"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import re

api = Blueprint('api', __name__)

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
MSG_MISSING_DATA = "Todos los datos son necesarios"
MSG_INVALID_DATA = "Datos inválidos"
MSG_EMAIL_EXISTS = "El correo ya existe!"
MSG_SUCCESS = "Usuario registrado exitosamente"

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Endpoint para registrar un nuevo usuario.
@api.route('/register', methods=['POST'])
def register():
    """
    Endpoint para registrar un nuevo usuario.
    Recibe un JSON con 'user', 'email' y 'password'.
    Retorna un token JWT si el registro es exitoso.
    """
    user = request.json.get('user', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # Validar datos faltantes
    if not user or not email or not password:
        return jsonify({"msg": MSG_MISSING_DATA}), 400

    if not isinstance(user, str) or not isinstance(email, str) or not isinstance(password, str) or not EMAIL_REGEX.match(email):
        return jsonify({"msg": MSG_INVALID_DATA}), 400

    # Verificar si el correo o el usuario ya existen
    existing_user = Users.query.filter(
        (Users.email == email) | (Users.user == user)
    ).first()
    if existing_user:
        if existing_user.email == email:
            return jsonify({"msg": "El correo ya existe"}), 409
        if existing_user.user == user:
            return jsonify({"msg": "El nombre de usuario ya existe"}), 409

    try:
        # Crear un nuevo usuario con contraseña encriptada
        hashed_password = generate_password_hash(password)
        new_user = Users(
            user=user,
            email=email,
            password=hashed_password,
            is_active=True
        )
        db.session.add(new_user)
        db.session.commit()
        
        # Crear y retornar el token JWT
        token = create_access_token(identity=str(new_user.id))
        return jsonify({"msg": MSG_SUCCESS, "token": token}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500
    

# Endpoint para obtener todos los usuarios de la base de datos.
@api.route('/users', methods=['GET'])
def get_users():
    """
    Endpoint para obtener todos los usuarios.
    Retorna una lista de usuarios serializados en formato JSON.
    Ejemplo de respuesta:
    {
        "msg": "Usuarios obtenidos correctamente",
        "payload": [
            {
                "id": 1,
                "user": "user1",
                "email": "user1@example.com"
            },
            ...
        ]
    }
    """
    try:
        # Obtener todos los usuarios de la base de datos
        users = Users.query.all()
        
        # Si no hay usuarios, retornar un mensaje adecuado
        if not users:
            return jsonify({"msg": "No users found"}), 404

        # Serializar los usuarios y devolverlos
        users_serialized = [user.serialize() for user in users]
        return jsonify({
            "msg": "Usuarios obtenidos correctamente",
            "payload": users_serialized
        }), 200

    except SQLAlchemyError as e:
        # Manejo de errores específicos de la base de datos
        return jsonify({
            "msg": "Error al obtener los usuarios",
            "error": f"Database query failed: {str(e)}"
        }), 500
    except Exception as e:
        # Manejo de errores generales
        return jsonify({
            "msg": "Unexpected error",
            "error": str(e)
        }), 500