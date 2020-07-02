from server.bo import BusinessObject as bo

class Entry (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__bought = ""
        self.__unit = ""
        self.__amount = ""
        self.__article_id = ""
        self.__article_name = ""
        self.__article_standard = ""
        self.__modification_date = ""

    def get_bought(self):
        return self.__bought

    def set_bought(self, value):
        self.__bought = value

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

    def get_article_name(self):
        return self.__article_name

    def set_article_name(self, value):
        self.__article_name = value

    def get_article_standard(self):
        return self.__article_standard

    def set_article_standard(self, value):
        self.__article_standard = value

    def get_modification_date(self):
        return self.__modification_date

    def set_modification_date(self, value):
        self.__modification_date = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Entry: {}, {}, {}, {}, {}, {}".format(self.__unit(), self.__amount, self.__article_id, self.__article_name, self.__article_standard, self.__modification_date)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Entry()."""
        obj = Entry()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["unit"])
        obj.set_external_id(dictionary["amount"])
        obj.set_external_id(dictionary["article_id"])
        obj.set_external_id(dictionary["article_name"])
        obj.set_external_id(dictionary["article_standard"])
        obj.set_external_id(dictionary["modification_date"])
        return obj