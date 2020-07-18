import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod

""" 
@author Tom Hager
 """
 
class Mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._cnx = None

    def __enter__(self):

        if os.getenv('GAE_ENV', '').startswith('standard'):

            """self._cnx = connector.connect(user='demo', password='demo',
                                          unix_socket='/cloudsql/python-bankprojekt-thies:europe-west3:bank-db-thies',
                                          database='ikauf')"""

        else:

            self._cnx = connector.connect(user='root', password='root',
                                          host='127.0.0.1',
                                          database='itprojektss20')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._cnx.close()

    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod
    def find_by_key(self, key):
        pass

    @abstractmethod
    def insert(self, object):
        pass

    @abstractmethod
    def update(self, object):
        pass

    @abstractmethod
    def delete(self, object):
        pass
