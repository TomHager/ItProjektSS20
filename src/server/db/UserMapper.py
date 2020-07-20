from server.bo.User import User
from server.db.Mapper import Mapper

""" 
@author Tom Hager
 """



class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Benutzer unseres Systems.

        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                des Systems repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM users")
        tuples = cursor.fetchall()

        for (id, name, email, external_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_external_id(external_id)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param name Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM users WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, external_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_external_id(external_id)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return User-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM users WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, external_id) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_external_id(external_id)
            result = user
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_email(self, email):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param name Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM users WHERE email LIKE '{}' ORDER BY email".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, external_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_external_id(external_id)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_external_id(self, external_id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param external_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM users WHERE external_id='{}'".format(external_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, external_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_external_id(external_id)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user):
        """Einfügen eines User-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param user das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM users ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                user.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                user.set_id(1)

        command = "INSERT INTO users (id, name, email, external_id) VALUES (%s,%s,%s,%s)"
        data = (user.get_id(), user.get_name(), user.get_email(), user.get_external_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user

    def update(self, user):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE users " + "SET name=%s, email=%s, external_id=%s WHERE id=%s"
        data = (user.get_name(), user.get_email(), user.get_external_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, user):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM users WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

