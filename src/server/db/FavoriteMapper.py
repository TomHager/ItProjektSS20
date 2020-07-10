from server.bo.Favorite import Favorite
from server.db.Mapper import Mapper


class FavoriteMapper(Mapper):
    """Mapper-Klasse, die Account-Objekte auf eine relationale
        Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
        gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
        gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
        in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
        """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Artikel.

               :return Eine Sammlung mit Favorite-Objekten.
               """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM favorites")
        tuples = cursor.fetchall()

        for (id, unit, amount, article) in tuples:
            favorite = Favorite()
            favorite.set_id(id)
            favorite.set_unit(unit)
            favorite.set_amount(amount)
            favorite.set_article(article)
            result.append(favorite)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, favorite):
        """Einfügen eines Favorite-Objekts in die Datenbank.

                Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
                berichtigt.

                :param favorite das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM favorites ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            favorite.set_id(maxid[0] + 1)

        command = "INSERT INTO favorites (id, unit, amount, article) VALUES (%s,%s,%s,%s)"
        data = (favorite.get_id(), favorite.get_unit(), favorite.get_amount(), favorite.get_article())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return favorite

    def update(self, favorite):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

                :param favorite das Objekt, das in die DB geschrieben werden soll
                """

        cursor = self._cnx.cursor()

        command = "UPDATE favorites " + "SET unit=%s, amount=%s, article=%s WHERE id=%s"
        data = (favorite.get_id(), favorite.get_unit(), favorite.get_amount(), favorite.get_article())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, favorite):
        """Löschen der Daten eines Artikel-Objekts aus der Datenbank.

                :param favorite das aus der DB zu löschende "Objekt"
                """
        cursor = self._cnx.cursor()

        command = "DELETE FROM favorites WHERE id={}".format(favorite.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen eines Artikels mit vorgegebener ID. Da diese eindeutig ist,
                wird genau ein Objekt zurückgegeben.

                :param key Primärschlüsselattribut (->DB)
                :return Artikel-Objekt, das dem übergebenen Schlüssel entspricht, None bei
                    nicht vorhandenem DB-Tupel.
                """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM favorites WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, unit, amount, article) = tuples[0]
            favorite = Favorite()
            favorite.set_id(id)
            favorite.set_unit(unit)
            favorite.set_amount(amount)
            favorite.set_article(article)
            result = favorite
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with FavoriteMapper() as mapper:
        result = mapper.find_all()
        for fav in result:
            print(fav)