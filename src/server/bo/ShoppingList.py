from server.bo import BusinessObject as bo

""" 
@author Tom Hager
 """
 
class ShoppingList (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__group_id = ""
    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value

    def get_group_id(self):
        return self.__group_id

    def set_group_id(self, group):
        self.__group_id = group.get_id()


    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "ShoppingList: {}, {}, {}".format(self.get_id(), self.__name, self.get_group_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine ShoppingList()."""
        obj = ShoppingList()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_group_id(dictionary["group_id"])

        return obj
