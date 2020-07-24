from server.bo.GroupMembership import GroupMembership
from server.db.Mapper import Mapper

"""
@author Yasemin
@author Robin Fink
"""

class GroupMembershipMapper(Mapper):
    """Mapper-Klasse, die Account-Objekte auf eine relationale
        Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
        gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
        gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
        in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden."""

    def __init__(self):
        super().__init__()

    def insert(self, group_membership):
        """Einfügen eines Gruppen-Objekts in die Datenbank

        Dabei wird auch der Primärschlüssel des übergebenden Objekts
        berichtigt

        :param group_membership
        :return das bereits übergebende Objekt, jedoch mit ggfs. korrigierter ID.
        """

        cursor = self._cnx.cursor()

        command = "INSERT INTO groupmemberships (member, group_membership) VALUES (%s,%s)"
        data = (group_membership.get_member(), group_membership.get_group_membership())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return group_membership

    def delete2(self, group_membership, member):
        """Löschen der Daten eines Gruppen-Objekts aus der Datenbank

        :param group_membership das aus der DB zu löschende "Objekt"
        """

        cursor = self._cnx.cursor()

        command = "DELETE FROM groupmemberships WHERE group_membership={} AND member={}"\
            .format(group_membership, member)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_group_by_user(self, member):
        """Auslesen einer Gruppe anhand der UserId.

                :param member Gruppenname der gesuchten Gruppe.  #todo so richtig wir übergeben doch den user?
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM groupmemberships WHERE member={} ORDER BY member".format(member)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (member, group_membership) in tuples:
            group_memberships = GroupMembership()
            group_memberships.set_member(member)
            group_memberships.set_group_membership(group_membership)
            result.append(group_memberships)

        self._cnx.commit()
        cursor.close()

        return result



    def find_user_by_group(self, group_membership):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param membership Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM groupmemberships WHERE group_membership={} ORDER BY group_membership"\
            .format(group_membership)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (member, membership) in tuples:
            group_memberships = GroupMembership()
            group_memberships.set_member(member)
            group_memberships.set_group_membership(group_membership)
            result.append(group_memberships)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all(self):
        pass

    def find_by_key(self, key):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with GroupMembershipMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
