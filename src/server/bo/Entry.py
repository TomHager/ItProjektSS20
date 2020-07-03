from server.bo import BusinessObject as bo


class Entry(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__unit = ""
        self.__amount = ""
        self.__article_id = ""
        self.__modification_date = ""

    def get_unit(self):
        return self.__unit

    def set_unit(self, value):
        self.__unit = value

    def get_amount(self):
        return self.__amount

    def set_amount(self, value):
        self.__amount = value

    def get_article_id(self):
        return self.__article_id

    def set_article_id(self, value):
        self.__article_id = value

    def get_modification_date(self):
        return self.__modification_date

    def set_modification_date(self, value):
        self.__modification_date = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Entry: {}, {}, {}, {}, {}".format(self.get_id(), self.__unit, self.__amount,
                                                  self.__article_id, self.__modification_date)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Entry()."""
        obj = Entry()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_unit(dictionary["unit"])
        obj.set_amount(dictionary["amount"])
        obj.set_article_id(dictionary["article_id"])
        obj.set_modification_date(dictionary["modification_date"])

        return obj
