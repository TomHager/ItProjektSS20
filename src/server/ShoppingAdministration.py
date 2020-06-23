from .bo.Article import Article
from .bo.Entry import Entry
from .bo.Group import Group
from .bo.Retailer import Retailer
from .bo.RetailerEntryList import RetailerEntryList
from .bo.ShoppingList import ShoppingList
from .bo.User import User

from .db.ArticleMapper import ArticleMapper
from .db.EntryMapper import EntryMapper
from .db.GroupMapper import GroupMapper
from .db.RetailerEntryListMapper import RetailerEntryListMapper
from .db.RetailerMapper import RetailerMapper
from .db.ShoppingListMapper import ShoppingListMapper
from .db.UserMapper import UserMapper

class ShoppingAdministration (object):
#Todo nochmal durchgehen welche attribute wichtig sind für die methoden, vllt fehlt was
    def __init__(self):
        pass

    """ 
    User-spezifische Methoden
    """

    def create_user(self, name, email, google_user_id):
        """Einen Benutzer anlegen"""
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_user_id(google_user_id)
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

    #todo google_user_id ändern zu external_id, right?

    def get_user_by_google_user_id(self, id):
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
#todo Klären ob hier vorkommende Methoden essenziell bei Mappern sind ( vllt auch  main.py)
    def create_group(self, group_name):
        """Eine Group anlegen."""
        group = Group()
        group.set_group_name(group_name)
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

    #hier vllt bei Gruppe hinzufügen , aber diese methode steht in main.py bei gruppe, da dies eien Funktion der
    #der gruppenbedienoberfläche sein soll, du weißt ;) ( noch nach logik fehleher schauen/ abgleich mit den mappern)

    def get_user_by_group (self, group):
        """Group mit der gegebenen User auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_user(group)

    #todo vllt auch eine andere Methode wie folgt, damit ausgelsen wird welche gruppe welche user gehören:

    def get_groups_of_user(self, user):
        """Alle Groups des gegebenen Usser auslesen."""
        with GroupMapper() as mapper:
            return mapper.find_by_owner_id(user.get_id()) # Vorsicht: nicht geprüft!

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
                    self.delete_account(g)

            mapper.delete(group)


    """
    Retailer-spezifische Methoden
    """

    def create_retailer(self, retailer_name):
        """Einen Retailer anlegen."""
        retailer = Retailer()
        retailer.set_retailer_name(retailer_name)
        retailer.set_id(1)

        with RetailerMapper() as mapper:
            return mapper.insert(retailer)

    def get_retailer_by_name(self, retailer_name):
        """Alle Retailer mit übergebenem retailer-namen auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_by_retailer_name(retailer_name)

    def get_retailer_by_id(self, id):
        """Retailer mit der gegebenen ID auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_by_id(id)


    def get_retailer_by_group(self, group):
        """Retailer mit der gegebenen Group auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_by_group(group)

    def get_all_retailer(self):
        """Alle Kunden auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_all()

    def get_retailer_by_retailer_enry_list(self, retailer_entry_list):
        """Alle Kunden auslesen."""
        with RetailerMapper() as mapper:
            return mapper.find_retailer_by_retailer_entry_list(retailer_entry_list)

    def save_retailer(self, retailer):
        """gegebene Group speichern."""
        with RetailerMapper() as mapper:
            mapper.update(retailer)

#passt das hier mit .get_retailer_of_user ? Mapper schauen und mit anderen verständigen
    def delete_retailer(self, retailer):
        """gegebene Group löschen."""
        with RetailerMapper() as mapper:
            retailers = self.get_retailer_of_user(retailer)

            if not (retailers is None):
                for r in retailers:
                    self.delete_retailer(r)

            mapper.delete(retailer)



    """
    Article-spezifische Methoden
    """


   def get_all_articels(self):
     """Alle Artikel auslesen."""
        with ArticleMapper() as mapper:
           return mapper.find_all()


   def create_article(self, article_name):
     """Einen Article anlegen."""
       article = Article()
       article.set_article_name(article_name)
       article.set_id(1)


   def get_article_by_id(self, id):
      """Article mit der gegebenen ID auslesen."""


       with ArticleMapper() as mapper:
       return mapper.find_by_id(id)


   def delete_article_by_id(self, article):
     """gegebenen Artikel löschen."""
     with ArticleMapper() as mapper:
        article = self.get_article_by_id(article) #TODO Article oder Articels als variablen name? Und Put Methode fehlt

        if not (article is None):
            for a in article:
                self.delete_article(a)

        mapper.delete(article)


   def get_article_by_name(self, article_name):
      """Alle Article mit übergebenem article-namen auslesen."""

        with ArticleMapper() as mapper:
            return mapper.find_by_article_name(article_name)



   def get_article_by_standart_boolean(self, article): #todo Übergabe parameter korrekt?
     """Alle Article mit passendem Boolean"""

        with ArticleMapper() as mapper:
            return mapper.find_article_by_standard(article)#


   """
   ShoppingList-spezifische Methoden
   """
   def get_all_shopping_list(self):
     """Alle ShoppingLists auslesen."""
        with ShoppingListMapper() as mapper:
           return mapper.find_all()

#todo Gehört hier noch entry rein?
   def create_shopping_list(self, shopping_list_name):
     """Eine ShoppingList anlegen."""
       shoppinglist = ShoppingList()
       shoppinglist.set_shopping_list_name(shopping_list_name)
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
                self.delete_shopping_list(s)

        mapper.delete(shoppinglist)


   def get_shopping_list_by_name(self, shopping_list_name): #todo nicht fertig bzw iwas fehlt
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
        with EntryMMapper() as mapper:
           return mapper.find_all()


   def create_entry(self, entry): #todo entry besteht aus mehreren objekt attributen welcher übergabeparamter`?
     """Einen Article anlegen."""
       entry = Entry()
       entry.set_article_id(entry)
       entry.set_unit(entry)
       entry.set_amount(entry)
       entry.set_article_standard(entry)
       entry.set_modification_date(entry)
       entry.set_article_name(entry)
       entry.set_id(1)

     def delete_entry_by_id(self, entry_id):
     """gegebenen Entry löschen."""
     with EntryMapper() as mapper:
        entry = self.get_entry_by_id(entry_id)

        if not (entry is None):
            for e in entry:
                self.delete_entry(e)

        mapper.delete(entry)

     #todo put methode fehlt

   def get_entry_by_id(self, entry_id):
      """Entry mit der gegebenen ID auslesen."""


       with EntryMapper() as mapper:
       return mapper.find_by_key(entry_id)

   def get_entry_by_article(self, article_id):   #todo alle entrys oder nur einer?
      """Auslesen aller Eintrags-ID anhand des Artike"""


       with EntryMapper() as mapper:
       return mapper.find_entry_id_by_article(article_id)


   def get_amount_by_entry(self, entry):
     """gegebenen Artikel löschen."""
     with EntryMapper() as mapper:
        return  mapper.find_amount_by_entry(entry)


   def get_unit_by_entry(self, entry):
      """Alle Article mit übergebenem article-namen auslesen."""

        with EntryMapperr() as mapper:
            return mapper.find_unit_by_entry(entry)



   def get_entry_by_modification_date(self, modification_date): #todo Übergabe parameter korrekt?
     """Alle Article mit passendem Boolean"""

        with EntryMapper() as mapper:
            return mapper.find_entry_by_modification_date(modification_date)


   def get_entry_by_retailer_entry_list(self, retailer_entry_list):
      """Alle Article mit übergebenem article-namen auslesen."""

        with EntryMapperr() as mapper:
            return mapper.find_entry_by_retailer_entry_list(retailer_entry_list)





