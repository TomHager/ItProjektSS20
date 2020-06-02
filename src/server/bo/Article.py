from server.bo import BusinessObject as bo

class Account (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = ""  # Der Name des Benutzers.

    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value