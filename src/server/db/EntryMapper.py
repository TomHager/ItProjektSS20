from server.bo.Entry import Entry
from server.db.Mapper import Mapper
from datetime import datetime

class EntryMapper(Mapper):
    """Mapper-Klasse, die Account-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Einträge.

                       :return Eine Sammlung mit Eintrag-Objekten.
                       """

        result = []

        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM entries")

        tuples = cursor.fetchall()

        for (id, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, bought) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
            entry.set_user_id(user_id)
            entry.set_retailer_id(retailer_id)
            entry.set_shopping_list_id(shopping_list_id)
            entry.set_bought(bought)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, entry):
        """Einfügen eines Eintrag-Objekts in die Datenbank.

                        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
                        berichtigt.

                        :param entry das zu speichernde Objekt
                        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                        """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM entries ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                entry.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                entry.set_id(1)

        command = "INSERT INTO entries (id, unit, amount, article, modification_date, user_id, " \
                  "retailer_id, shopping_list_id, bought) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (entry.get_id(), entry.get_unit(), entry.get_amount(), entry.get_article(),
                entry.get_modification_date(), entry.get_user_id(), entry.get_retailer_id(),
                entry.get_shopping_list_id(), entry.get_bought())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return entry

    def update(self, entry):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

                        :param entry das Objekt, das in die DB geschrieben werden soll
                        """

        cursor = self._cnx.cursor()

        command = "UPDATE entries " + "SET unit=%s, amount=%s, article=%s, modification_date=%s, user_id=%s, " \
                                      "retailer_id=%s, shopping_list_id=%s, bought=%s WHERE id=%s"
        data = (entry.get_id(), entry.get_unit(), entry.get_amount(), entry.get_article,
                entry.set_modification_date(datetime.now()), entry.get_user_id(), entry.get_retailer_id(),
                entry.get_shopping_list_id(), entry.get_bought())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, entry):
        """Löschen der Daten eines Retailer-Objekts aus der Datenbank.

        :param retailer das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM entries WHERE id={}".format(entry.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen eines Eintrags mit vorgegebener ID. Da diese eindeutig ist,
                        wird genau ein Objekt zurückgegeben.

                        :param key Primärschlüsselattribut (->DB)
                        :return Eintrag-Objekt, das dem übergebenen Schlüssel entspricht, None bei
                            nicht vorhandenem DB-Tupel.
                        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM entries WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, bought) = tuples[0]
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
            entry.set_user_id(user_id)
            entry.set_retailer_id(retailer_id)
            entry.set_shopping_list_id(shopping_list_id)
            entry.set_bought(bought)

            result = entry

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_by_article(self, article):
        """Auslesen aller Eintrags-ID anhand des Artikels

                        :param article
                        :return entry_id, mit den zugehörigen Artikeln.
                        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM entries WHERE article Like '{}' ORDER BY article".format(article)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, bought) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
            entry.set_user_id(user_id)
            entry.set_retailer_id(retailer_id)
            entry.set_shopping_list_id(shopping_list_id)
            entry.set_bought(bought)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_unit_amount_by_entry(self, entry_id):
        """Auslesen Menge anhand des Eintrags

                                :param entry_id
                                :return amount, mit den zugehörigen Eintrag.
                                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT unit, amount FROM entries WHERE entry={} ORDER BY entry".format(entry_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (unit, amount) in tuples:
            entry = Entry()
            entry.set_unit(unit)
            entry.set_amount(amount)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_by_modification_date(self, modification_date):
        """Auslesen Eintrag anhand des Änderungsdatums

                                        :param modification_date
                                        :return entry, mit dem zutreffenden Veränderungsdatum.
                                        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM entries WHERE modification_date={} ORDER BY modification_date".format(
            modification_date)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, bought) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
            entry.set_user_id(user_id)
            entry.set_retailer_id(retailer_id)
            entry.set_shopping_list_id(shopping_list_id)
            entry.set_bought(bought)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_user_by_entry(self, id):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param entry Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT user_id FROM entries WHERE id LIKE '{}' " \
                  "ORDER BY id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (user_id) in tuples:
            entry = Entry()
            entry.set_user_id(user_id)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_by_entry(self, id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param entry E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT retailer_id FROM entries WHERE id LIKE '{}' " \
                  "ORDER BY id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (retailer_id) in tuples:
            entry = Entry()
            entry.set_retailer_id(retailer_id)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_by_retailer(self, retailer_id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param entry E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM entries WHERE retailer_id LIKE '{}' " \
                  "ORDER BY retailer_id".format(retailer_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, bought) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
            entry.set_user_id(user_id)
            entry.set_retailer_id(retailer_id)
            entry.set_shopping_list_id(shopping_list_id)
            entry.set_bought(bought)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_by_shopping_list(self, shopping_list_id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param shopping_list_id E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM entries " \
                  "WHERE shopping_list_id LIKE '{}' ORDER BY shopping_list_id".format(shopping_list_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, bought) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
            entry.set_user_id(user_id)
            entry.set_retailer_id(retailer_id)
            entry.set_shopping_list_id(shopping_list_id)
            entry.set_bought(bought)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_by_user(self, user_id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param user_id E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit der gewünschten E-Mail-Adresse enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM entries WHERE user_id LIKE '{}' ORDER BY user_id".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, bought) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
            entry.set_user_id(user_id)
            entry.set_retailer_id(retailer_id)
            entry.set_shopping_list_id(shopping_list_id)
            entry.set_bought(bought)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def get_report_data(self, groups_id, modification_date_from, modification_date_to):
        """Suchen eines Eintrags mit vorgegebener ID. Da diese eindeutig ist,
                        wird genau ein Objekt zurückgegeben.

                        :param key Primärschlüsselattribut (->DB)
                        :return Eintrag-Objekt, das dem übergebenen Schlüssel entspricht, None bei
                            nicht vorhandenem DB-Tupel.
                        """

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM entries WHERE groups_id={} AND bought=1 AND (modification_date " \
                  "BETWEEN modification_date_from={} AND modification_date_to={})".format(groups_id, modification_date_from,
                                                                                     modification_date_to)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, bought) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
            entry.set_user_id(user_id)
            entry.set_retailer_id(retailer_id)
            entry.set_shopping_list_id(shopping_list_id)
            entry.set_bought(bought)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with EntryMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)