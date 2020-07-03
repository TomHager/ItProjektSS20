from server.bo.GroupMembership import GroupMembership

from server.db.Mapper import Mapper


class GroupMembershipMapper(Mapper):
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
        cursor.execute("SELECT * FROM groupmemberships")
        tuples = cursor.fetchall()

        for (member, membership) in tuples:
            group_membership = GroupMembership()
            group_membership.set_member(member)
            group_membership.set_membership(membership)
            result.append(group_membership)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, group_membership):
        """Einfügen eines Gruppen-Objekts in die Datenbank

        Dabei wird auch der Primärschlüssel des übergebenden Objekts
        berichtigt

        :param group_membership
        :return das bereits übergebende Objekt, jedoch mit ggfs. korrigierter ID.
        """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM groupmemberships ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            group_membership.set_id(maxid[0] + 1)

        command = "INSERT INTO groupmemberships (member, membership) VALUES (%s,%s)"
        data = (group_membership.get_member(), group_membership.get_membership())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return group_membership

    def update(self, group_membership):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param group_membership das Objekt, das in die DB geschrieben werden soll
        """

        cursor = self._cnx.cursor()

        command = "UPDATE groupmemberships " + "SET member=%s, membership=%s WHERE id=%s"
        data = (group_membership.get_member(), group_membership.get_membership())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, group_membership):
        """Löschen der Daten eines Gruppen-Objekts aus der Datenbank

        :param group_membership das aus der DB zu löschende "Objekt"
        """

        cursor = self._cnx.cursor()

        command = "DELETE FROM groupmemberships WHERE id={}".format(group_membership.get_id())
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
        command = "SELECT * FROM groupmemberships WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (member, membership) = tuples[0]
            group_membership = GroupMembership()
            group_membership.set_member(member)
            group_membership.set_membership(membership)

        result = group_membership

        self._cnx.commit()
        cursor.close()

        return result

    def find_group_by_user(self, member):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param member Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT member, membership FROM groupmemberships WHERE member={} ORDER BY member".format(member)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (member, membership) in tuples:
            group_membership = GroupMembership()
            group_membership.set_member(id)
            group_membership.set_membership(membership)
            result.append(group_membership)

        self._cnx.commit()
        cursor.close()

        return result

    def find_user_by_group(self, membership):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param membership Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM groupmemberships WHERE membership={} ORDER BY membership".format(membership)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (member, membership) in tuples:
            group_membership = GroupMembership()
            group_membership.set_member(member)
            group_membership.set_membership(membership)
            result.append(group_membership)

        self._cnx.commit()
        cursor.close()

        return result

