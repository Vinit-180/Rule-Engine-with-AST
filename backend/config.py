# from pymongo import MongoClient
from dotenv import load_dotenv 
import os

load_dotenv()  

class Config:
    # MySQL configurations
    MONGO_DATABASE_URI = os.getenv('MONGO_DATABASE_URI')
    # MONGO_DATABASE_URI = 'mongodb://localhost:27017/'
    # SQLALCHEMY_TRACK_MODIFICATIONS = False


# db=MongoClient(Config.MONGO_DATABASE_URI)