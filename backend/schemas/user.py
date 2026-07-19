from pydantic import BaseModel, EmailStr
from models.user import UserRole


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.candidate


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    role: UserRole

    class Config:
        from_attributes = True