from server.bo import BusinessObject as bo

""" 
@author Tom Hager
 """
 
class RetailerEntryList (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__shopping_list_id = ""
        self.__retailer_id = ""
        self.__user_id = ""
        self.__entry_id = ""

    def get_shopping_list_id(self):
        return self.__shopping_list_id

    def set_shopping_list_id(self, shoppinglist):
        self.__shopping_list_id = shoppinglist.get_id()

    def get_retailer_id(self):
        return self.__retailer_id

    def set_retailer_id(self, retailer):
        self.__retailer_id = retailer.get_id()

    def get_user_id(self):
        return self.__user_id

    def set_user_id(self, user):
        self.__user_id = user.get_id()

    def get_entry_id(self):
        return self.__entry_id

    def set_entry_id(self, entry):
        self.__entry_id = entry.get_id()

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "RetailerEntryList: {}, {}, {}, {}, {}".format(self.get_id(), self.__shopping_list_id,
                                                              self.__retailer_id, self.__user_id, self.__entry_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine RetailerEntryList()."""
        obj = RetailerEntryList()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_shopping_list_id(dictionary["shopping_list_id"])
        obj.set_retailer_id(dictionary["retailer_id"])
        obj.set_user_id(dictionary["user_id"])
        obj.set_entry_id(dictionary["entry_id"])

        return obj
