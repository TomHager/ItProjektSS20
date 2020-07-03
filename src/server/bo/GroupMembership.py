class GroupMembership:

    def __init__(self):
        super().__init__()
        self.__member = None
        self.__membership = None

    def get_member(self):
        return self.__member

    def set_member(self, user):
        self.__member = user.get_id()

    def get_membership(self):
        return self.__membership

    def set_membership(self, group):
        self.__membership = group.get_id()

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "GroupMembership: {}, {}".format(self.get_member(), self.get_membership())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine GroupMembership()."""
        obj = GroupMembership()
        obj.set_member(dictionary["member"])
        obj.set_membership(dictionary["membership"])

        return obj
