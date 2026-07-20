from database.db import Base, engine
from models.user import User
from models.job import Job

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")