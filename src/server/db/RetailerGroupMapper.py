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
        cursor.execute("SELECT MAX(retailer_member) AS maxid FROM retailergroups ")
        tuples = cursor.fetchall()
        #testen
        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                retailer_group.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                retailer_group.set_id(1)

        command = "INSERT INTO retailergroups (retailer_member, retailer_group) VALUES (%s,%s)"
        data = (retailer_group.get_retailer_member(), retailer_group.get_retailer_group())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return retailer_group

    def delete(self, retailer_group):
        """Löschen der Daten eines Gruppen-Objekts aus der Datenbank

        :param retailer_group das aus der DB zu löschende "Objekt"
        """

        cursor = self._cnx.cursor()

        command = "DELETE FROM retailergroups WHERE retailer_group={} AND retailer_member={}"\
            .format(retailer_group.get_retailer_group(), retailer_group.get_retailer_member())
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (retailer_member, retailer_group) = tuples[0]
            retailer_group = RetailerGroup()
            retailer_group.set_retailer_member(retailer_member)
            retailer_group.set_retailer_group(retailer_group)

            result = retailer_group

        self._cnx.commit()
        cursor.close()

        return result

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
        command = "SELECT * FROM retailergroups WHERE retailer_group={} ORDER BY retailer_group".format(retailer_group)
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

if __name__ == '__main__':
    with RetailerGroupMapper() as mapper:
        retailergroup = RetailerGroup()
        retailergroup.set_retailer_member(5)
        retailergroup.set_retailer_group(1)
        print(retailergroup)
        result = mapper.find_retailer_by_group(1)
        print(result)