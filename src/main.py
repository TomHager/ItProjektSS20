# Flask import da der Service darauf basiert
from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS
from datetime import datetime

# Zugriff auf BusinessObject Klassen und Applikationslogik
from server.ShoppingAdministration import ShoppingAdministration
from server.bo.User import User
from server.bo.Group import Group
from server.bo.Retailer import Retailer
from server.bo.RetailerEntryList import RetailerEntryList
from server.bo.Entry import Entry
from server.bo.ShoppingList import ShoppingList
from server.bo.Favorite import Favorite
from server.bo.RetailerGroup import RetailerGroup
from server.bo.GroupMembership import GroupMembership

# selbstgeschriebener Decorator, übernimmt Authentifikation

from SecurityDecorater import secured

"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""

app = Flask(__name__)

"""
Modell gebaut, welches die Datenstruktur beschreibt. Auf dieser Basis tauschen Cliets und Sever Daten aus.
"""

api = Api(app)

"""
Alle Ressourcen mit den mit dem Präfix /iKauf sind für Cors freigegeben.
"""

CORS(app, resources=r'/iKauf/*')

"""
Namespace anlegen, erlaubt Strukturierung von APIs, fasst alle iKauf relevanten Operationen unter dem Präfix
/iKauf zusammen
"""

ikauf = api.namespace('iKauf', description='Funktionen der App iKauf')

"""
Anlegen von transferierbaren Straukturen.
"""

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object')
})

"""Users, Groups, Retailers, RetailerEntrys, Entrys, Articles und ShoppingLists sind BusinessObjects..."""
user = api.inherit('User', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
    'external_id': fields.String(attribute='_external_id', description='Google User ID eines Benutzers')
})

group = api.inherit('Group', bo, {
    'name': fields.String(attribute='_name', description='Name einer Gruppe'),
})

retailer = api.inherit('retailer', bo, {
    'name': fields.String(attribute='_name', description='Name eines Verkäufers'),
})

entry = api.inherit('Entry', bo, {
    'unit': fields.String(attribute='_unit', discription='Name der Einheit'),
    'amount': fields.Integer(attribute='_amount', discription='Menge eines Artikel'),
    'article': fields.String(attribute='_article', discription='Name eines Artikel'),
    'modification_date': fields.String(attribute='_modification_date', discription='Änderungsdatum der Entry'),
    'user_id': fields.Integer(attribut='_user_id', description='Name eines Benutzers'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Name eines Verkäufers'),
    'shopping_list_id': fields.Integer(attribute='_shopping_list_id', description='ID einer Shopping List'),
    'group_id': fields.Integer(attribute='_group_id', description='Gruppen ID einer Shopping List'),
    'bought': fields.Integer(attribute='_bought', discription='Prüft ob der Artikel gekauft wurde'),
})

shopping_list = api.inherit('ShoppingList', bo, {
    'name': fields.String(attribute='_name', discription='Name einer Shoppingliste'),
    'group_id': fields.Integer(attribute='_group_id', discription='ID einer Gruppe')
})

article = api.inherit('Article', bo, {
    'name': fields.String(attribute='_name', description='Name eines Artikels'),
    'standart_boolean': fields.Boolean(attribute='_standart_boolean', description='Prüfung auf Standartikel'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='ID eines Verkäufers')
})

favorite = api.inherit('Favorite', bo, {
    'unit': fields.String(attribute='_unit', description='Einheit eines Artikels'),
    'amount': fields.Integer(attribute='_amount', description='Menge eines Artikels'),
    'article': fields.String(attribute='_article', description='ID eines Artikels'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='ID eines Retailers'),
    'group_id': fields.Integer(attribute='_group_id', description='ID einer Gruppe')
})

retailer_groups = api.inherit('RetailerGroup', bo, {
    'retailer_member': fields.Integer(attribute='_retailer_member', description='Retailer ID'),
    'retailer_group': fields.Integer(attribute='_retailer_group',
                                     description='Retailer Gruppee'),
})
group_member = api.inherit('GroupMember', bo, {
    'member': fields.Integer(attribute='_member', description='User ID'),
    'group_membership': fields.Integer(attribute='_group_membership',
                                       description='Gruppen ID'),
})\


"""
Klassen und Operationen für User
"""


@ikauf.route('/user')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserListOperations(Resource):
    @ikauf.marshal_list_with(user)
    # @secured
    def get(self):
        """Auslesen aller User-Objekte"""

        adm = ShoppingAdministration()
        user = adm.get_all_users()
        return user

    def post(self):
        """Anlegen eines neuen User-Objekts"""

        adm = ShoppingAdministration()

        proposal = User.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_user(
                proposal.get_name(), proposal.get_email(), proposal.get_external_id())
            return x, 200
        else:
            return '', 500


@ikauf.route('/users/<int:id>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @ikauf.marshal_with(user)
    # @secured
    def get(self, id):
        """Auslesen eines bestimmten User-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ShoppingAdministration()
        cust = adm.get_user_by_id(id)
        return cust

    # @secured
    def delete(self, id):
        """Löschen eines bestimmten User-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ShoppingAdministration()
        cust = adm.get_user_by_id(id)
        adm.delete_user(cust)
        return '', 200

    @ikauf.marshal_with(user)
    @ikauf.expect(user, validate=True)
    def put(self, id):
        """Update eines bestimmten User-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ShoppingAdministration()
        c = User.from_dict(api.payload)

        if c is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            c.set_id(id)
            adm.save_user(c)
            return adm.save_user, 200
        else:
            return '', 500


@ikauf.route('/user-by-name/<string:name>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('name', 'Der Name des Kunden')
class UserByNameOperations(Resource):
    @ikauf.marshal_with(user)
    # @secured
    def get(self, name):
        """ Auslesen von User-Objekten, die durch den Namen bestimmt werden.

        Die auszulesenden Objekte werden durch ```name``` in dem URI bestimmt.
        """
        adm = ShoppingAdministration()
        cust = adm.get_user_by_name(name)
        return cust


@ikauf.route('/user-by-email/<string:email>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('email', 'Die Email des User')
class UserByEmailOperations(Resource):
    @ikauf.marshal_with(user)
    def get(self, email):
        """ Auslesen von User-Objekten, die durch die E-Mail bestimmt werden.

        Die auszulesenden Objekte werden durch ```email``` in dem URI bestimmt.
        """
        adm = ShoppingAdministration()
        cust = adm.get_user_by_email(email)
        return cust


@ikauf.route('/user-by-external_id/<string:id>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('id', 'Die External ID des User')
class UserByExternalIdOperations(Resource):
    @ikauf.marshal_with(user)
    # @secured
    def get(self, id):
        """ Auslesen von User-Objekten, die durch die E-Mail bestimmt werden.

        Die auszulesenden Objekte werden durch ```email``` in dem URI bestimmt.
        """
        adm = ShoppingAdministration()
        cust = adm.get_user_by_external_id(id)
        return cust


"""
Klassen und Operationen zu Gruppen
"""


@ikauf.route('/group')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GroupListOperations(Resource):
    @ikauf.marshal_list_with(group)
    # @secured
    def get(self):
        """Auslesen aller Gruppen-Objekte"""

        adm = ShoppingAdministration()
        group = adm.get_all_groups()
        return group

    def post(self):
        """Anlegen eines neuen Gruppen-Objekts"""

        adm = ShoppingAdministration()

        proposal = Group.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_group(proposal.get_name())
            return x, 200
        else:
            return '', 500


@ikauf.route('/group/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Id des Gruppen-Objekts')
class GroupOperations(Resource):
    @ikauf.marshal_with(group)
    # @secured
    def get(self, id):
        """Auslesen eines bestimmten Gruppen-Objekts"""

        adm = ShoppingAdministration()
        g = adm.get_group_by_id(id)
        return g

    def delete(self, id):
        """Löschen eines bestimmten Gruppen-Objekts"""

        adm = ShoppingAdministration()
        g = adm.get_group_by_id(id)
        adm.delete_group(g)
        return '', 200

    @ikauf.marshal_with(group)
    @ikauf.expect(group, validate=True)
    def put(self, id):
        """Update eines bestimmten Gruppen-Objekts."""

        adm = ShoppingAdministration()
        g = Group.from_dict(api.payload)

        if g is not None:
            g.set_id(id)
            adm.save_group(g)
            return '', 200
        else:
            return '', 500


@ikauf.route('/group-by-name/<string:name>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('name', 'Der Name der Gruppe')
class GroupRelatedByNameOperations(Resource):
    @ikauf.marshal_with(group)
    def get(self, name):
        """ Auslesen von User-Objekten, die durch den Namen bestimmt werden.

        Die auszulesenden Objekte werden durch ```name``` in dem URI bestimmt.
        """
        adm = ShoppingAdministration()
        cust = adm.get_group_by_name(name)
        return cust


"""
Klassen und Operationen zu Retailer
"""


@ikauf.route('/retailers')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerListOperations(Resource):
    @ikauf.marshal_list_with(retailer)
    # @secured
    def get(self):
        """Auslesen aller Retailer-Objekte"""

        adm = ShoppingAdministration()
        r = adm.get_all_retailer()
        return r

    # @secured
    def post(self):
        """Anlegen eines neuen Retailer-Objekts für einen gegebene Group"""

        adm = ShoppingAdministration()

        r = Retailer.from_dict(api.payload)

        if r is not None:
            x = adm.create_retailer(r.get_name())
            return x, 200
        else:
            return 'Group unknown', 500


@ikauf.route('/retailers/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Id des Retailer-Objekts')
class RetailerOperations(Resource):
    @ikauf.marshal_with(retailer)
    # @secured
    def get(self, id):
        """Auslesen eines bestimmten Retailer-Objekts"""

        adm = ShoppingAdministration()
        r = adm.get_retailer_by_id(id)
        return r

    # @secured
    def delete(self, id):
        """Löschen eines bestimmten Retailer-Objekts"""

        adm = ShoppingAdministration()
        r = adm.get_retailer_by_id(id)
        adm.delete_retailer(r)
        return '', 200

    @ikauf.marshal_with(retailer)
    @ikauf.expect(retailer, validate=True)
    # @secured
    def put(self, id):
        """Update eines bestimmten Retailer-Objekts."""

        adm = ShoppingAdministration()
        r = Retailer.from_dict(api.payload)

        if r is not None:
            r.set_id(id)
            adm.save_retailer(r)
            return '', 200
        else:
            return '', 500


@ikauf.route('/retailer-by-name/<string:name>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('name', 'Name eines Retailer-Objekts')
class RetailerRelatedByNameOperations(Resource):
    @ikauf.marshal_with(retailer)
    # @secured
    def get(self, name):
        """Auslesen eines bestimmten Retailer-Objekt nach Name"""

        adm = ShoppingAdministration()
        r = adm.get_retailer_by_name(name)
        return r


"""
Klassen und Operationen für Entry
"""


@ikauf.route('/entry')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class EntryListOperations(Resource):
    @ikauf.marshal_list_with(entry)
    # @secured
    def get(self):
        """Auslesen aller Entry-Objekte"""

        adm = ShoppingAdministration()
        e = adm.get_all_entrys()
        return e

    # @secured
    def post(self):
        """Anlegen eines neuen Entry-Objekts"""

        adm = ShoppingAdministration()

        proposal = Entry.from_dict(api.payload)

        if proposal is not None:
            # todo überlgen ob : prosposal.get_entry_list() sinn macht
            x = adm.create_entry(proposal.get_unit(), proposal.get_amount(), proposal.get_article(),
                                 proposal.get_modification_date(), proposal.get_user_id(), proposal.get_retailer_id(),
                                 proposal.get_shopping_list_id(), proposal.get_bought())
            return x, 200
        else:
            return '', 500


@ikauf.route('/entry-by-id/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des Entry-Objekts')
class EntryOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, id):
        """Auslesen eines bestimmten Entry-Objekts"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_id(id)
        return e

    # @secured
    def delete(self, id):
        """Läschen eines bestimmten Entry-Objekts"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_id(id)
        adm.delete_entry_by_id(e)
        return '', 200

    @ikauf.marshal_with(entry)
    @ikauf.expect(entry, validate=True)
    # @secured
    def put(self, id):
        """Update eines bestimmten Entry-Objekts."""

        adm = ShoppingAdministration()
        e = Entry.from_dict(api.payload)

        if e is not None:
            e.set_id(id)
            adm.save_entry(e)
            return '', 200
        else:
            return '', 500


@ikauf.route('/entry-by-article/<string:article>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('article', 'Artikel des zugehörigen Entry-Objekts')
class EntryRelatedByArticleOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, article):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_article(article)
        return e


@ikauf.route('/entry-by-retailer/<int:retailer_id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer_id', 'Retailer des zugehörigen Entry-Objekts')
class EntryRelatedByRetailerOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, retailer_id):
        """Auslesen eines bestimmten Entry-Objekts nach Retailer"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_retailer(retailer_id)
        return e


@ikauf.route('/entry-by-user/<int:user_id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('user_id', 'User des zugehörigen Entry-Objekte')
class EntryRelatedByUserOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, user_id):
        """Auslesen eines bestimmten Entry-Objekts nach User"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_user(user_id)
        return e


@ikauf.route('/entry-by-shopping-list/<int:shopping_list_id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('shopping_list_id', 'ShoppingList des zugehörigen Entry-Objekts')
class EntryRelatedByShoppingListOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, shopping_list_id):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_shopping_list(shopping_list_id)
        return e


@ikauf.route('/entry-by-shopping-list/<int:shopping_list_id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('shopping_list_id', 'ShoppingList des zugehörigen Entry-Objekts')
class EntryRelatedByShoppingListOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, shopping_list_id):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_shopping_list(shopping_list_id)
        return e


@ikauf.route('/entry-by-group/<int:group_id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('group_id', 'Gruppe des zugehörigen Entry-Objekts')
class EntryRelatedByShoppingListOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, group_id):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_group(group_id)
        return e


@ikauf.route('/entry-by-shopping-list-and-retailer/<int:shopping_list_id><int:retailer_id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('shopping_list_id', 'ShoppingList des zugehörigen Entry-Objekts')
@ikauf.param('retailer_id', 'Retailer des zugehörigen Entry-Objekts')
class EntryRelatedByShoppingListOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, shopping_list_id, retailer_id):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_shopping_list_and_retailer_id(
            shopping_list_id, retailer_id)
        return e


@ikauf.route('/entry-by-bought')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('bought', 'ShoppingList des zugehörigen Entry-Objekts')
class EntryRelatedByBoughtOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, bought):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_bought(bought)
        return e


@ikauf.route('/user-by-entry/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Group ID des zugehörigen ShoppingList-Objekts')
class UserRelatedByEntryIdOperations(Resource):
    @ikauf.marshal_with(entry)
    def get(self, id):
        """Auslesen eines bestimmten ShoppingList-Objekts nach Group ID"""

        adm = ShoppingAdministration()
        sl = adm.get_user_by_entry_id(id)
        return sl


@ikauf.route('/report-data/<int:group_id><string:modification_date_from><string:modification_date_to>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('group_id', 'Gruppe des zugehörigen Entry-Objekts')
@ikauf.param('modification_date_from', 'Anfangsdatum des zugehörigen Entry-Objekts')
@ikauf.param('modification_date_to', 'Enddatum des zugehörigen Entry-Objekts')
class EntryRelatedByArticleOperations(Resource):
    @ikauf.marshal_with(entry)
    # @secured
    def get(self, group_id, modification_date_from, modification_date_to):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_report_data(
            group_id, modification_date_from, modification_date_to)
        return e


# @ikauf.route('/entry-by-modification-date/<date:date>')
# @ikauf.route('/entry-by-modification-date/<datetime:modification_date>')
# @ikauf.response(500, 'Falls Server-seitiger Fehler')
# @ikauf.param('modification_date', 'ModificationDate des zugehörigen Entry-Objekts')
# class EntryRelatedByModificationDateOperations(Resource):
#     @ikauf.marshal_with(entry)
#     #@secured
#     def get(self, modification_date):
#         """Auslesen eines bestimmten Entry-Objekts nach Article"""


"""
Klassen und Operationen für ShoppingList
"""


@ikauf.route('/shopping-list')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class ShoppingListListOperations(Resource):
    @ikauf.marshal_list_with(shopping_list)
    # @secured
    def get(self):
        """Auslesen aller ShoppingList-Objekte"""

        adm = ShoppingAdministration()
        sl = adm.get_all_shopping_list()
        return sl

    # @secured
    def post(self):
        """Anlegen eines neuen ShoppingList-Objekts"""

        adm = ShoppingAdministration()

        proposal = ShoppingList.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_shopping_list(
                proposal.get_name(), proposal.get_group_id())

            return x, 200
        else:
            return '', 500


@ikauf.route('/shopping-list-by-id/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des ShoppingList-Objekts')
class ShoppingListOperations(Resource):
    @ikauf.marshal_with(shopping_list)
    # @secured
    def get(self, id):
        """Auslesen eines bestimmten ShoppingList-Objekts"""

        adm = ShoppingAdministration()
        sl = adm.get_shopping_list_by_id(id)
        return sl

    # @secured
    def delete(self, id):
        """Löschen eines bestimmten ShoppingList-Objekts"""

        adm = ShoppingAdministration()
        sl = adm.get_shopping_list_by_id(id)
        adm.delete_shopping_list_by_id(sl)
        return '', 200

    @ikauf.marshal_with(shopping_list)
    @ikauf.expect(shopping_list, validate=True)
    # @secured
    def put(self, id):
        """Update eines bestimmten ShoppingList-Objekts."""

        adm = ShoppingAdministration()
        sl = ShoppingList.from_dict(api.payload)

        if sl is not None:
            sl.set_id(id)
            adm.save_shopping_list(sl)
            return '', 200
        else:
            return '', 500


"""ShoppingListRealatedByIdOperations wird weggelassen, da das holen der shoppinglist bereits über
ShoppingListOperations realisiert wird. Deshalbt hat ShoppingListRealatedByIdOperations  keine
daseinberechtigung"""


@ikauf.route('/shopping-list-by-name/<string:name>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('name', 'Name des zugehörigen ShoppingList-Objekts')
class ShoppingListRelatedByNameOperations(Resource):
    @ikauf.marshal_with(shopping_list)
    # @secured
    def get(self, name):
        """Auslesen eines bestimmten ShoppingList-Objekts nach Name"""

        adm = ShoppingAdministration()
        sl = adm.get_shopping_list_by_name(name)
        return sl


@ikauf.route('/shopping-list-by-group-id/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Group ID des zugehörigen ShoppingList-Objekts')
class ShoppingListRelatedByGroupIdOperations(Resource):
    @ikauf.marshal_with(shopping_list)
    # @secured
    def get(self, id):
        """Auslesen eines bestimmten ShoppingList-Objekts nach Group ID"""

        adm = ShoppingAdministration()
        sl = adm.get_shopping_list_by_group_id(id)
        return sl


"""
Klassen und Operationen für RetailerGroup
"""


@ikauf.route('/retailer-group-delete/<int:retailer_group><int:retailer_member>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer_group', 'ID des RetailerGroup-Objetks')
@ikauf.param('retailer_member', 'ID des RetailerMember-Objekts')
class DeleteRetailerGroupOperations(Resource):
    @ikauf.marshal_with(retailer_groups)
    # @secured
    def delete(self, retailer_group, retailer_member):
        """Löschen eines bestimmten ShoppingList-Objekts"""

        adm = ShoppingAdministration()
        adm.delete_retailer_group(retailer_group, retailer_member)
        return '', 200


@ikauf.route('/retailer-by-group')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerGroupListOperations(Resource):
    # @secured
    def post(self):
        """Anlegen eines neuen Retailer-Objekts für einen gegebene Group"""

        adm = ShoppingAdministration()

        proposal = RetailerGroup.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_retailer_group(
                proposal.get_retailer_group(), proposal.get_retailer_member())
        else:
            return 'RetailerGroup unknown',


@ikauf.route('/retailer-member-by-group/<int:retailer_group>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer_group', 'RetailerGroup-Objekt des zugehörigen RetailerMembers-Objekts')
class RetailerGroupRelatedByGroupOperations(Resource):
    @ikauf.marshal_with(retailer_groups)
    # @secured
    def get(self, retailer_group):
        """Auslesen eines bestimmten Retailer-Objekts nach Gruppe"""

        adm = ShoppingAdministration()
        r = adm.get_retailer_by_group(retailer_group)
        return r


@ikauf.route('/retailer-group-by-retailer/<int:retailer_member>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer_member', 'Gruppen-Objekt des zugehörigen RetailerEntryList-Objekts')
class RetailerGroupRelatedByRetailerOperations(Resource):
    @ikauf.marshal_with(retailer_groups)
    # @secured
    def get(self, retailer_member):
        """Auslesen eines bestimmten Retailer Member-Objekts nach Retailer"""

        adm = ShoppingAdministration()
        r = adm.get_group_by_retailer(retailer_member)
        return r


"""
Klassen und Operationen für GroupMembership
"""


@ikauf.route('/group-membership-delete/<int:group_membership><int:member>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('group_membership', 'ID des Membership-Objetks')
@ikauf.param('member', 'ID des Member-Objekts')
class DeleteGroupMembershipOperations(Resource):
    @ikauf.marshal_with(group_member)
    # @secured
    def delete(self, group_membership, member):
        """Löschen eines bestimmten Group-Membership-Objekts"""

        adm = ShoppingAdministration()
        adm.delete_group_membership(group_membership, member)
        return '', 200


@ikauf.route('/create-group-membership')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class GroupMembershipListOperations(Resource):
    def post(self):
        """Anlegen eines neuen Group-Membership-Objekts für einen gegebene Group"""

        adm = ShoppingAdministration()

        proposal = GroupMembership.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_group_membership(
                proposal.get_member(), proposal.get_group_membership())
            return x, 200
        else:
            return 'GroupMembership unknown',


@ikauf.route('/groupmembership-by-member/<int:member>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('member', 'Member-Obkjekt des zugehörigen Gruppmembership-Objekts')
class GroupMembershipRelatedByMemberOperations(Resource):
    # @secured
    @ikauf.marshal_with(group_member)
    def get(self, member):
        """Auslesen eines bestimmten Retailer-Objekts nach Gruppe"""

        adm = ShoppingAdministration()
        gms = adm.get_group_membership_by_member(member)
        return gms


@ikauf.route('/member-by-groupmembership/<int:group_membership>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('group_membership', 'Gruppmembership-Obkjekt des zugehörigen Member-Objekts')
class MemberRelatedByGroupMembershipOperations(Resource):
    # @secured
    @ikauf.marshal_with(group_member)
    def get(self, group_membership):
        """Auslesen eines bestimmten Retailer Member-Objekts nach Retailer"""

        adm = ShoppingAdministration()
        mem = adm.get_member_by_group_membership(group_membership)
        return mem


"""
Klassen und Operationen für Favorite
"""


@ikauf.route('favorite-by-id/<int:favoriteId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des Favorite-Objektes')
class FavoriteByGroupOperations(Resource):
    @ikauf.marshal_with(favorite)
    def get(self, group_id):
        """Auslesen eines bestimmten Favorite-Objekts"""

        adm = ShoppingAdministration()
        a = adm.get_favorite_by_group(group_id)
        return a


@ikauf.route('/favorite')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class FavoriteListOperations(Resource):
    @ikauf.marshal_list_with(favorite)
    # @secured
    def get(self):
        """Auslesen aller Favorite-Objekte"""

        adm = ShoppingAdministration()
        a = adm.get_all_favorits()
        return a

    def post(self):
        """Anlegen eines neuen Favorite-Objekts"""

        adm = ShoppingAdministration()

        proposal = Favorite.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_favorite(proposal.get_unit(), proposal.get_amount(), proposal.get_article(),
                                    proposal.get_retailer_id(), proposal.get_group_id())
            return x, 200
        else:
            return '', 500


@ikauf.route('/favorite-by-id/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des Favorite-Objektes')
class FavoriteOperations(Resource):
    @ikauf.marshal_with(favorite)
    # @secured
    def get(self, id):
        """Auslesen eines bestimmten Favorite-Objekts"""

        adm = ShoppingAdministration()
        a = adm.get_favorite_by_id(id)
        return a

    # @secured
    def delete(self, id):
        """Löschen eines bestimmten Favorite-Objekts"""

        adm = ShoppingAdministration()
        a = adm.get_favorite_by_id(id)
        adm.delete_favorite_by_id(a)
        return '', 200

    @ikauf.marshal_with(favorite)
    @ikauf.expect(favorite, validate=True)
    # @secured
    def put(self, id):
        """Update eines bestimmten Favorite-Objekts."""

        adm = ShoppingAdministration()
        a = Favorite.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.save_favorite(a)
            return '', 200
        else:
            return '', 500


@ikauf.route('/favorite-by-group/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Group ID des zugehörigen ShoppingList-Objekts')
class FavoriteRelatedByGroupId(Resource):
    @ikauf.marshal_with(favorite)
    # @secured
    def get(self, id):
        """Auslesen eines bestimmten Favorite-Objekts nach Group ID"""

        adm = ShoppingAdministration()
        sl = adm.get_favorite_by_group(id)
        return sl


"""
Start der main.py um zu testen ob es funktioniert (in der lokalen Entwicklerumgebung).
Um dies zu testen muss, wie in der VL eine Db in Python vorliegen.
"""

if __name__ == '__main__':
    app.run(debug=True)

# if __name__ == '__main__':
#     adm = ShoppingAdministration()
#     x = adm.create_shopping_list("Abschlussparty", 1)
#     print(x)
