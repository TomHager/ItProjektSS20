from server.bo import BusinessObject as bo
from server.bo.Retailer import Retailer
from server.bo.Group import Group

class RetailerGroup (bo.BusinessObject):


    def __init__(self):
        super().__init__()
        self.__retailer_member = None
        self.__retailer_group = None

    def get_retailer_member(self):
        return self.__retailer_member

    def set_retailer_member(self, retailer):
        self.__retailer_member = retailer.__id

    def get_retailer_group(self):
        return self._retailer_group

    def set_retailer_group(self, group):
        self.__retailer_group = group.__id

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "RetailerGroup: {}, {}".format(self.get_group_id(), self.get_retailer_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine RetailerGroup()."""
        obj = RetailerGroup()
        obj.set_retailer_member(dictionary["retailer_member"])
        obj.set_retailer_group(dictionary["retailer_group"])
        return obj