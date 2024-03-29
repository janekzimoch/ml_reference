from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import weaviate.classes as wvc
from langchain_community.embeddings import HuggingFaceBgeEmbeddings

from src.WeaviateClient import VectorStoreClient
from src.interface import SearchObject
import src.vectorstore as vs

load_dotenv()

client = VectorStoreClient()
model_name = "BAAI/bge-base-en-v1.5"
collection_name = "AIPapers"
embeddings_path = "/Users/janek/mlreference/abstract_embedding/embeddings_bge-base-en-v1.5.csv"

ai_papers = client.collections.get(collection_name)  # load already existing collection
embedding_model = HuggingFaceBgeEmbeddings(model_name=model_name, model_kwargs={'device': 'cpu'})

app = FastAPI()
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    print(search_object)

    query = search_object.text
    query_embedding = embedding_model.embed_query(query)
    filters = vs.get_filters(search_object.filter)
    
    response = ai_papers.query.near_vector(
        near_vector=query_embedding,
        limit=10,
        offset=search_object.offset,
        filters=filters,
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    recommendation_simplified = [{'title': res.properties['title'].replace('_',' '), 
                                'abstract': res.properties['text'],
                                'url': "missing",
                                'year': res.properties['timestamp_published'].strftime("%Y-%m-%d")} for res in response.objects]
    return recommendation_simplified

'''
run using: 
uvicorn app:app --reload
'''
