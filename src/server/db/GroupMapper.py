from server.bo.Group import Group
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

                  :return Eine Sammlung mit Eintrag-Objekten.
                  """

        result = []

        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, user_id_list from groups")
        tuples = cursor.fetchall()

        for (id, name, user_id_list) in tuples:
            group = Group()
            group.set_id(id)
            group.set_name(name)
            group.set_user_id_list(user_id_list)
            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, group):
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

        command = "INSERT INTO groups (id, name, user_id_list) VALUES (%s,%s,%s)"
        data = (group.get_id(), group.get_name(), group.get_user_id_list())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return group

    def update(self, group):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param group das Objekt, das in die DB geschrieben werden soll
        """

        cursor = self._cnx.cursor()

        command = "UPDATE group " + "SET id=%s, name=%s, user_id_list=%s WHERE id=%s"
        data = (group.get_id(), group.get_name(), group.get_user_id_list())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, group):
        """Löschen der Daten eines Gruppen-Objekts aus der Datenbank

        :param group das aus der DB zu löschende "Objekt"
        """
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM groups WHERE id={}".format(group.get_id())
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
        command = "SELECT id, name, user_id_list FROM groups WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, name, user_id_list) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(name)
            group.set_user_id_list()

        result = group

        self._cnx.commit()
        cursor.close()

        return result

    def find_group_by_group_name(self, name):
        """Auslesen einer Gruppe anhand des Gruppennames.

                :param name Gruppenname der gesuchten Gruppe.
                :return Das Gruppen-Objekt,
                    mit dem gewünschten Gruppennamen enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, user_id_list FROM groups WHERE name={} ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id_list) in tuples:
            group = Group()
            group.set_id(id)
            group.set_name(name)
            group.set_user_id_list()
            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result

    def find_group_by_user(self, user_id_list):
        """Auslesen einer Gruppe anhand des Users.

                        :param user_id_list User-ID der gesuchten Gruppe.
                        :return Das Gruppen-Objekt,
                            mit dem gewünschten Mitglied.
                        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, user_id_list FROM groups WHERE user_id_list={} ORDER BY user".format(user_id_list)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id_list) in tuples:
            group = Group()
            group.set_id(id)
            group.set_name(name)
            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with GroupMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)