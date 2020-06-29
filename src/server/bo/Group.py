from server.bo import BusinessObject as bo

class Group (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__user_id_list = ""

    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value

    def get_user_id_list(self):
        return self.__user_id_list

    def set_user_id_list(self, value):
        self.__user_id_list = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Group: {}, {}, {}".format(self.get_id(), self.__name, self.__user_id_list)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Group()."""
        obj = Group()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_external_id(dictionary["user_id_list"])
        return obj
