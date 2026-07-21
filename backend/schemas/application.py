from pydantic import BaseModel
from datetime import datetime
from models.application import ApplicationStatus


class ApplicationCreate(BaseModel):
    job_id: int


class ApplicationResponse(BaseModel):
    id: int
    candidate_id: int
    job_id: int
    status: ApplicationStatus
    applied_at: datetime

    class Config:
        from_attributes = True