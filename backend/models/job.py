from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database.db import Base
import enum


class JobType(str, enum.Enum):
    full_time = "full_time"
    part_time = "part_time"
    internship = "internship"
    contract = "contract"


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    company_name = Column(String(150), nullable=False)
    location = Column(String(150), nullable=False)
    salary = Column(String(50), nullable=True)
    job_type = Column(Enum(JobType), default=JobType.full_time, nullable=False)

    posted_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    recruiter = relationship("User")