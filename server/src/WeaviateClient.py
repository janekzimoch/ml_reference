from typing import Optional, Dict

from weaviate.client import WeaviateClient
from weaviate.connect.base import ConnectionParams, ProtocolParams
from weaviate.auth import AuthCredentials
from weaviate.config import AdditionalConfig


class VectorStoreClient(WeaviateClient):

    def __init__(self,
            host: str = "localhost",
            port: int = 8080,
            grpc_port: int = 50051,
            headers: Optional[Dict[str, str]] = None,
            additional_config: Optional[AdditionalConfig] = None,
            skip_init_checks: bool = False,
            auth_credentials: Optional[AuthCredentials] = None,
        ):
        connection_params = ConnectionParams(
            http=ProtocolParams(host=host, port=port, secure=False),
            grpc=ProtocolParams(host=host, port=grpc_port, secure=False),
        )
        super().__init__(
            connection_params=connection_params,
            auth_client_secret=auth_credentials,
            additional_headers=headers,
            additional_config=additional_config,
            skip_init_checks=skip_init_checks,
        )
        self.__connect()

    def __connect(self):
        try:
            self.connect()
        except Exception as e:
            self.close()
            raise e

    def get_collections_info(self):
        all_collections = self.collections.list_all()
        collections_names = list(all_collections.keys())
        collections_info = {}
        for name in collections_names:
            collection_properties = [prop.name for prop in all_collections[name].properties]
            collection = self.collections.get(name) 
            collection_size = len(collection)
            collections_info[name] = {'properties': collection_properties, 'size': collection_size}
        return collections_info
