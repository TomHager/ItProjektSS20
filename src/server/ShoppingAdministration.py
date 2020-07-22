from .bo.Entry import Entry
from .bo.Group import Group
from .bo.Retailer import Retailer
from .bo.ShoppingList import ShoppingList
from .bo.User import User
from .bo.Favorite import Favorite
from .bo.RetailerGroup import RetailerGroup
from .bo.GroupMembership import GroupMembership
from .db.EntryMapper import EntryMapper
from .db.GroupMapper import GroupMapper
from .db.RetailerMapper import RetailerMapper
from .db.ShoppingListMapper import ShoppingListMapper
from .db.UserMapper import UserMapper
from .db.RetailerGroupMapper import RetailerGroupMapper
from .db.GroupMembershipMapper import GroupMembershipMapper
from .db.FavoriteMapper import FavoriteMapper


class ShoppingAdministration(object):

    # Todo nochmal durchgehen welche attribute wichtig sind für die methoden, vllt fehlt was

    def __init__(self):
        pass

    """ 
    User-spezifische Methoden
    """

    # todo set_id bei jedem BO schaune ob es mit einer for-schleife und counter generiert und
    # immer weiter zähelen soll

    def create_user(self, name, email, external_id):
        """Einen Benutzer anlegen"""
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_external_id(external_id)
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

    def get_user_by_external_id(self, external_id):
        """Alle Benutzer mit gegebener E-Mail-Adresse auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_external_id(external_id)

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
            return mapper.find_group_by_group_name(group_name)

    def get_group_by_id(self, id):
        """Group mit der gegebenen ID auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_by_key(id)

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
            return mapper.find_by_key(user.get_id())  # Vorsicht: nicht geprüft! #todo nochmal anschauen groupmembership

    def get_all_groups(self):
        """Alle Gruppen Objekte auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_all()

    def save_group(self, group):
        """gegebene Group speichern."""
        with GroupMapper() as mapper:
            mapper.update(group)

    def delete_group(self, group):
        """gegebene Group löschen."""
        with GroupMapper() as mapper:
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
            return mapper.find_retailer_by_retailer_name(retailer_name)

    def get_all_retailer(self):
        """Alle Retailer auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_all()

    def get_retailer_by_retailer_entry_list(self, retailer_entry_list):
        """Alle Retailer aus der Retailer Entry List auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_retailer_by_retailer_entry_list(retailer_entry_list)

    def save_retailer(self, retailer):
        """gegebene Group speichern."""
        with RetailerMapper() as mapper:
            mapper.update(retailer)

    def delete_retailer(self, retailer):
        """gegebenen Retailer löschen."""
        with RetailerMapper() as mapper:
            mapper.delete(retailer)

    def get_retailer_by_id(self, id):
        """Retailer nach der Id finden"""
        with RetailerMapper() as mapper:
            return mapper.find_by_key(id)

    """
    ShoppingList-spezifische Methoden
    """

    def get_all_shopping_list(self):
        """Alle ShoppingLists auslesen."""
        with ShoppingListMapper() as mapper:
            return mapper.find_all()

    def create_shopping_list(self, shopping_list_name, group_id):
        """Eine ShoppingList anlegen."""
        shoppinglist = ShoppingList()
        shoppinglist.set_name(shopping_list_name)
        shoppinglist.set_group_id(group_id)
        shoppinglist.set_id(1)

        with ShoppingListMapper() as mapper:
            return mapper.insert(shoppinglist)

    def get_shopping_list_by_id(self, id):
        """ShoppingList mit der gegebenen ID auslesen."""
        with ShoppingListMapper() as mapper:
            return mapper.find_by_key(id)

    def delete_shopping_list_by_id(self, shoppinglist):
        """gegebene ShoppingList löschen."""
        with ShoppingListMapper() as mapper:
            mapper.delete(shoppinglist)

    def get_shopping_list_by_name(self, shopping_list_name):  # todo nicht fertig bzw iwas fehlt
        """ShoppingList mit übergebenem shopping-list-name auslesen."""

        with ShoppingListMapper() as mapper:
            return mapper.find_shopping_list_by_name(shopping_list_name)

    def get_shopping_list_by_group_id(self, group):
        """ShoppingList mit der gegebenen Group auslesen."""
        with ShoppingListMapper() as mapper:
            return mapper.find_shopping_list_by_group(group)

    def save_shopping_list(self, shopping_list):
        """Update eines Shoppinglist Objektes"""  # todo Richtig beschrieben?
        with ShoppingListMapper() as mapper:
            mapper.update(shopping_list)

    """
    Entry-spezifische Methoden
    """

    def get_all_entrys(self):
        """Alle Entry Objekte auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_all()

    def create_entry(self, entry1):
        """Einen Entry anlegen."""
        entry = Entry()
        entry.set_unit(entry1)
        entry.set_amount(entry1)
        entry.set_article(entry1)
        entry.set_id(1)

    def delete_entry_by_id(self, entry_id):
        """gegebenen Entry löschen."""
        with EntryMapper() as mapper:
            mapper.delete(entry_id)

    def get_entry_by_id(self, entry_id):
        """Entry mit der gegebenen ID auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_by_key(entry_id)

    def get_entry_by_article(self, article):
        """Auslesen aller Entry Objekte anhand des Artikel-ID´s"""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_article(article)

    def get_unit_amount_by_entry(self, entry):
        """gegebenen Entry löschen."""
        with EntryMapper() as mapper:
            return mapper.find_unit_amount_by_entry(entry)

    def get_entry_by_retailer(self, retailer):
        """Entry mit übergebenem Retailer auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_retailer(retailer)

    def get_retailer_by_entry(self, entry):
        """Retailer mit übergebenem Entry auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_retailer_by_entry(entry)

    def get_entry_by_modification_date(self, modification_date):
        """Entry mit übergebenem Modification_Date auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_modification_date(modification_date)

    def get_entry_by_user(self, user_id):
        """Entry mit übergebenem User auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_user(user_id)

    def get_entry_by_shopping_list(self, shopping_list_id):
        """Entry mit übergebenem ShoppingList auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_shopping_list(shopping_list_id)

    def save_entry(self, entry):
        """Update eines Entry Objektes"""  # todo Richtig beschrieben?
        with EntryMapper() as mapper:
            mapper.update(entry)

    def get_entry_by_bought(self, bought):
        """Entry mit übergebenem Retailer auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_bought(bought)

    """
    RetailerGroup-spezifische Methoden
    """

    def create_retailer_group(self, ret_group, ret_group_member):
        """Eine Group anlegen."""
        retailer_group = RetailerGroup()
        retailer_group.set_retailer_group(ret_group)
        retailer_group.set_retailer_member(ret_group_member)

        with RetailerGroupMapper() as mapper:
            return mapper.insert(retailer_group)

    def get_retailer_by_group(self, retailer_group):
        with RetailerGroupMapper() as mapper:
            return mapper.find_retailer_by_group(retailer_group)

    def get_group_by_retailer(self, retailer_id):

        with RetailerGroupMapper() as mapper:
            return mapper.find_group_by_retailer(retailer_id)

    def delete_retailer_group(self, retailer_group, retailer_member):
        """gegebenen retailer der Gruppe löschen."""
        with RetailerGroupMapper() as mapper:
            mapper.delete2(retailer_group, retailer_member)

    """
    GroupMember-spezifische Methoden
    """

    def create_group_membership(self, user, group):
        """Eine Group anlegen."""
        group_membership = GroupMembership()
        group_membership.set_member(user)
        group_membership.set_group_membership(group)

        with GroupMembershipMapper() as mapper:
            return mapper.insert(group_membership)

    def get_member_by_group_membership(self, group_membership):
        with GroupMembershipMapper() as mapper:
            return mapper.find_user_by_group(group_membership)


    def delete_group_membership(self, group_member, member):

        with GroupMembershipMapper() as mapper:
            mapper.delete2(group_member, member)

    def get_group_membership_by_member(self, member):

        with GroupMembershipMapper() as mapper:
            return mapper.find_group_by_user(member)


    """
    Favorite-spezifische Methoden
    """

    def create_favorite(self, favorite_id, amount, article, unit):
        """Favorite Objekte erzeugen."""
        favorite = Favorite()
        favorite.set_amount(amount)
        favorite.set_unit(unit)
        favorite.set_article(article)
        favorite.set_id(favorite_id)  # todo so richtig?

    def get_all_favorits(self):
        """Alle Favorite Objekte auslesen."""
        with FavoriteMapper() as mapper:
            return mapper.find_all()

    def get_favorite_by_id(self, favorite_id):
        """Favorite Objekt mit übergebener favorit-id auslesen."""
        with FavoriteMapper() as mapper:
            return mapper.find_by_key(favorite_id)

    def delete_favorite_by_id(self, favorite_id):
        """gegebenes Favorite Objekt löschen."""

        with FavoriteMapper() as mapper:
            mapper.delete(favorite_id)

    def save_favorite(self, favorite):
        """Update eines Favorite Objektes."""
        with FavoriteMapper() as mapper:
            mapper.update(favorite)
