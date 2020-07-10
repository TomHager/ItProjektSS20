from server.bo import BusinessObject as bo


class Favorite(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__unit = ""
        self.__amount = ""
        self.__article = ""

    def get_unit(self):
        return self.__unit

    def set_unit(self, value):
        self.__unit = value

    def get_amount(self):
        return self.__amount

    def set_amount(self, value):
        self.__amount = value

    def get_article(self):
        return self.__article

    def set_article(self, value):
        self.__article = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Favorite: {}, {}, {}, {}".format(self.get_id(), self.__unit, self.__amount,self.__article)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Favorite()."""
        obj = Favorite()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_unit(dictionary["unit"])
        obj.set_amount(dictionary["amount"])
        obj.set_article(dictionary["article"])

        return obj
