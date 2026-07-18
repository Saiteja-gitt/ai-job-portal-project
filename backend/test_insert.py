from database.db import SessionLocal
from models.user import User, UserRole

# Create a new session
db = SessionLocal()

# Create a test user
test_user = User(
    full_name="Saiteja Test",
    email="saiteja.test@example.com",
    hashed_password="temporary_placeholder_hash",
    role=UserRole.candidate
)

# Add and save to database
db.add(test_user)
db.commit()
db.refresh(test_user)

print(f"User created successfully! ID: {test_user.id}, Email: {test_user.email}")

db.close()