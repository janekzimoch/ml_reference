'''
weaviate is run on a seperate server.

once we upload data to weavitae, it is persisted there, so this script has to be ran only once upon first start of the server.
'''
import weaviate
import weaviate.classes as wvc
from weaviate.util import generate_uuid5
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from tqdm import tqdm

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
        ai_papers = client.collections.create(
            collection_name,
            vectorizer_config=wvc.config.Configure.Vectorizer.none(),
            vector_index_config=wvc.config.Configure.VectorIndex.hnsw(
                distance_metric=wvc.config.VectorDistances.COSINE # select prefered distance metric
            ),
        )
    
    # Load texts
    data = load_dataset()
    docs: list[Document] = formater.convert_DORIS_MAE_to_my_format(data)
    texts, metadata = EmbeddingStore.prepare_documents_for_faiss(docs)
    timestamps = utils.get_random_timestamps(len(texts))


    # load embeddings
    embeddings = utils.load_data_csv(embeddings_path)

    # Load embedding model
    embedding_model = HuggingFaceBgeEmbeddings(model_name=model_name, model_kwargs={'device': 'cpu'})

    # insert to vector store - in batches    
    with ai_papers.batch.dynamic() as batch:
        for i in tqdm(range(len(texts))):
            data_object = {
                "abstract": texts[i],
                "title": metadata[i]['title'],
                "timestamp_published": timestamps[i]
            }

            batch.add_object(
                properties=data_object,
                vector=embeddings[i],
                uuid=generate_uuid5(data_object),
            )
    print('FINSIHED!')

except Exception as e:
    print('Error: ', e)
finally:
    client.close()