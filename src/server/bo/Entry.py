from server.bo import BusinessObject as bo

""" 
@author Tom Hager
 """
 
class Entry(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._unit = ""
        self._amount = ""
        self._article = ""
        self._modification_date = ""

    def get_unit(self):
        return self._unit

    def set_unit(self, value):
        self._unit = value

    def get_amount(self):
        return self._amount

    def set_amount(self, value):
        self._amount = value

    def get_article(self):
        return self._article

    def set_article(self, value):
        self._article = value

    def get_modification_date(self):
        return self._modification_date

    def set_modification_date(self, value):
        self._modification_date = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Entry: {}, {}, {}, {}, {}".format(self.get_id(), self._unit, self._amount,
                                                  self._article, self._modification_date)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Entry()."""
        obj = Entry()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_unit(dictionary["unit"])
        obj.set_amount(dictionary["amount"])
        obj.set_article(dictionary["article"])
        obj.set_modification_date(dictionary["modification_date"])

        return obj
