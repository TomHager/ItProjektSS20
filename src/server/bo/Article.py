from server.bo import BusinessObject as bo


class Article (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__standard = ""
        self.__retailer_id = ""

    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value

    def get_standard(self):
        return self.__standard

    def set_standard(self, value):
        self.__standard = value

    def get_retailer_id(self):
        return self.__retailer_id

    def set_retailer_id(self, value):
        self.__retailer_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Article: {}, {}, {}, {}".format(self.get_id(), self.__name, self.__standard, self.__retailer_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Article()."""
        obj = Article()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_standard(dictionary["standard"])
        obj.set_retailer_id(dictionary["retailer_id"])
        return obj
