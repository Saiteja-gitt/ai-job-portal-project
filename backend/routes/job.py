from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database.db import get_db
from models.job import Job
from models.user import User
from schemas.job import JobCreate, JobResponse
from utils.auth import get_current_user

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.post("/", response_model=JobResponse)
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_job = Job(
        title=job.title,
        description=job.description,
        company_name=job.company_name,
        location=job.location,
        salary=job.salary,
        job_type=job.job_type,
        posted_by=current_user.id
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job


@router.get("/", response_model=List[JobResponse])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()


@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.put("/{job_id}", response_model=JobResponse)
def update_job(
    job_id: int,
    updated_job: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if job.posted_by != current_user.id:
        raise HTTPException(status_code=403, detail="You can only edit your own job postings")

    job.title = updated_job.title
    job.description = updated_job.description
    job.company_name = updated_job.company_name
    job.location = updated_job.location
    job.salary = updated_job.salary
    job.job_type = updated_job.job_type

    db.commit()
    db.refresh(job)
    return job


@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if job.posted_by != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete your own job postings")

    db.delete(job)
    db.commit()
    return {"message": "Job deleted successfully"}