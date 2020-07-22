from server.bo import User as user
from server.bo import Group as group
"""
@author Yasemin
@author Robin Fink
"""

class GroupMembership(user.User, group.Group):

    def __init__(self):
        super().__init__()
        self._member = None
        self._group_membership = None

    def get_member(self):
        return self._member

    def set_member(self, user):
        self._member = user

    def get_group_membership(self):
        return self._group_membership

    def set_group_membership(self, group):
        self._group_membership = group

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "GroupMembership: {}, {}".format(self.get_member(), self.get_group_membership())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine GroupMembership()."""
        obj = GroupMembership()
        obj.set_member(dictionary["member"])
        obj.set_group_membership(dictionary["group_membership"])

        return obj
