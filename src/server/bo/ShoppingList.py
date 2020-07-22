from server.bo import BusinessObject as bo

""" 
@author Robin Fink
@author Tom Hager
 """


class ShoppingList (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._name = ""
        self._groups_id = ""

    def get_name(self):
        return self._name

    def set_name(self, value):
        self._name = value

    def get_group_id(self):
        return self._groups_id

    def set_group_id(self, group):
        self._groups_id = group

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "ShoppingList: {}, {}, {}".format(self.get_id(), self._name, self._groups_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine ShoppingList()."""
        obj = ShoppingList()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_group_id(dictionary["groups_id"])

        return obj
