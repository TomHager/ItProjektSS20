from server.bo.Group import Group
from server.bo.User import User

from server.db.Mapper import Mapper


class GroupMapper(Mapper):
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
        cursor.execute("SELECT * FROM groupMemberships")
        tuples = cursor.fetchall()

        for (member, group_membership) in tuples:
            group_membership = GroupMemberships()
            group_membership.set_member(member)
            group_membership.set_group_membership(group_membership)
            result.append(group_membership)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, group_membership):
        """Einfügen eines Gruppen-Objekts in die Datenbank

        Dabei wird auch der Primärschlüssel des übergebenden Objekts
        berichtigt

        :param group
        :return das bereits übergebende Objekt, jedoch mit ggfs. korrigierter ID.
        """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM groups ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            group.set_id(maxid[0] + 1)

        command = "INSERT INTO group_membership (member, group_membership) VALUES (%s,%s)"
        data = (group_membership.get_member(), group_membership.get_group_membership())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return group

    def update(self, group_membership):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param group das Objekt, das in die DB geschrieben werden soll
        """

        cursor = self._cnx.cursor()

        command = "UPDATE group " + "SET member=%s, group_membership=%s WHERE id=%s"
        data = (group_membership.get_member(), group_membership.get_group_membership())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, group_membership):
        """Löschen der Daten eines Gruppen-Objekts aus der Datenbank

        :param group das aus der DB zu löschende "Objekt"
        """

        cursor = self._cnx.cursor()

        command = "DELETE FROM groupMembers WHERE id={}".format(group_membership.get_id())
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
        command = "SELECT * FROM groupMemberships WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (member, group_membership) = tuples[0]
            group_membership = GroupMembership()
            group_membership.set_member(member)
            group_membership.set_group_membership(group_membership)

        result = group_membership

        self._cnx.commit()
        cursor.close()

        return result

    def find_group_by_user(self, member):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param name Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT member, group_membership FROM groupMemberships WHERE member={} ORDER BY member".format(member)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (member, group_membership) in tuples:
            group_membership = GroupMembership()
            group_membership.set_member(id)
            group_membership.set_group_membership(group_membership)
            result.append(group_membership)

        self._cnx.commit()
        cursor.close()

        return result

    def find_user_by_group(self, group_membership):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param name Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM groupMemberships WHERE group_membership={} ORDER BY group_membership".format(group_membership)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (member, group_membership) in tuples:
            group_membership = GroupMembership()
            group_membership.set_member(member)
            group_membership.set_group_membership(group_membership)
            result.append(group_membership)

        self._cnx.commit()
        cursor.close()

        return result