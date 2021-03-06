from server.bo.ShoppingList import ShoppingList
from server.db.Mapper import Mapper

"""
@author Robin Fink
"""


class ShoppingListMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller ShoppingLists unseres Systems.

        :return Eine Sammlung mit ShoppingList-Objekten, die sämtliche ShoppingLists
                des Systems repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM shoppinglists")
        tuples = cursor.fetchall()

        for (id, name, group_id) in tuples:
            shoppinglist = ShoppingList()
            shoppinglist.set_id(id)
            shoppinglist.set_name(name)
            shoppinglist.set_group_id(group_id)
            result.append(shoppinglist)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, shoppinglist):
        """Einfügen eines Shoppinglist-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param shoppinglist das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM shoppinglists ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Shoppinglist-Objekt zu."""
                shoppinglist.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                shoppinglist.set_id(1)

        command = "INSERT INTO shoppinglists (id, name, group_id) VALUES (%s,%s,%s)"
        data = (shoppinglist.get_id(), shoppinglist.get_name(),
                shoppinglist.get_group_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return shoppinglist

    def update(self, shoppinglist):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param shoppinglist das Objekt, das in die DB geschrieben werden soll.
        """
        cursor = self._cnx.cursor()

        command = "UPDATE shoppinglists " + "SET name=%s, group_id=%s WHERE id=%s"
        data = (shoppinglist.get_name(),
                shoppinglist.get_group_id(), shoppinglist.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, shoppinglist):
        """Löschen der Daten eines Shoppinglist-Objekts aus der Datenbank.

        :param shoppinglist das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM shoppinglists WHERE id={}".format(
            shoppinglist.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_key(self, key):
        """Suchen einer Shoppingliste mit vorgegebener Shoppinglist ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Shoppinglist-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, group_id FROM shoppinglists WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, group_id) = tuples[0]
            shoppinglist = ShoppingList()
            shoppinglist.set_id(id)
            shoppinglist.set_name(name)
            shoppinglist.set_group_id(group_id)
            result = shoppinglist
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_shopping_list_by_name(self, name):
        """Auslesen aller Shoppinglisten anhand des Namens.

        :param name Name der zugehörigen Shoppinglist.
        :return Eine Sammlung mit Shoppinglist-Objekten, die sämtliche Shoppinglisten
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, group_id FROM shoppinglists WHERE name= {} ORDER BY name".format(
            name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, group_id) in tuples:
            shoppinglist = ShoppingList()
            shoppinglist.set_id(id)
            shoppinglist.set_name(name)
            shoppinglist.set_group_id(group_id)
            result.append(shoppinglist)

        self._cnx.commit()
        cursor.close()

        return result

    def find_shopping_list_by_group(self, group_id):
        """Suchen einer Shoppingliste mit vorgegebener Shoppinglist ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param group_id Primärschlüsselattribut (->DB)
        :return Shoppinglist-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, group_id FROM shoppinglists WHERE group_id={} ORDER BY id".format(
            group_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, group_id) in tuples:
            shoppinglist = ShoppingList()
            shoppinglist.set_id(id)
            shoppinglist.set_name(name)
            shoppinglist.set_group_id(group_id)
            result.append(shoppinglist)

        self._cnx.commit()
        cursor.close()

        return result


if (__name__ == "__main__"):
    with ShoppingListMapper() as mapper:
        result = mapper.find_all()
        for shoppinglist in result:
            print(shoppinglist)
