from server.bo.Retailer import Retailer
from server.db.Mapper import Mapper


class RetailerMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Händler unseres Systems.

        :return Eine Sammlung mit Händler-Objekten, die sämtliche Händler
                des Systems repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from users")
        tuples = cursor.fetchall()

        for (id, name, group_id) in tuples:
            retailer = Retailer()
            retailer.set_id(id)
            retailer.set_name(name)
            retailer.set_group_id(group_id)
            result.append(retailer)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, retailer):
        """Einfügen eines Retailer-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param retailer das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM retailer ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                retailer.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                retailer.set_id(1)

        command = "INSERT INTO retailer (id, name, group_id) VALUES (%s,%s,%s)"
        data = (retailer.get_id(), retailer.get_name(), retailer.get_group_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return retailer

    def update(self, retailer):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param retailer das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE retailer " + "SET name=%s WHERE group_id=%s"
        data = (retailer.get_name(), retailer.get_group_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, retailer):
        """Löschen der Daten eines Retailer-Objekts aus der Datenbank.

        :param retailer das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM retailer WHERE id={}".format(retailer.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen eines Händlerss mit vorgegebener Retailer ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Retailer-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, group_id FROM retailer WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, group_id) = tuples[0]
            retailer = Retailer()
            retailer.set_id(id)
            retailer.set_name(name)
            retailer.set_group_id(group_id)
            result.append(retailer)
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_by_retailer_name(self, name):
        """Auslesen aller Händler anhand des Händlernamens.

        :param name Name der zugehörigen Händlers.
        :return Eine Sammlung mit Retailer-Objekten, die sämtliche Händler
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, group_id FROM retailer WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, group_id) in tuples:
            retailer = retailer()
            retailer.set_id(id)
            retailer.set_name(name)
            retailer.set_group_id(group_id)
            result.append(retailer)

        self._cnx.commit()
        cursor.close()

        return result

    def find_retailer_by_group_id(self, group_id):
        """Suchen eines Händlers mit vorgegebener Gruppen ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param group_id die Gruppen ID des gesuchten Retailers.
        :return Retailer-Objekt, das die übergebene Gruppen ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, group_id FROM retailer WHERE group_id='{}'".format(group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, group_id) = tuples[0]
            r = retailer()
            r.set_id(id)
            r.set_name(name)
            r.set_group_id(group_id)
            result = r
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result



if (__name__ == "__main__"):
    with RetailerMapper() as mapper:
        result = mapper.find_all()
        for retailer in result:
            print(retailer)
