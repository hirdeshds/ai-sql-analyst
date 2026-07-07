import os
from dotenv import load_dotenv
from langchain_community.utilities import SQLDatabase

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///../data/sample_company.db")

def get_db_connection() -> SQLDatabase:
    return SQLDatabase.from_uri(DATABASE_URL)