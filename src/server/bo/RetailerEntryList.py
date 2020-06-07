from server.bo import BusinessObject as bo

class RetailerEntryList (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__shopping_list_id = ""
        self.__retailer_id = ""
        self.__retailer_name = ""
        self.__user_id = ""
        self.__user_name = ""

    def get_shopping_list_id(self):
        return self.__shopping_list_id

    def set_shopping_list_id(self, value):
        self.__shopping_list_id = value

    def get_retailer_id(self):
        return self.__retailer_id

    def set_retailer_id(self, value):
        self.__retailer_id = value

    def get_retailer_name(self):
        return self.__retailer_name

    def set_name(self, value):
        self.__retailer_name = value

    def get_user_id(self):
        return self.__user_id

    def set_user_id(self, value):
        self.__user_id = value

    def get_user_name(self):
        return self.__user_name

    def set_user_name(self, value):
        self.__user_name = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "RetailerEntryList: {}, {}, {}".format(self.get_id(), self.__shopping_list_id, self.__retailer_id, self.__retailer_name, self.__user_id, self.__user_name)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine RetailerEntryList()."""
        obj = RetailerEntryList()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["shopping_list_id"])
        obj.set_retailer_id(dictionary["retailer_id"])
        obj.set_retailer_id(dictionary["retailer_name"])
        obj.set_retailer_id(dictionary["user_id"])
        obj.set_retailer_id(dictionary["user_name"])
        return obj
