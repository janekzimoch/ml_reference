'''
weaviate is run on a seperate server.

once we upload data to weavitae, it is persisted there, so this script has to be ran only once upon first start of the server.
'''
import weaviate
import weaviate.classes as wvc
from WeaviateClient import VectorStoreClient

import miscelanous.utils as utils
from data_loader import load_dataset
import miscelanous.data_formater as formater
from server.src.interface import Document
from embedding_store import EmbeddingStore


client = weaviate.connect_to_local()
collection_name = "AIPapers"



try:
    client = VectorStoreClient()
    print(client.get_collections_info())

finally:
    client.close()
# try:

#     # Create the collection.
#     if client.collections.exists(collection_name):
#         ai_papers = client.collections.get(collection_name)  # load already existing collection
#     else:
#         raise ValueError(f"{collection_name} vcolelction doesn't esists.")
    
#     # ai_papers

# except Exception as e:
#     print('Error: ', e)
