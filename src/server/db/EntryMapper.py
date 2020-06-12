from server.bo.Entry import Entry
from server.db.Mapper import Mapper


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
        cursor.execute("SELECT unit, amount, article_id, article_name, article_standard, modification_date "
                       "from entries")
        tuples = cursor.fetchall()

        for (unit, amount, article_id, article_name, article_standard, modification_date) in tuples:
            entry = Entry()
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article_id(article_id)
            entry.set_article_name(article_name)
            entry.set_article_standard(article_standard)
            entry.set_modification_date(modification_date)

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
            entry.set_id(maxid[0] + 1)

        command = "INSERT INTO entries (unit, amount, article_id, article_name, article_standard, modification_date) " \
                  "VALUES (%s,%s,%s,%s,%s,%s)"
        data = (entry.get_unit(), entry.get_amount(), entry.get_article_id, entry.get_article_name(),
                entry.get_article_standard(), entry.get_modification_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return entry

    def update(self, entry):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

                        :param entry das Objekt, das in die DB geschrieben werden soll
                        """

        cursor = self._cnx.cursor()

        command = "UPDATE entry " + "SET unit=%s, amount=%s, article_id=%s, article_name=%s, article_standard=%s, " \
                                    "modification_date=%s WHERE id=%s"
        data = (entry.get_owner(), entry.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, entry):
        """Löschen der Daten eines Eintrag-Objekts aus der Datenbank.

                        :param entry das aus der DB zu löschende "Objekt"
                        """

        cursor = self._cnx.cursor()

        command = "DELETE FROM entries WHERE id={}".format(entry.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen eines Eintrags mit vorgegebener ID. Da diese eindeutig ist,
                        wird genau ein Objekt zurückgegeben.

                        :param id Primärschlüsselattribut (->DB)
                        :return Eintrag-Objekt, das dem übergebenen Schlüssel entspricht, None bei
                            nicht vorhandenem DB-Tupel.
                        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT unit, amount, article_id, article_name, article_standard, modification_date FROM entries " \
                  "WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (unit, amount, article_id, article_name, article_standard, modification_date) = tuples[0]
            entry = Entry()
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article_id(article_id)
            entry.set_article_name(article_name)
            entry.set_article_standard(article_standard)
            entry.set_modification_date(modification_date)

        result = entry

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_id_by_article(self, article):
        """Auslesen aller Eintrags-ID anhand des Artikels

                        :param article
                        :return entry_id, mit den zugehörigen Artikeln.
                        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT unit, amount, article_id, article_name, article_standard, modification_date " \
                  "FROM entries WHERE owner={} ORDER BY article".format(article)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (unit, amount, article_id, article_name, article_standard, modification_date) in tuples:
            entry = Entry()
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article_id(article_id)
            entry.set_article_name(article_name)
            entry.set_article_standard(article_standard)
            entry.set_modification_date(modification_date)

        self._cnx.commit()
        cursor.close()

        return result

    def find_amount_by_entry(self, entry):
        """Auslesen Menge anhand des Eintrags

                                :param entry
                                :return amount, mit den zugehörigen Eintrag.
                                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT amount FROM entries WHERE entry={} ORDER BY entry".format(entry)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (amount) in tuples:
            entry = entry()
            entry.set_amount(amount)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result


    def find_unit_by_entry(self, entry):
        """Auslesen Einheit anhand des Eintrags

                                        :param entry
                                        :return unit, zum zugehörigen Eintrag.
                                        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT unit, article_name FROM entries WHERE entry={} ORDER BY entry".format(entry)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (unit, article_name) in tuples:
            entry = entry()
            entry.set_unit(unit)
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
        command = "SELECT unit, amount, article_id, article_name, article_standard, modification_date FROM entries " \
                  "WHERE modification_date={} ORDER BY modification_date".format(modification_date)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (unit, amount, article_id, article_name, article_standard, modification_date) in tuples:
            entry = entry()
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article_id(article_id)
            entry.set_article_name(article_name)
            entry.set_article_standard(article_standard)
            entry.set_modification_date(modification_date)
            result.append(entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_entry_by_retailer_entry_list(self, retailer_entry_list):
        """Auslesen Eintrag anhand der Händlereintragsliste
                                        :param retailer_entry_list
                                        :return entry, in der zuftreffenden Händlereintragsliste.
                                                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT unit, amount, article_id, article_name, article_standard, modification_date FROM entries " \
                  "WHERE retailer_entry_list={} ORDER BY retailer_entry_list".format(retailer_entry_list)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (unit, amount, article_id, article_name, article_standard, modification_date) in tuples:
            entry = entry()
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article_id(article_id)
            entry.set_article_name(article_name)
            entry.set_article_standard(article_standard)
            entry.set_modification_date(modification_date)

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