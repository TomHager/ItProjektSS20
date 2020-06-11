from server.bo.Article import Article
from server.db.Mapper import Mapper


class ArticleMapper(Mapper):
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

               :return Eine Sammlung mit Artikel-Objekten.
               """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, standard, retailer_id from articles")
        tuples = cursor.fetchall()

        for (id, name) in tuples:
            article = Article()
            article.set_id(id)
            article.set_name(name)
            result.append(article)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, article):
        """Einfügen eines Artikel-Objekts in die Datenbank.

                Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
                berichtigt.

                :param article das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM articles ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            article.set_id(maxid[0] + 1)

        command = "INSERT INTO articles (id, name, standard, retailer_id) VALUES (%s,%s,%s,%s)"
        data = (article.get_id(), article.get_name(), article.get_standard(), article.get_retailer_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return article

    def update(self, article):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

                :param article das Objekt, das in die DB geschrieben werden soll
                """

        cursor = self._cnx.cursor()

        command = "UPDATE article " + "SET name=%s, standard=%s, retailer_id=%s WHERE id=%s"
        data = (article.get_id(), article.get_name(), article.get_standard(), article.get_retailer_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, article):
        """Löschen der Daten eines Artikel-Objekts aus der Datenbank.

                :param article das aus der DB zu löschende "Objekt"
                """
        cursor = self._cnx.cursor()

        command = "DELETE FROM articles WHERE id={}".format(article.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen eines Artikels mit vorgegebener ID. Da diese eindeutig ist,
                wird genau ein Objekt zurückgegeben.

                :param id Primärschlüsselattribut (->DB)
                :return Artikel-Objekt, das dem übergebenen Schlüssel entspricht, None bei
                    nicht vorhandenem DB-Tupel.
                """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, standard, retailer_id FROM articles WHERE key={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, standard, retailer_id) in tuples:
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_standard(standard)
            article.set_retailer_id(retailer_id)

        result = article

        self._cnx.commit()
        cursor.close()

        return result

    def find_article_by_standard(self, standard):
        """Auslesen aller Artikel anhand des Attribut-Werts Standard

                :param standard
                :return Eine Sammlung mit Artikel-Objekten, die sämtliche Artikel
                    die Standard-Artikel sind enthält.
                """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, standard, retailer_id FROM articles WHERE standard={}".format(standard)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, standard, retailer_id) in tuples:
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_standard(standard)
            article.set_retailer_id(retailer_id)

        result = article

        self._cnx.commit()
        cursor.close()

        return result

    def find_article_by_retailer_id(self, retailer_id):
        """Auslesen aller Artikel anhand der Händer-ID

                        :param retailer_id
                        :return Eine Sammlung mit Artikel-Objekten, die sämtliche Artikel
                            mit dem zugehörigen retailer_id enthält.
                        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, standard, retailer_id FROM articles WHERE retailer_id={}".format(retailer_id)
        tuples = cursor.fetchall()

        for (id, name, standard, retailer_id) in tuples:
            article = Article()
            article.set_id(id)
            article.set_name(name)
            article.set_standard(standard)
            article.set_retailer_id(retailer_id)

        result = article

        self._cnx.commit()
        cursor.close()

        return result





"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ArticleMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
