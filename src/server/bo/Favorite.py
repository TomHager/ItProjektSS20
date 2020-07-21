from server.bo import BusinessObject as bo

""" 
@author Tom Hager
 """
 
class Favorite(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._unit = ""
        self._amount = ""
        self._article = ""
        self._retailer_id = ""

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

    def get_retailer_id(self):
        return self._retailer_id

    def set_retailer_id(self, value):
        self._retailer_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Favorite: {}, {}, {}, {}, {}".format(self.get_id(), self._unit, self._amount, self._article, self._retailer_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Favorite()."""
        obj = Favorite()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_unit(dictionary["unit"])
        obj.set_amount(dictionary["amount"])
        obj.set_article(dictionary["article"])
        obj.set_retailer_id(dictionary["retailer_id"])

        return obj
