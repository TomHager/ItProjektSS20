from .bo.Entry import Entry
from .bo.Group import Group
from .bo.Retailer import Retailer
from .bo.RetailerEntryList import RetailerEntryList
from .bo.ShoppingList import ShoppingList
from .bo.User import User
from .bo.Favorite import Favorite
from .bo.RetailerGroup import RetailerGroup
from .bo.GroupMembership import GroupMembership

from .db.EntryMapper import EntryMapper
from .db.GroupMapper import GroupMapper
from .db.RetailerEntryListMapper import RetailerEntryListMapper
from .db.RetailerMapper import RetailerMapper
from .db.ShoppingListMapper import ShoppingListMapper
from .db.UserMapper import UserMapper
from .db.RetailerGroupMapper import RetailerGroupMapper
from .db.GroupMembershipMapper import GroupMembershipMapper
from .db.FavoriteMapper import FavoriteMapper


class ShoppingListAdministration(object):

    # Todo nochmal durchgehen welche attribute wichtig sind für die methoden, vllt fehlt was

    def __init__(self):
        pass

    """ 
    User-spezifische Methoden
    """

    # todo set_id bei jedem BO schaune ob es mit einer for-schleife und counter generiert und
    # immer weiter zähelen soll

    def create_user(self, name, email, google_user_id):
        """Einen Benutzer anlegen"""
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_external_id(google_user_id)
        user.set_id(1)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_name(self, name):
        """Alle Benutzer mit Namen name auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_user_by_id(self, number):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_key(number)

    def get_user_by_email(self, email):
        """Alle Benutzer mit gegebener E-Mail-Adresse auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_email(email)

    def get_user_by_external_id(self, id):
        """Den Benutzer mit der gegebenen Google ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_all_users(self):
        """Alle Benutzer auslesen."""
        with UserMapper() as mapper:
            return mapper.find_all()

    def save_user(self, user):
        """Den gegebenen Benutzer speichern."""
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        """Den gegebenen Benutzer aus unserem System löschen."""
        with UserMapper() as mapper:
            mapper.delete(user)

    """
    Group-spezifische Methoden
    """

    def create_group(self, group_name):
        """Eine Group anlegen."""
        group = Group()
        group.set_name(group_name)
        group.set_id(1)

        with GroupMapper() as mapper:
            return mapper.insert(group)

    def get_group_by_name(self, group_name):
        """Alle Groups mit übergebenem Gruppennamen auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_by_group_name(group_name)

    def get_group_by_id(self, id):
        """Group mit der gegebenen ID auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_by_id(id)

    def get_group_by_user(self, user):
        """Group mit der gegebenen User auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_by_user(user)

    def get_user_by_group(self, group):
        """Group mit der gegebenen User auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_user(group)

    def get_groups_of_user(self, user):
        """Alle Groups des gegebenen Usser auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_by_owner_id(user.get_id())  # Vorsicht: nicht geprüft!

    def get_all_groups(self):
        """Alle Kunden auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_all()

    def save_group(self, group):
        """gegebene Group speichern."""
        with GroupMapper() as mapper:
            mapper.update(group)

    def delete_group(self, group):
        """gegebene Group löschen."""
        with GroupMapper() as mapper:
            groups = self.get_groups_of_user(group)

            if not (groups is None):
                for g in groups:
                    self.delete_group(g)

            mapper.delete(group)

    """
    Retailer-spezifische Methoden
    """

    def create_retailer(self, retailer_name):
        """Einen Retailer anlegen."""
        retailer = Retailer()
        retailer.set_name(retailer_name)
        retailer.set_id(1)

        with RetailerMapper() as mapper:
            return mapper.insert(retailer)

    def get_retailer_by_name(self, retailer_name):
        """Alle Retailer mit übergebenem retailer-namen auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_by_retailer_name(retailer_name)

    def get_all_retailer(self):
        """Alle Retailer auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_all()

    def get_retailer_by_retailer_entry_list(self, retailer_entry_list):
        """Alle Kunden auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_retailer_by_retailer_entry_list(retailer_entry_list)

    def save_retailer(self, retailer):
        """gegebene Group speichern."""
        with RetailerMapper() as mapper:
            mapper.update(retailer)

    def delete_retailer(self, retailer):
        """gegebenen Retailer löschen."""
        with RetailerMapper as mapper:
            retailers = self.get_retailer_by_id(retailer)

            if not (retailers is None):
                for r in retailers:
                    self.delete_retailer(r)

            mapper.delete(retailers)

    def get_retailer_by_id(self, id):
        """Retailer nach der Id finden"""
        with RetailerMapper() as mapper:
            return mapper.find_by_key(id)

    """
    RetailerEntryList-spezifische Methoden
    """

    def create_retailer_entry_list_for_group(self, group):
        """für einen gegebe Gruppe ein neuen Händereintragsliste anlegen"""
        with RetailerEntryListMapper() as mapper:
            if group is not None:
                rel = RetailerEntryList()
                rel.set_id(1)
                rel.set_shopping_list_id(group.get_id())

                return mapper.insert(rel)
            else:
                return None

    def get_retailer_entry_list_by_name(self, retailer_entry_list_name):
        """Alle RetailerEntryList mit übergebenem RetailerEntryList-namen auslesen."""
        with RetailerEntryListMapper() as mapper:
            return mapper.find_by_retailer_entry_list_name(retailer_entry_list_name)

    def get_retailer_entry_list_by_id(self, id):
        """RetailerEntryList mit der gegebenen ID auslesen."""
        with RetailerEntryListMapper() as mapper:
            return mapper.find_by_id(id)

    def get_retailer_entry_list_by_group(self, group):
        """RetailerEntryList mit der gegebenen Group auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_by_group(group)

    def get_all_retailer_entry_list(self):
        """Alle RetailerEntryLists auslesen."""
        with RetailerEntryListMapper() as mapper:
            return mapper.find_all()

    def get_retailer_entry_list_by_retailer(self, retailer_entry_list):
        """Alle RetailerEntryList nach Retailer auslesen."""
        with RetailerEntryListMapper() as mapper:
            return mapper.find_retailer_by_retailer_entry_list(retailer_entry_list)

    def save_retailer_entry_list(self, retailer):
        """gegebene Group speichern."""
        with RetailerEntryListMapper() as mapper:
            mapper.update(retailer)

    # passt das hier mit .get_retailer_of_user ? Mapper schauen und mit anderen verständigen
    def delete_retailer_entry_list(self, retailer_entry_list):
        """gegebene Group löschen."""
        with RetailerEntryListMapper() as mapper:
            retailers = self.get_retailer_entry_list_of_group(retailer_entry_list)

            if not (retailers is None):
                for r in retailers:
                    self.delete_retailer(r)

            mapper.delete(retailers)

    """
    ShoppingList-spezifische Methoden
    """

    def get_all_shopping_list(self):
        """Alle ShoppingLists auslesen."""
        with ShoppingListMapper() as mapper:
            return mapper.find_all()

    # todo Gehört hier noch entry rein?
    def create_shopping_list(self, shopping_list_name):
        """Eine ShoppingList anlegen."""
        shoppinglist = ShoppingList()
        shoppinglist.set_name(shopping_list_name)
        shoppinglist.set_id(1)

    def get_shopping_list_by_id(self, id):
        """Article mit der gegebenen ID auslesen."""
        with ShoppingListMapper() as mapper:
            return mapper.find_by_id(id)

    def delete_shopping_list_by_id(self, shoppinglist):
        """gegebene ShoppingList löschen."""
        with ShoppingListMapper() as mapper:
            shoppinglist = self.get_shopping_list_by_id(shoppinglist)

        if not (shoppinglist is None):
            for s in shoppinglist:
                self.delete(s)

        mapper.delete(shoppinglist)

    def get_shopping_list_by_name(self, shopping_list_name):  # todo nicht fertig bzw iwas fehlt
        """ShoppingList mit übergebenem shopping-list-name auslesen."""

        with ShoppingListMapper() as mapper:
            return mapper.find_shopping_list_by_name(shopping_list_name)

    def get_shopping_list_by_group_id(self, group):
        """Retailer mit der gegebenen Group auslesen."""
        with ShoppingListMapper() as mapper:
            return mapper.find_shopping_list_by_group(group)

    """
    Entry-spezifische Methoden
    """

    def get_all_entrys(self):
        """Alle Artikel auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_all()

    def create_entry(self, entry1):  # todo prüfen
        """Einen Article anlegen."""
        entry = Entry()
        entry.set_unit(entry1)
        entry.set_amount(entry1)
        entry.set_modification_date(entry1)
        entry.set_article(entry1)
        entry.set_id(1)

    def delete_entry_by_id(self, entry_id):
        """gegebenen Entry löschen."""
        with EntryMapper() as mapper:
            entry = self.get_entry_by_id(entry_id)

        if not (entry is None):
            for e in entry:
                mapper.delete(e)  # todo so richtig?

        mapper.delete(entry)

    # todo put methode fehlt

    def get_entry_by_id(self, entry_id):
        """Entry mit der gegebenen ID auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_by_key(entry_id)

    def get_entry_by_article(self, article_id):  # todo alle entrys oder nur einer?
        """Auslesen aller Eintrags-ID anhand des Artikel-ID´s"""
        with EntryMapper() as mapper:
            return mapper.find_entry_id_by_article(article_id)

    def get_amount_by_entry(self, entry):
        """gegebenen Artikel löschen."""
        with EntryMapper() as mapper:
            return mapper.find_amount_by_entry(entry)

    def get_unit_by_entry(self, entry):
        """Alle Article mit übergebenem article-namen auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_unit_by_entry(entry)

    def get_entry_by_retailer_entry_list(self, retailer_entry_list):
        """Alle Article mit übergebenem article-namen auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_retailer_entry_list(retailer_entry_list)

    """
    RetailerGroup-spezifische Methoden
    """

    def retailer_create_group(self, group_name):
        """Eine Group anlegen."""
        group = Group()
        group.set_name(group_name)
        group.set_id(1)

        with GroupMapper() as mapper:
            return mapper.insert(group)

    def get_retailer_by_group(self, group_id):
        with RetailerGroupMapper() as mapper:
            return mapper.find_retailer_by_group(group_id)

    def get_all_retailer_members(self):
        with RetailerGroupMapper() as mapper:
            return mapper.find_all()

    def delete_retailer_group_member(self, retailer):

        with RetailerGroupMapper() as mapper:
            retailer_group_member = mapper.find_by_key(retailer)

        if not (retailer_group_member is None):
            for r in retailer_group_member:
                mapper.delete(r)

    def get_group_by_retailer(self, retailer_id):

        with RetailerGroupMapper() as mapper:
            return mapper.find_group_by_retailer(retailer_id)

    def save_retailer_group(self, retailer_group):
        """Update eines Retailers innerhalb einer Gruppe"""  # todo Richtig beschrieben?
        with RetailerGroupMapper() as mapper:
            mapper.update(retailer_group)

    def delete_retailer_by_group(self, retailer_group_id):
        """gegebenen retailer der Gruppe löschen."""
        with RetailerGroupMapper() as mapper:
            retailer_group = self.get_retailer_by_group(retailer_group_id)

        if not (retailer_group is None):
            for e in retailer_group:
                mapper.delete(e)

    """
    Favorite-spezifische Methoden
    """

    def create_favorite(self, favorite_id, amount, article, unit):
        """Favorit-Objekte erzeugen."""
        favorite = Favorite()
        favorite.set_amount(amount)
        favorite.set_unit(unit)
        favorite.set_article(article)
        favorite.set_id(favorite_id)  # todo so richtig?

    def get_all_favorits(self):
        """Alle Favorits-Objekte auslesen."""
        with FavoriteMapper as mapper:
            return mapper.find_all()

    def get_favorite_by_id(self, favorite_id):
        """Favorite-Objekt mit übergebener favorit-id auslesen."""
        with FavoriteMapper as mapper:
            return mapper.find_by_key(favorite_id)

    def delete_favorite_by_id(self, favorite_id):
        """gegebenes Favorite-Objekt löschen."""

        with FavoriteMapper() as mapper:
            favorite = self.get_favorite_by_id(favorite_id)

            if not (favorite is None):
                for e in favorite:
                    mapper.delete(e)

            mapper.delete(favorite)

    def save_favorite(self, favorite):
        with FavoriteMapper() as mapper:
            mapper.update(favorite)
