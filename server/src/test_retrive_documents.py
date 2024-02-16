'''
weaviate is run on a seperate server.

once we upload data to weavitae, it is persisted there, so this script has to be ran only once upon first start of the server.
'''
from WeaviateClient import VectorStoreClient
import weaviate.classes as wvc
from langchain_community.embeddings import HuggingFaceBgeEmbeddings

import vectorstore as vs


client = VectorStoreClient()
model_name = "BAAI/bge-base-en-v1.5"
collection_name = "AIPapers"
embeddings_path = "/Users/janek/mlreference/abstract_embedding/embeddings_bge-base-en-v1.5.csv"


try:
    # Create the collection.
    if client.collections.exists(collection_name):
        ai_papers = client.collections.get(collection_name)  # load already existing collection
    else:
        raise ValueError(f"{collection_name} colection doesn't esists.")

    # Load embedding model
    embedding_model = HuggingFaceBgeEmbeddings(model_name=model_name, model_kwargs={'device': 'cpu'})

    # search object
    search_object = {
        "text": "I am trying to build a RAG system, what LLM literature should I read?",
        "filter": {
            "start_date": "2022-01-01T00:00:00.000Z",
            "end_date": None,
            "conferences": ["nips"],
            "categories": ["llm", "speach"],
        }
    }

    # query
    query_embedding = embedding_model.embed_query(search_object["text"])

    filters = vs.get_filters(search_object["filter"])

    response = ai_papers.query.near_vector(
        near_vector=query_embedding,
        limit=5,
        filters=filters,
        return_metadata=wvc.query.MetadataQuery(distance=True)
    )

    for o in response.objects:
        print(o.properties["timestamp_published"])
        print(o.properties["conference"])
        print(o.properties["categories"])





except Exception as e:
    print('Error: ', e)
finally:
    client.close()