from server.bo import BusinessObject as bo

""" 
@author Robin Fink
@author Tom Hager
"""


class Retailer (bo.BusinessObject):
    """Realisierung der Händler."""
    def __init__(self):
        super().__init__()
        self._name = ""

    def get_name(self):
        """Auslesen des Händlernamens."""
        return self._name

    def set_name(self, value):
        """Setzen des Händlernamens."""
        self._name = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Retailer: {}, {}".format(self.get_id(), self.get_name())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Retailer-Objekt."""
        obj = Retailer()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])

        return obj
