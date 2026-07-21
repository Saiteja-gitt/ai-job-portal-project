from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database.db import get_db
from models.application import Application
from models.job import Job
from models.user import User, UserRole
from schemas.application import ApplicationCreate, ApplicationResponse
from utils.auth import get_current_user

router = APIRouter(prefix="/applications", tags=["Applications"])


@router.post("/", response_model=ApplicationResponse)
def apply_to_job(
    application: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Only candidates can apply
    if current_user.role != UserRole.candidate:
        raise HTTPException(status_code=403, detail="Only candidates can apply to jobs")

    # Check the job actually exists
    job = db.query(Job).filter(Job.id == application.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Prevent applying to the same job twice
    existing = db.query(Application).filter(
        Application.candidate_id == current_user.id,
        Application.job_id == application.job_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You already applied to this job")

    new_application = Application(
        candidate_id=current_user.id,
        job_id=application.job_id
    )
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    return new_application


@router.get("/my", response_model=List[ApplicationResponse])
def my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Application).filter(Application.candidate_id == current_user.id).all()


@router.get("/job/{job_id}", response_model=List[ApplicationResponse])
def applicants_for_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Only the recruiter who posted this job can see its applicants
    if job.posted_by != current_user.id:
        raise HTTPException(status_code=403, detail="You can only view applicants for your own job postings")

    return db.query(Application).filter(Application.job_id == job_id).all()