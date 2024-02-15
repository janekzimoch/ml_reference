from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
# from  src.WeaviateClient import VectorStoreClient

from src.embedding_store import EmbeddingStore
from src.interfaces import Recommendation

load_dotenv()

model_name = "BAAI/bge-base-en-v1.5"
es = EmbeddingStore(model_name, data='DORIS-MAE', batch_size=10, initialise=True)
# vector_store_client = VectorStoreClient()

app = FastAPI()
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchFilter(BaseModel):
    start_date: str | None
    end_date: str | None
    selected_conferences: list[str]
    selected_categories: list[str]


class SearchObject(BaseModel):
    text: str
    filter: SearchFilter
    year: int = None
    conference: str = None

@app.get("/hello")
async def get_hello():
    return {"message": "FastAPI server works"}

@app.get("/app/collections_info")
async def get_collections_info():
    # collections_info = vector_store_client.get_collections_info()
    collections_info = {'AIPapers': {'properties': ['timestamp_published', 'title', 'abstract'], 'size': 363133}}
    return collections_info

@app.post("/app/search_papers")
async def search_papers(search_object: SearchObject):
    # note, year and conference filtering is not yet implemented
    print('request: ', search_object)
    recommendation: Recommendation = es.article_recommendations(search_object.text)
    recommendation_simplified = [{'title': rec['metadata']['title'].replace('_',' '), 
                                  'abstract': rec['metadata']['abstract'],
                                  'url': rec['metadata']['pdf'],
                                  'year': rec['metadata']['year']} for rec in recommendation]
    return recommendation_simplified

'''
run using: 
uvicorn app:app --reload
'''
