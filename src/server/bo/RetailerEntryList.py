from server.bo import ShoppingList as shoppinglist
from server.bo import Retailer as retailer
from server.bo import User as user
from server.bo import Entry as entry

""" 
@author Tom Hager
 """


class RetailerEntryList (shoppinglist.ShoppingList, retailer.Retailer, user.User, entry.Entry):

    def __init__(self):
        super().__init__()
        self._shopping_list_id = ""
        self._retailer_id = ""
        self._user_id = ""
        self._entry_id = ""

    def get_shopping_list_id(self):
        return self._shopping_list_id

    def set_shopping_list_id(self, shoppinglist):
        self._shopping_list_id = shoppinglist.get_id()

    def get_retailer_id(self):
        return self._retailer_id

    def set_retailer_id(self, retailer):
        self._retailer_id = retailer.get_id()

    def get_user_id(self):
        return self._user_id

    def set_user_id(self, user):
        self._user_id = user.get_id()

    def get_entry_id(self):
        return self._entry_id

    def set_entry_id(self, entry):
        self._entry_id = entry.get_id()

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "RetailerEntryList: {}, {}, {}, {}".format(self._shopping_list_id,
                                                        self._retailer_id, self._user_id, self._entry_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine RetailerEntryList()."""
        obj = RetailerEntryList()
        obj.set_shopping_list_id(dictionary["shopping_list_id"])
        obj.set_retailer_id(dictionary["retailer_id"])
        obj.set_user_id(dictionary["user_id"])
        obj.set_entry_id(dictionary["entry_id"])

        return obj
