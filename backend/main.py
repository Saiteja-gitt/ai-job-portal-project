from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "AI Job Portal backend is running"}