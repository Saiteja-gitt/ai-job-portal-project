from pydantic import BaseModel
from typing import Optional
from models.job import JobType


class JobCreate(BaseModel):
    title: str
    description: str
    company_name: str
    location: str
    salary: Optional[str] = None
    job_type: JobType = JobType.full_time


class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    company_name: str
    location: str
    salary: Optional[str]
    job_type: JobType
    posted_by: int

    class Config:
        from_attributes = True