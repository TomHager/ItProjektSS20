from server.bo import BusinessObject as bo

class Retailer (bo.BusinessObject):

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

    def set_group_id(self, value):
        self.__group_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Retailer: {}, {}, {}".format(self.get_id(), self.__name, self.__group_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Retailer()."""
        obj = Retailer()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_external_id(dictionary["group_id"])
        return obj