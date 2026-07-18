import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Load environment variables from .env file
load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# Build the connection URL for MySQL using pymysql driver
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create the SQLAlchemy engine (manages the connection pool)
engine = create_engine(DATABASE_URL, echo=True)

# Session factory — each request will get its own session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that all our models (tables) will inherit from
Base = declarative_base()


def get_db():
    """Dependency function to provide a database session to routes."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()