from server.bo.Group import Group
from server.bo.Retailer import Retailer

from server.db.Mapper import Mapper


class RetailerGroup(Mapper):
    """Mapper-Klasse, die Account-Objekte auf eine relationale
        Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
        gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
        gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
        in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Einträge.

                  :return
                  """

        result = []

        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM retailerGroups")
        tuples = cursor.fetchall()

        for (retailer_member, retailer_group) in tuples:
            retailer_group = RetailerGroup()
            retailer_group.set_retailer_member(retailer_member)
            retailer_group.set_retailer_group(retailer_group)
            result.append(retailer_group)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, retailer_group):
        """Einfügen eines Gruppen-Objekts in die Datenbank

        Dabei wird auch der Primärschlüssel des übergebenden Objekts
        berichtigt

        :param group
        :return das bereits übergebende Objekt, jedoch mit ggfs. korrigierter ID.
        """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM retailerGroups")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            retailer_group.set_id(maxid[0] + 1)

        command = "INSERT INTO retailerGroups (retailer_member, retailer_group) VALUES (%s,%s)"
        data = (retailer_group.get_retailer_member(), retailer_group.get_retailer_group())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return retailer_group

    def update(self, retailer_group):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param group das Objekt, das in die DB geschrieben werden soll
        """

        cursor = self._cnx.cursor()

        command = "UPDATE retailerGroups " + "SET retailer_member=%s, retailer_group=%s WHERE id=%s"
        data = (retailer_group.get_retailer_member(), retailer_group.get_retailer_group())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, retailer_group):
        """Löschen der Daten eines Gruppen-Objekts aus der Datenbank

        :param group das aus der DB zu löschende "Objekt"
        """

        cursor = self._cnx.cursor()

        command = "DELETE FROM retailerGroups WHERE id={}".format(retailer_group.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen einer Gruppe mit vorgegebener Gruppennummer. Da diese eindeutig ist
         wird genau ein Objekt zurückgegeben.

         :param key Primärschlüsselattribut (->DB)
         :return Gruppen-Objekt, das dem übergebenen Schlüssel entspricht, None bei
             nicht vorhandenem DB-Tupel.
         """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM retailerGroups WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (member, retailer_group) = tuples[0]
            retailer_group = RetailerGroup()
            retailer_group.set_member(member)
            retailer_group.set_group_membership(retailer_group)

        result = retailer_group

        self._cnx.commit()
        cursor.close()

        return result

    def find_group_by_retailer(self, retailer_member):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param name Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT retailer_member, retailer_group FROM retailerGroups WHERE member={} ORDER BY member".format(retailer_member)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (retailer_member, retailer_group) in tuples:
            retailer_group = retailer_group()
            retailer_group.set_member(id)
            retailer_group.set_group_membership(retailer_group)
            result.append(retailer_group)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_by_group(self, retailer_group):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param name Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM retailerGroups WHERE retailer_group={} ORDER BY retailer_group".format(retailer_group)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (member, retailer_group) in tuples:
            retailer_group = RetailerGroup()
            retailer_group.set_member(member)
            retailer_group.set_group_membership(retailer_group)
            result.append(retailer_group)

        self._cnx.commit()
        cursor.close()

        return result
