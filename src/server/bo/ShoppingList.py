from server.bo import BusinessObject as bo

""" 
@author Robin Fink
@author Tom Hager
 """


class ShoppingList (bo.BusinessObject):
    """Realisierung der Einkaufsliste."""
    def __init__(self):
        super().__init__()
        self._name = ""
        self._group_id = ""

    def get_name(self):
        """Auslesen des Listennamens."""
        return self._name

    def set_name(self, value):
        """Setzen des Listennamens."""
        self._name = value

    def get_group_id(self):
        """Auslesen der Gruppe."""
        return self._group_id

    def set_group_id(self, group_id):
        """Setzen der Gruppe."""
        self._group_id = group_id

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "ShoppingList: {}, {}, {}".format(self.get_id(), self._name, self._group_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein ShoppingList-Objekt."""
        obj = ShoppingList()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_group_id(dictionary["group_id"])

        return obj
