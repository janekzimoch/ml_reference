import os
import json
from dotenv import load_dotenv

load_dotenv()


def load_dataset():
    with open(os.environ.get('DORIS_MAE_DATASET_DIR'), "r") as f:
        dataset = json.load(f)
    return dataset