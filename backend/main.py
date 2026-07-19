from fastapi import FastAPI
from routes import auth

app = FastAPI()

app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "AI Job Portal backend is running"}