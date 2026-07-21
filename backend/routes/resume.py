import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from database.db import get_db
from models.user import User
from utils.auth import get_current_user

router = APIRouter(prefix="/resume", tags=["Resume"])

UPLOAD_DIR = "uploads/resumes"


@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Only allow PDF and Word documents
    allowed_extensions = {".pdf", ".doc", ".docx"}
    file_ext = os.path.splitext(file.filename)[1].lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Only PDF and Word documents are allowed")

    # Create a unique filename using the user's ID
    saved_filename = f"user_{current_user.id}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, saved_filename)

    # Save the file to disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Save the file path in the database
    current_user.resume_url = file_path
    db.commit()

    return {"message": "Resume uploaded successfully", "resume_url": file_path}
    