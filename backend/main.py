from fastapi import FastAPI
from routes import auth, job

app = FastAPI()

app.include_router(auth.router)
app.include_router(job.router)


@app.get("/")
def root():
    return {"message": "AI Job Portal backend is running"}