from server.bo.RetailerEntryList import RetailerEntryList
from server.db.Mapper import Mapper


class RetailerEntryListMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Benutzer unseres Systems.

        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                des Systems repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from retailerentrylist")
        tuples = cursor.fetchall()

        for (user_id, user_name, retailer_id, retailer_name, shopping_list_id) in tuples:
            retailerentrylist = RetailerEntryList()
            retailerentrylist.set_user_id(user_id)
            retailerentrylist.set_user_name(user_name)
            retailerentrylist.set_retailer_id(retailer_id)
            retailerentrylist.set_retailer_name(retailer_name)
            retailerentrylist.set_shopping_list_id(shopping_list_id)
            result.append(retailerentrylist)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, retailerentrylist):
        """Einfügen eines User-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param user das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM retailerentrylist")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                retailerentrylist.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                retailerentrylist.set_id(1)

        command = "INSERT INTO users (id, name, email, external_id) VALUES (%s,%s,%s,%s)"
        data = (user.get_id(), user.get_name(), user.get_email(), user.get_external_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user

    def update(self, retailerentrylist):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE users " + "SET name=%s, email=%s WHERE external_id=%s"
        data = (user.get_name(), user.get_email(), user.get_external_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, retailerentrylist):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM users WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return User-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, external_id FROM users WHERE id={}".format(key)
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

    def find_user_by_retailer_entry_list(self, name):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param name Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, external_id FROM users WHERE name LIKE '{}' ORDER BY name".format(name)
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

    def find_retailer_by_retailer_entry_list(self, mail_address):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param mail_address E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, external_id FROM users WHERE email={}".format(mail_address)
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

    def find_retailer_entry_list_by_shopping_list(self, mail_address):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param mail_address E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, external_id FROM users WHERE email={}".format(mail_address)
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

    def find_retailer_entry_list_by_user(self, mail_address):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param mail_address E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, external_id FROM users WHERE email={}".format(mail_address)
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

    def find_entry_by_retailer_entry_list(self, external_id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param external_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, external_id FROM users WHERE external_id='{}'".format(external_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, external_id) = tuples[0]
            u = User()
            u.set_id(id)
            u.set_name(name)
            u.set_email(email)
            u.set_external_id(external_id)
            result = u
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result



if (__name__ == "__main__"):
    with RetailerEntryListMapper() as mapper:
        result = mapper.find_all()
        for retailerentrylist in result:
            print(retailerentrylist)
