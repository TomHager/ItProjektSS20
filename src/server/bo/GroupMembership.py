from server.bo import BusinessObject as bo
from server.bo.User import User
from server.bo.Group import Group

class GroupMembership (bo.BusinessObject):


    def __init__(self):
        super().__init__()
        self.__member = None
        self.__group_membership = None

    def get_member(self):
        return self._member

    def set_member(self, user):
        self.__member = user.__id

    def get_group_membership(self):
        return self._group_membership

    def set_group_membership(self, group):
        self.__group_membership = group.__id

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "GroupMembership: {}, {}".format(self.get_group_id(), self.get_user_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine GroupMembership()."""
        obj = GroupMembership()
        obj.set_member(dictionary["member"])
        obj.set_group_membership(dictionary["group_membership"])
        return obj