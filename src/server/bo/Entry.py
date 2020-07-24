from server.bo import BusinessObject as bo
from datetime import datetime
"""
@author Robin Fink 
@author Tom Hager
 """


class Entry(bo.BusinessObject):
    """Realisierung eines Eintrags der Einkaufsliste."""
    def __init__(self):
        super().__init__()
        self._unit = ""
        self._amount = ""
        self._article = ""
        self._modification_date = datetime.now()
        self.user_id = ""
        self._retailer_id = ""
        self._shopping_list_id = ""
        self._group_id = ""
        self._bought = ""

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

    def get_modification_date(self):
        """Auslesen des Bearbeitungsdatums."""
        return self._modification_date

    def set_modification_date(self, value):
        """Setzen des Bearbeitungsdatums."""
        self._modification_date = value

    def get_user_id(self):
        """Auslesen des Benutzers."""
        return self.user_id

    def set_user_id(self, value):
        """Setzen des Benutzers."""
        self.user_id = value

    def get_retailer_id(self):
        """Auslesen des Händlers."""
        return self._retailer_id

    def set_retailer_id(self, value):
        """Setzen des Händlers."""
        self._retailer_id = value

    def get_shopping_list_id(self):
        """Auslesen der Einkaufslistennummer."""
        return self._shopping_list_id

    def set_shopping_list_id(self, value):
        """Setzen der Einkaufslistennummer."""
        self._shopping_list_id = value

    def get_group_id(self):
        """Auslesen der Gruppe."""
        return self._group_id

    def set_group_id(self, value):
        """Setzen der Gruppe."""
        self._group_id = value

    def get_bought(self):
        """Auslesen des Gekauf-Wertes."""
        return self._bought

    def set_bought(self, bought):
        """Setzen des Gekauft-Wertes."""
        self._bought = bought

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Entry: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}"\
            .format(self.get_id(), self._unit, self._amount, self._article, self._modification_date, self.user_id,
                    self._retailer_id, self._shopping_list_id, self._group_id, self._bought)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Entry()."""
        obj = Entry()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_unit(dictionary["unit"])
        obj.set_amount(dictionary["amount"])
        obj.set_article(dictionary["article"])
        obj.set_modification_date(dictionary["modification_date"])
        obj.set_user_id(dictionary["user_id"])
        obj.set_retailer_id(dictionary["retailer_id"])
        obj.set_shopping_list_id(dictionary["shopping_list_id"])
        obj.set_group_id(dictionary["group_id"])
        obj.set_bought(dictionary["bought"])

        return obj
