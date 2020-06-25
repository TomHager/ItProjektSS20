from server.bo import BusinessObject as bo

class Group (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = ""

    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Group: {}, {}".format(self.get_id(), self.__name)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Group()."""
        obj = Group()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        return obj