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