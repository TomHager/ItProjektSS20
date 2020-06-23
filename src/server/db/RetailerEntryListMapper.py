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

        for (id, user_id, retailer_id, shopping_list_id) in tuples:
            retailerentrylist = RetailerEntryList()
            retailerentrylist.set_id(id)
            retailerentrylist.set_user_id(user_id)
            retailerentrylist.set_retailer_id(retailer_id)
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

        command = "INSERT INTO retailerentrylist (id, user_id,retailer_id, shoppinglist_id, entry_id) VALUES (%s,%s,%s,%s,%s)"
        data = (retailerentrylist.get_id(), retailerentrylist.get_user_id(), retailerentrylist.get_retailer_id(), retailerentrylist.get_shopping_list_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return retailerentrylist

    def update(self, retailerentrylist):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE retailerentrylist " + "SET user_id=%s, retailer_id=%s, shoppinglist_id=%s WHERE id=%s, entry_id=%s"
        data = (retailerentrylist.get_user_id(), retailerentrylist.get_retailer_id(),retailerentrylist.get_shopping_list_id(), retailerentrylist.get_entry_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, retailerentrylist):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM retailerentrylist WHERE id={}".format(retailerentrylist.get_id())
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
        command = "SELECT id, user_id, retailer_id, shoppinglist_id, entry_id FROM retailerentrylist WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, user_id, retailer_id, shoppinglist_id, entry_id) = tuples[0]
            retailerentrylist = RetailerEntryList()
            retailerentrylist.set_id(id)
            retailerentrylist.set_user_id(user_id)
            retailerentrylist.set_retailer_id(retailer_id)
            retailerentrylist.set_shopping_list_id(shoppinglist_id)
            retailerentrylist.set_entry_id()
            result = retailerentrylist
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_user_by_retailer_entry_list(self, retailer_entry_list):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param name Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, user_id, retailer_id, shoppinglist_id, entry_id FROM retailerentrylist WHERE user_id LIKE '{}' ORDER BY user_id".format(retailer_entry_list)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id, retailer_id, shopping_list_id, entry_id) in tuples:
            retailerentrylist = RetailerEntryList()
            retailerentrylist.set_id(id)
            retailerentrylist.set_user_id(user_id)
            retailerentrylist.set_retailer_id(retailer_id)
            retailerentrylist.set_shopping_list_id()
            retailerentrylist.set_entry_id()
            result.append(retailerentrylist)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_by_retailer_entry_list(self, retailer_entry_list):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param mail_address E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, user_id, retailer_id, shoppinglist_id, entry_id FROM retailerentrylist WHERE retailer_id LIKE '{}' ORDER BY retailer_id".format(retailer_entry_list)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id, retailer_id, shopping_list_id, entry_id) in tuples:
            retailerentrylist = RetailerEntryList()
            retailerentrylist.set_id(id)
            retailerentrylist.set_user_id(user_id)
            retailerentrylist.set_retailer_id(retailer_id)
            retailerentrylist.set_shopping_list_id()
            retailerentrylist.set_entry_id()
            result.append(retailerentrylist)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_entry_list_by_shopping_list(self, shopping_list):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param mail_address E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, user_id, retailer_id, shoppinglist_id, entry_id FROM retailerentrylist WHERE id LIKE '{}' ORDER BY id".format(shopping_list)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id, retailer_id, shopping_list_id, entry_id) in tuples:
            retailerentrylist = RetailerEntryList()
            retailerentrylist.set_id(id)
            retailerentrylist.set_user_id(user_id)
            retailerentrylist.set_retailer_id(retailer_id)
            retailerentrylist.set_shopping_list_id()
            retailerentrylist.set_entry_id()
            result.append(retailerentrylist)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_entry_list_by_user(self, user_id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param mail_address E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, user_id, retailer_id, shoppinglist_id, entry_id FROM retailerentrylist WHERE user_id LIKE '{}' ORDER BY user_id".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id, retailer_id, shopping_list_id, entry_id) in tuples:
            retailerentrylist = RetailerEntryList()
            retailerentrylist.set_id(id)
            retailerentrylist.set_user_id(user_id)
            retailerentrylist.set_retailer_id(retailer_id)
            retailerentrylist.set_shopping_list_id()
            retailerentrylist.set_entry_id()
            result.append(retailerentrylist)

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_by_retailer_entry_list(self, retailer_entry_list):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param external_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, user_id, retailer_id, shoppinglist_id, entry_id FROM retailerentrylist WHERE user_id LIKE '{}' ORDER BY user_id".format(retailer_entry_list)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id, retailer_id, shopping_list_id, entry_id) in tuples:
            retailerentrylist = RetailerEntryList()
            retailerentrylist.set_id(id)
            retailerentrylist.set_user_id(user_id)
            retailerentrylist.set_retailer_id(retailer_id)
            retailerentrylist.set_shopping_list_id()
            retailerentrylist.set_entry_id()
            result.append(retailerentrylist)

        self._cnx.commit()
        cursor.close()

        return result



if (__name__ == "__main__"):
    with RetailerEntryListMapper() as mapper:
        result = mapper.find_all()
        for retailerentrylist in result:
            print(retailerentrylist)
