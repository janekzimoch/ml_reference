from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from src.embedding_store import EmbeddingStore
from src.interfaces import Recommendation

load_dotenv()

model_name = "BAAI/bge-base-en-v1.5"
es = EmbeddingStore(model_name, data='DORIS-MAE', batch_size=10, initialise=True)


app = FastAPI()
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SearchObject(BaseModel):
    text: str
    year: int = None
    conference: str = None

@app.get("/hello")
async def get_hello():
    return {"message": "FastAPI server works"}

@app.post("/app/search_papers")
async def search_papers(search_object: SearchObject):
    # note, year and conference filtering is not yet implemented
    recommendation: Recommendation = es.article_recommendations(search_object.text)
    recommendation_simplified = [{'title': rec['metadata']['title'].replace('_',' '), 'abstract': rec['metadata']['abstract']} for rec in recommendation]
    return recommendation_simplified

'''
run using: 
uvicorn app:app --reload
'''
