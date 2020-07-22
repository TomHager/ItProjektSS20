from server.bo import BusinessObject as bo

""" 
@author Yasemin
@author Robin Fink
@author Tom Hager
 """


class User (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._name = ""  # Der Name des Benutzers.
        self._email = ""  # Die E-Mail-Adresse des Benutzers.
        #self._external_id = ""  # Die extern verwaltete User ID.

    def get_name(self):
        """Auslesen des Benutzernamens."""
        return self._name

    def set_name(self, value):
        """Setzen des Benutzernamens."""
        self._name = value

    def get_email(self):
        """Auslesen der E-Mail-Adresse."""
        return self._email

    def set_email(self, value):
        """Setzen der E-Mail-Adresse."""
        self._email = value

    def get_external_id(self):
        """Auslesen der externen User ID (z.B. Google ID)."""
        return self._external_id

    def set_external_id(self, value):
        """Setzen der externen User ID (z.B. Google ID)."""
        self._external_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}, {}".format(self.get_id(), self._name, self._email)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_external_id(dictionary["external_id"])

        return obj
