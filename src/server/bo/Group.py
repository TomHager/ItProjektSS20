from server.bo import BusinessObject as bo

""" 
@author Robin Fink
@author Tom Hager
 """

 
class Group (bo.BusinessObject):
    """Realisierung der Gruppe."""
    def __init__(self):
        super().__init__()
        self._name = ""

    def get_name(self):
        """Auslesen des Gruppennamens."""
        return self._name

    def set_name(self, value):
        """Setzen des Gruppennamens."""
        self._name = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Group: {}, {}".format(self.get_id(), self._name)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Gruppen-Objekt."""
        obj = Group()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])

        return obj
