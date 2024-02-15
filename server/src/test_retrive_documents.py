'''
weaviate is run on a seperate server.

once we upload data to weavitae, it is persisted there, so this script has to be ran only once upon first start of the server.
'''
import weaviate
import weaviate.classes as wvc
from langchain_community.embeddings import HuggingFaceBgeEmbeddings

import miscelanous.utils as utils
from data_loader import load_dataset
import miscelanous.data_formater as formater
from interfaces import Document
from embedding_store import EmbeddingStore


client = weaviate.connect_to_local()
model_name = "BAAI/bge-base-en-v1.5"
collection_name = "AIPapers"
embeddings_path = "/Users/janek/mlreference/abstract_embedding/embeddings_bge-base-en-v1.5.csv"


try:
    # Create the collection.
    if client.collections.exists(collection_name):
        ai_papers = client.collections.get(collection_name)  # load already existing collection
    else:
        raise ValueError(f"{collection_name} vcolelction doesn't esists.")
    
    # Load embedding model
    embedding_model = HuggingFaceBgeEmbeddings(model_name=model_name, model_kwargs={'device': 'cpu'})

    # query
    query = "I am trying to build a RAG system, what LLM literature should I read?"
    query_embedding = embedding_model.embed_query(query)

    response = ai_papers.query.near_vector(
        near_vector=query_embedding,
        limit=5,
    )

    for obj in response.objects:
        print(obj.properties['abstract'] ,'\n')

except Exception as e:
    print('Error: ', e)
finally:
    client.close()