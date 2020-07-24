from server.bo import BusinessObject as bo
"""
@author Tom Hager
 """


class Entry(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._group_id = ""
        self._modification_date_from = ""
        self._modification_date_to = ""


    def get_group_id(self):
        return self._group_id

    def set_group_id(self, value):
        self._group_id = value

    def get_modification_date_from(self):
        return self._modification_date_from

    def set_modification_date_from(self, value):
        self._modification_date_from = value

    def get_modification_date_to(self):
        return self._modification_date_to

    def set_modification_date_to(self, value):
        self._modification_date_to = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "ReportValue: {}, {}, {}"\
            .format(self._group_id, self._modification_date_from, self._modification_date_to)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen ReportValue()."""
        obj = Entry()
        obj.set_group_id(dictionary["group_id"])
        obj.set_modification_date_from(dictionary["modification_date_from"])
        obj.set_modification_date_to(dictionary["modification_date_to"])

        return obj
