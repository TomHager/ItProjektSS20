from server.bo import Retailer as retailer
from server.bo import Group as group

"""
@author Robin Fink
"""

class RetailerGroup(group.Group, retailer.Retailer):

    def __init__(self):
        super().__init__()
        self._retailer_member = ""
        self._retailer_group = ""

    def get_retailer_member(self):
        return self._retailer_member

    def set_retailer_member(self, retailer):
        self._retailer_member = retailer

    def get_retailer_group(self):
        return self._retailer_group

    def set_retailer_group(self, group):
        self._retailer_group = group

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "RetailerGroup: {}, {}".format(self.get_retailer_member(), self.get_retailer_group())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine RetailerGroup()."""
        obj = RetailerGroup()
        obj.set_retailer_member(dictionary["retailer_member"])
        obj.set_retailer_group(dictionary["retailer_group"])

        return obj
