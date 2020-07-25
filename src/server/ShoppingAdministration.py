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

    def __init__(self):
        pass

    """ 
    User-spezifische Methoden
    """

    def create_user(self, name, email, external_id):
        """Ein User Objekt anlegen."""
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_external_id(external_id)
        user.set_id(1)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_name(self, name):
        """Alle Benutzer mit Namen auslesen."""
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
        """Den gegebenen Benutzer updaten."""
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
        """Ein Group Objekt anlegen."""
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
        """Group mit dem gegebenen User auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_by_user(user)

    def get_user_by_group(self, group):
        """User mit der gegebenen Group auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_user(group)

    def get_groups_of_user(self, user):
        """Alle Groups des gegebenen User auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_by_key(user.get_id())

    def get_all_groups(self):
        """Alle Gruppen Objekte auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_all()

    def save_group(self, group):
        """gegebene Group updaten."""
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
        """Ein Retailer Objekt anlegen."""
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
        """gegebenen Retailer updaten."""
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

    def create_shopping_list(self, name, groups_id):
        """Ein ShoppingList Objekt anlegen."""
        shoppinglist = ShoppingList()
        shoppinglist.set_name(name)
        shoppinglist.set_group_id(groups_id)
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

    def get_shopping_list_by_name(self, shopping_list_name):
        """ShoppingList mit übergebenem shopping-list-name auslesen."""

        with ShoppingListMapper() as mapper:
            return mapper.find_shopping_list_by_name(shopping_list_name)

    def get_shopping_list_by_group_id(self, group):
        """ShoppingList mit der gegebenen Group-Id auslesen."""
        with ShoppingListMapper() as mapper:
            return mapper.find_shopping_list_by_group(group)

    def save_shopping_list(self, shopping_list):
        """Update eines Shoppinglist Objektes"""
        with ShoppingListMapper() as mapper:
            mapper.update(shopping_list)

    """
    Entry-spezifische Methoden
    """

    def get_all_entrys(self):
        """Alle Entry Objekte auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_all()

    def create_entry(self, unit, amount, article, modification_date, user_id, retailer_id, shopping_list_id, group_id, bought):
        """Ein Entry Objekt anlegen."""
        entry = Entry()
        entry.set_unit(unit)
        entry.set_amount(amount)
        entry.set_article(article)
        entry.set_modification_date(modification_date)
        entry.set_user_id(user_id)
        entry.set_retailer_id(retailer_id)
        entry.set_shopping_list_id(shopping_list_id)
        entry.set_group_id(group_id)
        entry.set_bought(bought)
        entry.set_id(1)
        with EntryMapper() as mapper:
            return mapper.insert(entry)

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

    def get_unit_amount_by_entry(self, entry):  # todo Braucht man des=?
        """Auslesen aller Messei Objekte anhand des Artikel-ID´s"""
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

    def get_entry_by_group(self, group_id):
        """Entry mit übergebenem ShoppingList auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_group(group_id)

    def get_entry_by_shopping_list_and_retailer_id(self, shopping_list_id, retailer_id):
        """Entry mit übergebener ShoppingList-Id und Retailer-Id auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_entry_by_shopping_list_and_retailer_id(shopping_list_id, retailer_id)

    def save_entry(self, entry):
        """Update eines Entry Objektes"""
        with EntryMapper() as mapper:
            mapper.update(entry)

    def get_entry_by_bought(self, bought):
        """Entry mit übergebenem Bought-Boolean auslesen."""  # todo richtig beschrieben bought id oder boolean?
        with EntryMapper() as mapper:
            return mapper.find_entry_by_bought(bought)

    def get_report_data(self, groups_id, modification_date_from, modification_date_to):
        """Entries für eine gegebene Gruppe innerhalb eines bestimmten Zeitraumes auslesen."""
        with EntryMapper() as mapper:
            return mapper.get_report_data(groups_id, modification_date_from, modification_date_to)

    def get_user_by_entry_id(self, number):
        """Den Benutzer mit der gegebenen Entry-ID auslesen."""
        with EntryMapper() as mapper:
            return mapper.find_user_by_entry_id(number)

    """
    RetailerGroup-spezifische Methoden
    """

    def create_retailer_group(self, ret_group, ret_group_member):
        """Ein RetailerGroup Objekt anlegen."""
        retailer_group = RetailerGroup()
        retailer_group.set_retailer_group(ret_group)
        retailer_group.set_retailer_member(ret_group_member)

        with RetailerGroupMapper() as mapper:
            return mapper.insert(retailer_group)

    def get_retailer_by_group(self, retailer_group):
        """Alle Retailer einer Gruppe auslesen."""
        with RetailerGroupMapper() as mapper:
            return mapper.find_retailer_by_group(retailer_group)

    def get_group_by_retailer(self, retailer_id):
        """Alle Gruppe in der ein Retailer enthalen ist auslesen."""
        with RetailerGroupMapper() as mapper:
            return mapper.find_group_by_retailer(retailer_id)

    def delete_retailer_group(self, retailer_group, retailer_member):
        """Gegebenen Retailer der Gruppe löschen."""
        with RetailerGroupMapper() as mapper:
            mapper.delete2(retailer_group, retailer_member)

    """
    GroupMember-spezifische Methoden
    """

    def create_group_membership(self, user, group):
        """Eine Group-Objekt anlegen."""
        group_membership = GroupMembership()
        group_membership.set_member(user)
        group_membership.set_group_membership(group)

        with GroupMembershipMapper() as mapper:
            return mapper.insert(group_membership)

    def get_member_by_group_membership(self, group_membership):
        """Ein User aus einer gegebenen Gruppe auslesen."""
        with GroupMembershipMapper() as mapper:
            return mapper.find_user_by_group(group_membership)

    def get_group_membership_by_member(self, member):
        """Alle Gruppen eines Users auslesen."""
        with GroupMembershipMapper() as mapper:
            return mapper.find_group_by_user(member)

    def delete_group_membership(self, group_member, member):
        """Gebenen User aus einer Gruppe löschen."""
        with GroupMembershipMapper() as mapper:
            mapper.delete2(group_member, member)

    """
    Favorite-spezifische Methoden
    """

    def create_favorite(self, unit, amount, article, retailer_id, group_id):
        """Favorite Objekt erzeugen."""
        favorite = Favorite()
        favorite.set_unit(unit)
        favorite.set_amount(amount)
        favorite.set_article(article)
        favorite.set_retailer_id(retailer_id)
        favorite.set_group_id(group_id)
        favorite.set_id(1)

        with FavoriteMapper() as mapper:
            return mapper.insert(favorite)

    def get_all_favorits(self):
        """Alle Favorite Objekte auslesen."""
        with FavoriteMapper() as mapper:
            return mapper.find_all()

    def get_favorite_by_id(self, favorite_id):
        """Favorite Objekt mit übergebener favorit-id auslesen."""
        with FavoriteMapper() as mapper:
            return mapper.find_by_key(favorite_id)

    def get_favorite_by_group(self, group_id):
        """Favorite Objekt mit übergebener GruppenId auslesen."""
        with FavoriteMapper() as mapper:
            return mapper.find_favorite_by_group(group_id)

    def delete_favorite_by_id(self, favorite_id):
        """gegebenes Favorite Objekt löschen."""

        with FavoriteMapper() as mapper:
            mapper.delete(favorite_id)

    def save_favorite(self, favorite):
        """Update eines Favorite Objektes."""
        with FavoriteMapper() as mapper:
            mapper.update(favorite)
