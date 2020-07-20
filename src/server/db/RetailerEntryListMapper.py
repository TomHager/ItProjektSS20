from server.bo.RetailerEntryList import RetailerEntryList
from server.db.Mapper import Mapper


class RetailerEntryListMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):
        """Auslesen aller Benutzer unseres Systems.

        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                des Systems repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from retailerentrylists")
        tuples = cursor.fetchall()

        for (user_id, retailer_id, shopping_list_id, entry_id) in tuples:
            retailer_entry_list = RetailerEntryList()
            retailer_entry_list.set_shopping_list_id(shopping_list_id)
            retailer_entry_list.set_entry_id(entry_id)
            retailer_entry_list.set_user_id(user_id)
            retailer_entry_list.set_retailer_id(retailer_id)


            result.append(retailer_entry_list)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, retailer_entry_list):
        """Einfügen eines User-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param retailer_entry_list das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM retailerentrylists")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                retailer_entry_list.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                retailer_entry_list.set_id(1)

        command = "INSERT INTO retailerentrylists (id, user_id,retailer_id, shoppinglist_id, entry_id) " \
                  "VALUES (%s,%s,%s,%s,%s)"
        data = (retailer_entry_list.get_id(), retailer_entry_list.get_user_id(), retailer_entry_list.get_retailer_id(),
                retailer_entry_list.get_shopping_list_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return retailer_entry_list

    def update(self, retailer_entry_list):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param retailer_entry_list das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE retailerentrylists " + "SET user_id=%s, retailer_id=%s, shoppinglist_id=%s, entry_id=%s " \
                                                 "WHERE id=%s"
        data = (retailer_entry_list.get_user_id(), retailer_entry_list.get_retailer_id(),
                retailer_entry_list.get_shopping_list_id(), retailer_entry_list.get_entry_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, retailer_entry_list):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param retailer_entry_list das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM retailerentrylists WHERE id={}".format(retailer_entry_list.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return User-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel."""
        

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM retailerentrylists WHERE entry_id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (user_id, retailer_id, shoppinglist_id, entry_id) = tuples[0]
            retailer_entry_list = RetailerEntryList()
            retailer_entry_list.set_user_id(user_id)
            retailer_entry_list.set_retailer_id(retailer_id)
            retailer_entry_list.set_shopping_list_id(shoppinglist_id)
            retailer_entry_list.set_entry_id(entry_id)
            result = retailer_entry_list
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""

            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def find_user_by_retailer_entry_list(self, entry_id):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param retailer_entry_list_id Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT user_id FROM retailerentrylists WHERE entry_id LIKE '{}' " \
                  "ORDER BY entry_id".format(entry_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (user_id) in tuples:
            retailer_entry_list = RetailerEntryList()
            retailer_entry_list.set_user_id(user_id)
            result.append(retailer_entry_list)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_by_retailer_entry_list(self, entry_id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param retailer_entry_list_id E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT retailer_id FROM retailerentrylists WHERE entry_id LIKE '{}' " \
                  "ORDER BY entry_id".format(entry_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (retailer_id) in tuples:
            retailer_entry_list = RetailerEntryList()
            retailer_entry_list.set_retailer_id(retailer_id)
            result.append(retailer_entry_list)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_entry_list_by_shopping_list(self, shopping_list_id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param shopping_list_id E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id FROM retailerentrylists " \
                  "WHERE shopping_list_id LIKE '{}' ORDER BY shopping_list_id".format(shopping_list_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, shopping_list_id) in tuples:
            retailer_entry_list = RetailerEntryList()
            retailer_entry_list.set_id(id)
            retailer_entry_list.set_shopping_list_id(shopping_list_id)
            result.append(retailer_entry_list)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_entry_list_by_user(self, user_id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param user_id E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id FROM retailerentrylists WHERE user_id LIKE '{}' ORDER BY user_id".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id) in tuples:
            retailer_entry_list = RetailerEntryList()
            retailer_entry_list.set_id(id)
            retailer_entry_list.set_user_id(user_id)
            result.append(retailer_entry_list)

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_by_retailer_entry_list(self, id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT entry_id FROM retailerentrylists WHERE id LIKE '{}' ORDER BY entry_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, entry_id) in tuples:
            retailer_entry_list = RetailerEntryList()
            retailer_entry_list.set_id(id)
            retailer_entry_list.set_entry_id(entry_id)
            result.append(retailer_entry_list)

        self._cnx.commit()
        cursor.close()

        return result


if (__name__ == "__main__"):
    with RetailerEntryListMapper() as mapper:
        result = mapper.find_all()
        for retailerentrylist in result:
            print(retailerentrylist)
