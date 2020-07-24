from server.bo import BusinessObject as bo

""" 
@author Tom Hager
@author Robin Fink
 """


class Favorite(bo.BusinessObject):
    """Realisierung der Favoriten."""
    def __init__(self):
        super().__init__()
        self._unit = ""
        self._amount = ""
        self._article = ""
        self._retailer_id = ""
        self._group_id = ""

    def get_unit(self):
        """Auslesen der Messeinheit."""
        return self._unit

    def set_unit(self, value):
        """Setzen der Messeinheit."""
        self._unit = value

    def get_amount(self):
        """Auslesen der Anzahl."""
        return self._amount

    def set_amount(self, value):
        """Setzen der Anzahl."""
        self._amount = value

    def get_article(self):
        """Auslesen des Artickelnamens ."""
        return self._article

    def set_article(self, value):
        """Setzen des Artickelnamens."""
        self._article = value

    def get_retailer_id(self):
        """Auslesen der Händler."""
        return self._retailer_id

    def set_retailer_id(self, value):
        """Setzen der Händler."""
        self._retailer_id = value

    def get_group_id(self):
        """Auslesen der Gruppe."""
        return self._group_id

    def set_group_id(self, value):
        """Setzen der Gruppe."""
        self._group_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Favorite: {}, {}, {}, {}, {}, {}".format(self.get_id(), self._unit, self._amount, self._article,
                                                         self._retailer_id, self._group_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Favorite()."""
        obj = Favorite()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_unit(dictionary["unit"])
        obj.set_amount(dictionary["amount"])
        obj.set_article(dictionary["article"])
        obj.set_retailer_id(dictionary["retailer_id"])
        obj.set_group_id(dictionary["group_id"])

        return obj
