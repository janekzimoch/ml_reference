import os
import json
from datetime import timezone
import pandas as pd
import random
from tqdm import tqdm
random.seed(12345)

def make_directory(dir_path):
    ''' Create a directory at the specified path if it doesn't already exist '''
    try:
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
            print(f"Directory created: {dir_path}")
        else:
            print(f"Directory already exists: {dir_path}")
    except Exception as e:
        print(f"An error occurred while creating the directory: {e}")


def save_data_csv(filepath: str, data: list[list[float]], append_mode: bool = True):
    mode = 'a' if append_mode else 'w'
    header = False if append_mode else True
    df = pd.DataFrame(data)
    df.to_csv(filepath, mode=mode, header=header, index=False)


def load_data_csv(filepath: str) -> list[list[float]]:
    df = pd.read_csv(filepath, header=None, dtype='float32')
    return df.values.tolist()


def remove_file_if_exists(filepath: str):
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
            print(f"File '{filepath}' has been removed.")
        else:
            print(f"No file found at '{filepath}'. Nothing to remove.")
    except Exception as e:
        print(f"An error occurred while removing the file: {e}")


def saveJson(path, data):
    with open(path, 'w') as json_file:
        json.dump(data, json_file, indent=4)


def readJson(path):
    try:
        with open(path, 'r') as json_file:
            existing_data = json.load(json_file)
    except FileNotFoundError:
        existing_data = {}
    return existing_data


def updateJson(path, new_data):
    existing_data = readJson(path)
    existing_data.update(new_data)
    saveJson(path, existing_data)




def get_random_timestamps(k, min_date='2019-01-01 00:00:00', max_date='2024-01-01 23:59:59'):
    min_date = pd.to_datetime(min_date).tz_localize(timezone.utc)
    max_date = pd.to_datetime(max_date).tz_localize(timezone.utc)
    diff = (max_date - min_date).total_seconds() + 1
    offsets = random.sample(range(int(diff)), k=k)
    timestamps = min_date + pd.to_timedelta(offsets, unit="s")
    
    result = [timestamp.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z' for timestamp in timestamps]
    return result


def get_random_conference(k):
    options = ["nips", "iclr", "icml", "cvpr", "eecv", "iccv", "acl", "amacl", "emnlp"]
    return random.choices(options, k=k)


def get_random_categories(k):
    options = ["llm", "rag", "CV", "NLP", "speach", "other"]
    categories = []
    print('sampling categories ...')
    for _ in tqdm(range(k)):
        n = random.randint(1, 3)  # Choose between 1 to 3 categories
        categories.append(random.sample(options, n))
    return categories
