from server.bo.RetailerGroup import RetailerGroup

from server.db.Mapper import Mapper

"""
@author Robin Fink
"""

class RetailerGroupMapper(Mapper):
    """Mapper-Klasse, die Account-Objekte auf eine relationale
        Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
        gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
        gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
        in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden."""

    def __init__(self):
        super().__init__()

    def insert(self, retailer_group):
        """Einfügen eines Gruppen-Objekts in die Datenbank

        Dabei wird auch der Primärschlüssel des übergebenden Objekts
        berichtigt

        :param retailer_group
        :return das bereits übergebende Objekt, jedoch mit ggfs. korrigierter ID.
        """

        cursor = self._cnx.cursor()

        command = "INSERT INTO retailergroups (retailer_member, retailer_group) VALUES (%s,%s)"
        data = (retailer_group.get_retailer_member(), retailer_group.get_retailer_group())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return retailer_group

    def delete2(self, retailer_group, retailer_member):
        """Löschen der Daten eines Gruppen-Objekts aus der Datenbank

        :param retailer_group das aus der DB zu löschende "Objekt"
        """

        cursor = self._cnx.cursor()

        command = "DELETE FROM retailergroups WHERE retailer_group={} AND retailer_member={}"\
            .format(retailer_group, retailer_member)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def find_group_by_retailer(self, retailer_member):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param retailer_member Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM retailergroups WHERE retailer_member={} ORDER BY retailer_member"\
            .format(retailer_member)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (retailer_member, retailer_group) in tuples:
            retailergroup = RetailerGroup()
            retailergroup.set_retailer_member(retailer_member)
            retailergroup.set_retailer_group(retailer_group)
            result.append(retailergroup)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_by_group(self, retailer_group):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param retailer_group Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM retailergroups WHERE retailer_group={} ORDER BY retailer_group".format(retailer_group.get)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (retailer_member, retailer_group) in tuples:
            retailergroup = RetailerGroup()
            retailergroup.set_retailer_member(retailer_member)
            retailergroup.set_retailer_group(retailer_group)
            result.append(retailergroup)

        self._cnx.commit()
        cursor.close()

        return result

    def update(self):
        pass

    def find_all(self):
        pass

    def find_by_key(self, key):
        pass

    def delete(self):
        pass