"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, My_Plans
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
    

# Endpoint para obtener usuario por id.
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    Endpoint para obtener un solo usuario por su ID.
    Retorna el usuario serializado.
    """
    try:
        # Obtener el usuario por ID
        user = Users.query.get(user_id)
        
         # Si no hay usuarios, retornar un mensaje adecuado
        if not user:
            return jsonify({"msg": "User not found"}), 404

        # Serializar el usuario y devolverlo
        return jsonify({
            "msg": "Usuario obtenido correctamente",
            "payload": user.serialize()
        }), 200

    except SQLAlchemyError as e:
        # Manejo de errores específicos de la base de datos
        return jsonify({
            "msg": "Error al obtener el usuario",
            "error": f"Database query failed: {str(e)}"
        }), 500
    except Exception as e:
        # Manejo de errores generales
        return jsonify({
            "msg": "Unexpected error",
            "error": str(e)
        }), 500
    

# Endpoint para obtener usuario por usuario o email.
@api.route('/users/search', methods=['GET'])
def search_user():
    """
    Endpoint para buscar un usuario por nombre de usuario o correo electrónico.
    Recibe parámetros de consulta 'user' o 'email'.
    """
    # Obtener el usuario por nombre de usuario o email
    user = request.args.get('user', None)
    email = request.args.get('email', None)

    # Si no hay parámetros de búsqueda, retorna mensaje
    if not user and not email:
        return jsonify({"msg": "Debe proporcionar un nombre de usuario o un correo electrónico para la búsqueda."}), 400

    try:
        if user:
            user_found = Users.query.filter_by(user=user).first()
        elif email:
            user_found = Users.query.filter_by(email=email).first()

        if user_found:
            return jsonify({
                "msg": "Usuario encontrado",
                "payload": user_found.serialize()
            }), 200
        else:
            return jsonify({"msg": "Usuario no encontrado"}), 404

    except SQLAlchemyError as e:
        # Manejo de errores específicos de la base de datos
        return jsonify({
            "msg": "Error al buscar el usuario",
            "error": f"Database query failed: {str(e)}"
        }), 500
    except Exception as e:
        # Manejo de errores generales
        return jsonify({
            "msg": "Unexpected error",
            "error": str(e)
        }), 500
    
# Endpoint para editar los datos de usuario.
@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """
    Endpoint para actualizar los datos de un usuario existente.
    """
    # Buscar el usuario en la base de datos por su ID
    user = Users.query.get(user_id)
    
    if user is None:
        # Retornar error si el usuario no existe
        return jsonify({"error": "User not found"}), 404

    # Obtener los datos enviados en el cuerpo de la solicitud
    data = request.get_json()

    if not data:
        # Retornar error si no se envían datos
        return jsonify({"error": "No data provided"}), 400

    # Validar y actualizar el nombre de usuario
    username = data.get("user")
    if username:
        if not isinstance(username, str) or len(username) < 3:
            return jsonify({"error": "Username must be at least 3 characters long"}), 400
        user.user = username

    # Validar y actualizar el correo electrónico si está presente
    if "email" in data:
        if not EMAIL_REGEX.match(data["email"]):
            # Retornar error si el formato del correo es inválido
            return jsonify({"error": "Invalid email format"}), 400
        user.email = data["email"]

    # Validar y actualizar la contraseña si está presente
    if "password" in data:
        if not isinstance(data["password"], str) or len(data["password"]) < 8:
            # Retornar error si la contraseña no cumple con los requisitos mínimos
            return jsonify({"error": "Password must be at least 8 characters long"}), 400
        user.password = generate_password_hash(data["password"])  # Hashear la nueva contraseña

    # Validar y actualizar el estado de actividad si está presente
    if "is_active" in data:
        if not isinstance(data["is_active"], bool):
            # Retornar error si el valor de 'is_active' no es un booleano
            return jsonify({"error": "Invalid value for 'is_active'. Must be a boolean"}), 400
        user.is_active = data["is_active"]

    # Guardar los cambios en la base de datos
    try:
        db.session.commit()
        # Retornar mensaje de éxito con los datos actualizados del usuario
        return jsonify({
            "message": f"User {user.user} and {user.email} updated successfully",
            "user": user.serialize()
        }), 200
    except SQLAlchemyError as e:
        # Manejo de errores relacionados con la base de datos
        db.session.rollback()
        return jsonify({
            "error": "Database error",
            "details": str(e)
        }), 500
    except Exception as e:
        # Manejo de errores generales no previstos
        db.session.rollback()
        return jsonify({
            "error": "Unexpected error",
            "details": str(e)
        }), 500

    
# Endpoint para obtener todos los planes
@api.route('/plans', methods=['GET'])
def get_all_plans():
    """
    Endpoint para obtener todos los planes.
    Retorna una lista de planes serializados en formato JSON.
    """
    try:
        plans = My_Plans.query.all()
        if not plans:
            return jsonify({"msg": "No plans found"}), 404
        
        plans_serialized = [plan.serialize() for plan in plans]
        return jsonify({
            "msg": "Planes obtenidos correctamente",
            "payload": plans_serialized
        }), 200
    except SQLAlchemyError as e:
        return jsonify({"msg": "Error al obtener los planes", "error": str(e)}), 500
    except Exception as e:
        return jsonify({"msg": "Unexpected error", "error": str(e)}), 500


# Endpoint para obtener un plan por ID
@api.route('/plan/<int:plan_id>', methods=['GET'])
def get_plan(plan_id):
    """
    Endpoint para obtener un solo plan por su ID.
    """
    try:
        plan = My_Plans.query.get(plan_id)
        if not plan:
            return jsonify({"msg": "Plan not found"}), 404
        
        return jsonify({
            "msg": "Plan obtenido correctamente",
            "payload": plan.serialize()
        }), 200
    except SQLAlchemyError as e:
        return jsonify({"msg": "Error al obtener el plan", "error": str(e)}), 500
    except Exception as e:
        return jsonify({"msg": "Unexpected error", "error": str(e)}), 500


# Endpoint para actualizar un plan por ID
@api.route('/plan/<int:plan_id>', methods=['PUT'])
def update_plan(plan_id):
    """
    Endpoint para actualizar un plan por su ID.
    Recibe un JSON con los campos a actualizar.
    """
    try:
        plan = My_Plans.query.get(plan_id)
        if not plan:
            return jsonify({"msg": "Plan not found"}), 404
        
        data = request.get_json()

        # Actualizar los campos permitidos
        plan.user_id = data.get('user_id', plan.user_id)
        plan.plan = data.get('plan', plan.plan)
        plan.create_at = data.get('create_at', plan.create_at)
        plan.name = data.get('name', plan.name)

        db.session.commit()
        return jsonify({"msg": "Plan actualizado correctamente", "payload": plan.serialize()}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar el plan", "error": str(e)}), 500
    except Exception as e:
        return jsonify({"msg": "Unexpected error", "error": str(e)}), 500


# Endpoint para eliminar un plan por ID
@api.route('/plan/<int:plan_id>', methods=['DELETE'])
def delete_plan(plan_id):
    """
    Endpoint para eliminar un plan por su ID.
    """
    try:
        plan = My_Plans.query.get(plan_id)
        if not plan:
            return jsonify({"msg": "Plan not found"}), 404
        
        db.session.delete(plan)
        db.session.commit()
        return jsonify({"msg": "Plan eliminado correctamente"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar el plan", "error": str(e)}), 500
    except Exception as e:
        return jsonify({"msg": "Unexpected error", "error": str(e)}), 500
