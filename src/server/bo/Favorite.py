from server.bo import BusinessObject as bo


class Entry(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__unit = ""
        self.__amount = ""
        self.__article = ""
        self.__favorite = ""

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

    def get_favorite(self):
        return self.__favorite

    def set_favorite(self, value):
        self.__favorite = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Entry: {}, {}, {}, {}, {}".format(self.get_id(), self.__unit, self.__amount,
                                                  self.__article, self.__favorite)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Entry()."""
        obj = Entry()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_unit(dictionary["unit"])
        obj.set_amount(dictionary["amount"])
        obj.set_article(dictionary["article"])
        obj.set_favorite(dictionary["favorite"])

        return obj
