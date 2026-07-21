from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, job, application, resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(job.router)
app.include_router(application.router)
app.include_router(resume.router)


@app.get("/")
def root():
    return {"message": "AI Job Portal backend is running"}