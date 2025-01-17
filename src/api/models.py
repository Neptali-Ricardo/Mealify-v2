from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(120), unique=True, nullable=False)  # Campo obligatorio
    email = db.Column(db.String(120), unique=True, nullable=False)  # Campo obligatorio
    password = db.Column(db.String(250), nullable=False)  # Campo obligatorio
    is_active = db.Column(db.Boolean(), nullable=False, default=True)  # Campo obligatorio, valor predeterminado True

    def __repr__(self):
        return f'<Users {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "email": self.email,
        }

class My_Plans(db.Model):
    __table__ = 'my_plans'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    plan = db.Column(db.String, nullable=False)
    create_at = db.Column(db.Date, nullable=False) 
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Plans {self.name}/>'
        
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plan": self.plan,
            "create_at": self.create_at,
            "name": self.name
        }
    
class Perfil(db.Model):
    __tablename__ = 'perfil'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    alergenos = db.Column(db.JSON)
    comensales = db.Column(db.Integer, nullable=False)
    condicion = db.Column(db.JSON)

    user = db.relationship('Users', backref='perfiles')  # Relación con Users

    def __repr__(self):
        return f'<Perfil {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "alergenos": self.alergenos,
            "comensales": self.comensales,
            "condicion": self.condicion,
        }