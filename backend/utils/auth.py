import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from passlib.context import CryptContext
from jose import jwt

load_dotenv()

# Configure password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings — now read from .env
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def hash_password(password: str) -> str:
    """Scrambles a plain-text password before saving to the database."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Checks if a typed password matches the stored hashed version."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict) -> str:
    """Creates a signed JWT token containing the given data."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)