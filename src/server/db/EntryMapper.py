from datetime import date
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
        cursor.execute("SELECT * FROM entries")

        tuples = cursor.fetchall()

        for (id, unit, amount, article, modification_date) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
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

        command = "INSERT INTO entries (id, bought, unit, amount, article, modification_date) " \
                  "VALUES (%s,%s,%s,%s,%s,%s)"
        data = (entry.get_id(), entry.get_bought(), entry.get_unit(), entry.get_amount(), entry.get_article(),
                entry.get_modification_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return entry

    def update(self, entry):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

                        :param entry das Objekt, das in die DB geschrieben werden soll
                        """

        cursor = self._cnx.cursor()

        command = "UPDATE entry " + "SET unit=%s, bought=%s, amount=%s, article=%s WHERE id=%s"
        data = (entry.get_unit(), entry.get_bought(), entry.get_amount(), entry.get_article,
                entry.get_modification_date())
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
            (id, bought, unit, amount, article, modification_date) = tuples[0]
            entry = Entry()
            entry.set_id(id)
            entry.set_bought(bought)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
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
        command = "SELECT * FROM entries WHERE article={} ORDER BY article".format(article)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, bought, unit, amount, article, modification_date) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_bought(bought)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)

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

    def find_bought_by_entry(self, entry_id):
        """Auslesen Einheit anhand des Eintrags

                                        :param entry_id
                                        :return unit, zum zugehörigen Eintrag.
                                        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT bought, article FROM entries WHERE entry={} ORDER BY entry".format(entry_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (bought, article) in tuples:
            entry = Entry()
            entry.set_bought(bought)
            entry.set_article(article)
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

        for (id, bought, unit, amount, article, modification_date) in tuples:
            entry = Entry()
            entry.set_id(id)
            entry.set_bought(bought)
            entry.set_unit(unit)
            entry.set_amount(amount)
            entry.set_article(article)
            entry.set_modification_date(modification_date)
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
