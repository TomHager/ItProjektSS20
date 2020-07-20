# Flask import da der Service darauf basiert
from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS

# Zugriff auf BusinessObject Klassen und Applikationslogik
from server.ShoppingAdministration import ShoppingListAdministration
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
    'external_user_id': fields.String(attribute='_external_user_id', description='Google User ID eines Benutzers')
})

group = api.inherit('Group', bo, {
    'group_name': fields.String(attribute='_name', description='Name einer Gruppe'),
})

retailer = api.inherit('retailer', bo, {
    'retailer_name': fields.String(attribute='_name', description='Name eines Verkäufers'),
    'group_id': fields.Integer(attribute='_id', description='ID einer Gruppe')
})

retailer_entry_list = api.inherit('RetailerEntryList', bo, {
  'retailer': fields.String(attribute='_retailer', description='Name eines Verkäufers'),
  'user': fields.String(attribut='_user', description='Name eines Benutzers'),
  'shopping_list_id': fields.Integer(attribute='_shopping_list_id', description='ID einer Shopping List')
})

entry = api.inherit('Entry', bo, {
  'article': fields.String(attribute='_article', discription='Name eines Artikel'),
  'unit': fields.String(attribute='_unit', discription='Name der Einheit'),
  'amount': fields.Integer(attribute='_amount', discription='Menge eines Artikel'),
  'modification_date': fields.Date(attribute='_modification_date', discription='Änderungsdatum der Entry'),
  'retailer_entry_list_id': fields.Integer(attrubute='_retailer_entry_list_id', discription='ID der RetailerEntryList')
})

shopping_list = api.inherit('ShoppingList', bo, {
  'shopping_list_name': fields.String(attribute='_shopping_list_name', discription='Name einer Shoppingliste'),
  'group_id': fields.Integer(attribute='_group_id', discription='ID einer Gruppe')
})

article = api.inherit('Article', bo, {
    'name': fields.String(attribute='_name', description='Name eines Artikels'),
    'standart_boolean': fields.Boolean(attribute='_standart_boolean', description='Prüfung auf Standartikel'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='ID eines Verkäufers')
})

favorite = api.inherit('Favorite', bo, {
    'unit': fields.Integer(attribute='_unit', description='Einheit eines Artikels'),
    'amount': fields.Integer(attribute='_amount', description='Menge eines Artikels'),
    'article': fields.Integer(attribute='article', description='ID eines Artikels')
})

retailer_group = api.inherit('RetailerGroup', bo, {
    'retailer_member': fields.Integer(attribute='_retailer_member', description='Retailer ID'),
    'retailer_group': fields.Integer(attribute='_retailer_group',
                                     description='Retailer Gruppee'),
})
group_member = api.inherit('GroupMember', bo, {
    'member': fields.Integer(attribute='_member', description='User ID'),
    'membership': fields.Integer(attribute='_membership',
                                 description='Gruppen ID'),
})\


"""
Klassen und Operationen für User
"""


@ikauf.route('/user/<int:id>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @ikauf.marshal_with(user)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten User-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_user_by_id(id)
        return cust

    @secured
    def delete(self, id):
        """Löschen eines bestimmten User-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_user_by_id(id)
        adm.delete_user(cust)
        return '', 200

    @ikauf.marshal_with(user)
    @ikauf.expect(user, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten User-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ShoppingListAdministration()
        c = user.from_dict(api.payload)

        if c is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            c.set_id(id)
            adm.save_user(c)
            return '', 200
        else:
            return '', 500


@ikauf.route('/user-by-name/<string:name>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('name', 'Der Name des Kunden')
class UserByNameOperations(Resource):
    @ikauf.marshal_with(user)
    @secured
    def get(self, name):
        """ Auslesen von User-Objekten, die durch den Namen bestimmt werden.

        Die auszulesenden Objekte werden durch ```name``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_user_by_name(name)
        return cust


@ikauf.route('/user-by-email/<string:email>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('email', 'Die Email des User')
class UserByEmailOperations(Resource):
    @ikauf.marshal_with(user)
    @secured
    def get(self, email):
        """ Auslesen von User-Objekten, die durch die E-Mail bestimmt werden.

        Die auszulesenden Objekte werden durch ```email``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_user_by_email(email)
        return cust


@ikauf.route('/user')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserListOperations(Resource):
    @ikauf.marshal_list_with(user)
    @secured
    def get(self):
        """Auslesen aller User-Objekte"""

        adm = ShoppingListAdministration()
        user = adm.get_all_users()
        return user

    def post(self):
        """Anlegen eines neuen User-Objekts"""

        adm = ShoppingListAdministration()

        proposal = user.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_user(proposal.get_name(), proposal.get_email(), proposal.get_external_id())
            return x, 200
        else:
            return '', 500


"""
Klassen und Operationen zu Gruppen
"""


@ikauf.route('/group')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GroupListOperations(Resource):
    @ikauf.marshal_list_with(group)

    def get(self):
        """Auslesen aller Gruppen-Objekte"""

        adm = ShoppingListAdministration()
        group = adm.get_all_groups()
        return group

    def post(self):
        """Anlegen eines neuen Gruppen-Objekts"""

        adm = ShoppingListAdministration()

        proposal = group.from_dict(api.payload)

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
    def get(self, id):
        """Auslesen eines bestimmten Gruppen-Objekts"""

        adm = ShoppingListAdministration()
        g = adm.get_group_by_id(id)
        return g

    def delete(self, id):
        """Löschen eines bestimmten Gruppen-Objekts"""

        adm = ShoppingListAdministration()
        g = adm.get_group_by_id(id)
        adm.delete_group(g)
        return '', 200

    @ikauf.marshal_with(group)
    @ikauf.expect(group, validate=True)
    def put(self, id):
        """Update eines bestimmten Gruppen-Objekts."""

        adm = ShoppingListAdministration()
        g = group.from_dict(api.payload)

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
        adm = ShoppingListAdministration()
        cust = adm.get_group_by_name(name)
        return cust


"""
Klassen und Operationen zu Retailer
"""


@ikauf.route('/retailers')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerListOperations(Resource):
    @ikauf.marshal_list_with(retailer)
    @secured
    def get(self):
        """Auslesen aller Retailer-Objekte"""

        adm = ShoppingListAdministration()
        r = adm.get_all_retailer()
        return r

    def post(self):
        """Anlegen eines neuen Retailer-Objekts für einen gegebene Group"""

        adm = ShoppingListAdministration()

        r = adm.get_retailer_by_group(id)

        if r is not None:
            x = adm.create_retailer(r)
            return x, 200
        else:
            return 'Group unknown', 500


@ikauf.route('/retailers/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Id des Retailer-Objekts')
class RetailerOperations(Resource):
    @ikauf.marshal_with(retailer)
    def get(self, id):
        """Auslesen eines bestimmten Retailer-Objekts"""

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_id(id)
        return r

    def delete(self, id):
        """Löschen eines bestimmten Retailer-Objekts"""

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_id(id)
        adm.delete_retailer(r)
        return '', 200

    @ikauf.marshal_with(retailer)
    @ikauf.expect(retailer, validate=True)
    def put(self, id):
        """Update eines bestimmten Retailer-Objekts."""

        adm = ShoppingListAdministration()
        r = Retailer.from_dict(api.payload)

        if r is not None:
            r.set_retailer_id(id)
            adm.save_retailer(r)
            return '', 200
        else:
            return '', 500


@ikauf.route('/retailer-by-retailer-entry-list/<string:retailerEntryList>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailerEntryList', 'RetailerEntry des zugehörigen Retailer-Objekts')
class RetailerByRetailerEntryListOperations(Resource):
    @ikauf.marshal_with(retailer)
    @secured
    def get(self, retailer_entry_list):
        """"Auslesen eines bestimmten Retailer-Objekts nach RetailerEntry"""

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_retailer_entry_list(retailer_entry_list)
        return r


@ikauf.route('/retailer-by-name/<string:name>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('name', 'Name eines Retailer-Objekts')
class RetailerRelatedByNameOperations(Resource):
    @ikauf.marshal_with(retailer)
    def get(self, name):
        """Auslesen eines bestimmten Retailer-Objekt nach Name"""

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_name(name)
        return r


"""
Klassen und operationen für RetailerEntryList
"""


@ikauf.route('/retailer-entry-list')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerEntryListListOperations(Resource):
    @ikauf.marshal_list_with(retailer_entry_list)
    @secured
    def get(self):
        """Auslesen aller RetailerEntryList-Objekte"""

        adm = ShoppingListAdministration()
        rel = adm.get_all_retailer_entry_list()
        return rel


    def post(self, id):
        """Anlegen eines RetailerListEntry für eine gegebene Gruppe"""

        adm = ShoppingListAdministration()

        gruppe = adm.get_group_by_id(id)

        if gruppe is not None:
            result = adm.create_retailer_entry_list_for_group
            return result
        else:
            return "Gruppe unknown", 500


@ikauf.route('/retailer-entry-list/<int:retailerEntryListId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Id des RetailerEntryList-Objekts')
class RetailerEntryListOperations(Resource):
    @ikauf.marshal_with(retailer_entry_list)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten RetailerEntryList-Objekts"""

        adm = ShoppingListAdministration()
        rel = adm.get_retailer_entry_list_by_id(id)
        return rel

    @secured
    def delete(self, id):
        """Löschen eines bestimmten RetailerEntryList-Objekts"""

        adm = ShoppingListAdministration()
        rel = adm.get_retailer_entry_list_by_id(id)
        adm.delete_retailer_entry_list(rel)
        return '', 200

    @ikauf.marshal_with(retailer_entry_list)
    @ikauf.expect(retailer_entry_list, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten RetailerEntryList-Objekts."""

        adm = ShoppingListAdministration()
        rel = RetailerEntryList.from_dict(api.payload)

        if rel is not None:
            rel.set_id(id)
            adm.save_retailer_entry_list(rel)
            return '', 200
        else:
            return '', 500


@ikauf.route('/retailer-entry-list-by-group/<int:groupId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('group', 'group des zugehörigen RetailerEntryList-Objekts')
class RetailerEntryListRelatedByGroupOperations(Resource):
    @ikauf.marshal_with(retailer_entry_list)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten RetailerEntryList-Objekts nach Gruppe"""

        adm = ShoppingListAdministration()
        r = adm.get_retailer_entry_list_by_group(id)
        return r
#todo post wurde in list operations eingefügt

@ikauf.route('/retailer_entry_list/<string:retailer>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer', 'retailer eines RetailerEntryList-Objekts')
class RetailerEntryListRelatedByRetailerOperations(Resource):
    @ikauf.marshal_with(retailer_entry_list)
    @secured
    def get(self, retailer):
        """Auslesen eines bestimmten RetailerEntryList-Objekt nach Retailer"""

        adm = ShoppingListAdministration()
        rel = adm.get_retailer_entry_list_by_retailer(retailer)
        return rel


"""
Klassen und Operationen für Entry
"""


@ikauf.route('/entry')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class EntryListOperations(Resource):
    @ikauf.marshal_list_with(entry)
    @secured
    def get(self):
        """Auslesen aller Entry-Objekte"""

        adm = ShoppingListAdministration()
        e = adm.get_all_entrys()
        return e

    def post(self):
        """Anlegen eines neuen Entry-Objekts"""

        adm = ShoppingListAdministration()

        proposal = Entry.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_entry(proposal.get_entry_name()) #todo überlgen ob : prosposal.get_entry_list() sinn macht
            return x, 200
        else:
            return '', 500


@ikauf.route('/entry-by-id/<int:entryId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des Entry-Objekts')
class EntryOperations(Resource):
    @ikauf.marshal_with(entry)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Entry-Objekts"""

        adm = ShoppingListAdministration()
        e = adm.get_entry_by_id(id)
        return e

    @secured
    def delete(self, id):
        """Läschen eines bestimmten Entry-Objekts"""

        adm = ShoppingListAdministration()
        e = adm.get_entry_by_id(id)
        adm.delete_entry_by_id(e)
        return '', 200

    @ikauf.marshal_with(entry)
    @ikauf.expect(entry, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Entry-Objekts."""

        adm = ShoppingListAdministration()
        e = entry.from_dict(api.payload)

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
    @secured
    def get(self, article):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingListAdministration()
        e = adm.get_entry_by_article(article)
        return e


@ikauf.route('/entry-by-amount/<string:amount>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('amount', 'Amount des zugehörigen Entry-Objekts')
class EntryRelatedByAmountOperations(Resource):
    @ikauf.marshal_with(entry)
    @secured
    def get(self, amount):
        """Auslesen eines bestimmten Entry-Objekts nach Amount"""

        adm = ShoppingListAdministration()
        am = adm.get_amount_by_entry(amount)
        return am


@ikauf.route('/entry-by-retailer-entry-list/<list:retailer-entry-list>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer-entry-list', 'Retailer_Entry_List eines Entry-Objekt')
class EntryRelatedByRetailerEntryListOperations(Resource):
    @ikauf.marshal_with(entry)
    @secured
    def get(self, retailer_entry_list):
        """Auslesen eines bestimmten Entry-Objekt nach RetailerEntryList"""

        adm = ShoppingListAdministration()
        rel = adm.get_entry_by_retailer_entry_list(retailer_entry_list)
        return rel

@ikauf.route('/entry-by-unit/<string:unit>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('unit', 'Unit des zugehörigen Entry-Objekts')
class EntryRelatedByUnitOperations(Resource):
    @ikauf.marshal_with(entry)
    @secured
    def get(self, unit):
        """Auslesen eines bestimmten Entry-Objekts nach Amount"""

        adm = ShoppingListAdministration()
        am = adm.get_unit_by_entry(unit)
        return am


"""
Klassen und Operationen für ShoppingList
"""


@ikauf.route('/shopping-list')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class ShoppingListListOperations(Resource):
    @ikauf.marshal_list_with(shopping_list)
    @secured
    def get(self):
        """Auslesen aller ShoppingList-Objekte"""

        adm = ShoppingListAdministration()
        sl = adm.get_all_shopping_list()
        return sl

    def post(self):
        """Anlegen eines neuen ShoppingList-Objekts"""

        adm = ShoppingListAdministration()

        prosposal = ShoppingList.from_dict(api.payload)

        if prosposal is not None:
            x = adm.create_shopping_list(prosposal.get_shopping_list_name)
            return x, 200
        else:
            return '', 500


@ikauf.route('/shopping-list-by-id/<int:shoppingListId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des ShoppingList-Objekts')
class ShoppingListOperations(Resource):
    @ikauf.marshal_with(shopping_list)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten ShoppingList-Objekts"""

        adm = ShoppingListAdministration()
        sl = adm.get_shopping_list_by_id(id)
        return sl

    @secured
    def delete(self, id):
        """Löschen eines bestimmten ShoppingList-Objekts"""

        adm = ShoppingListAdministration()
        sl = adm.get_shopping_list_by_id(id)
        adm.delete_shopping_list_by_id(sl)
        return '', 200

    @ikauf.marshal_with(shopping_list)
    @ikauf.expect(shopping_list, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten ShoppingList-Objekts."""

        adm = ShoppingListAdministration()
        sl = shopping_list.from_dict(api.payload)

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
    @secured
    def get(self, name):
        """Auslesen eines bestimmten ShoppingList-Objekts nach Name"""

        adm = ShoppingListAdministration()
        sl = adm.get_shopping_list_by_name(name)
        return sl


@ikauf.route('/shopping-list-by-group-id/<int: groupId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('groupId', 'Group ID des zugehörigen ShoppingList-Objekts')
class ShoppingListRelatedByGroupIdOperations(Resource):
    @ikauf.marshal_with(shopping_list)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten ShoppingList-Objekts nach Group ID"""

        adm = ShoppingListAdministration()
        sl = adm.get_shopping_list_by_group_id(id)
        return sl


"""
Klassen und Operationen für GroupMembership
"""


@ikauf.route('/retailer-by-group')
@ikauf.route(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des RetailerGroup-Objekts')
class RetailerGroupOperations(Resource):
    @ikauf.marshal_with(retailer_group)
    @secured
    def get(self):
        adm = ShoppingListAdministration()
        a = adm.get_all_retailer_members()
        return a

    @secured
    def delete(self, id):
        """Löschen eines bestimmten RetailerGroup-Objekts"""

        adm = ShoppingListAdministration()
        a = adm.get_retailer_by_group(id)
        adm.delete_retailer_by_group(a)
        return '', 200

    @ikauf.marshal_with(retailer_group)
    @ikauf.expect(retailer_group, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten RetailerGroup-Objekts."""

        adm = ShoppingListAdministration()
        a = RetailerGroup.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.save_retailer_group(a)
            return '', 200
        else:
            return '', 500


@ikauf.route('/retailer-by-group')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerGroupListOperations(Resource):
    @ikauf.marshal_list_with(retailer_group)
    @secured
    def get(self):
        """Auslesen aller RetailerGroup-Objekte"""

        adm = ShoppingListAdministration()
        r = adm.get_all_retailer_members()
        return r

    def post(self):
        """Anlegen eines neuen Retailer-Objekts für einen gegebene Group"""

        adm = ShoppingListAdministration()

        r = adm.get_retailer_by_group(id) #todo stimmt id?

        if r is not None:
            x = adm.create_retailer(r)
            return x, 200
        else:
            return 'Group unknown',

@ikauf.route('/retailer-member-by-group/<int:groupId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('groupId', 'Gruppen-Objekt des zugehörigen RetailerEntryList-Objekts')
class RetailerGroupRelatedByGroupOperations(Resource):
    @ikauf.marshal_with(retailer_group)
    @secured
    def get(self, retailer_group):
        """Auslesen eines bestimmten Retailer-Objekts nach Gruppe"""

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_group(retailer_group)
        return r




"""
Klassen und Operationen für GroupMembership
"""


@ikauf.route('/group-membership')
@ikauf.route(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des GroupMembership-Objekts')
class GroupMembershipOperations(Resource):
    @ikauf.marshal_with(group_member)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten GroupMembership-Objekts"""
        adm = ShoppingListAdministration()
        a = adm.get_member_by_group_membership(id)
        return a

    @secured
    def delete(self, id):
        """Löschen eines bestimmten GroupMembership-Objekts"""

        adm = ShoppingListAdministration()
        a = adm.get_member_by_group_membership(id)
        adm.delete_member_of_group_membership(a)
        return '', 200

    @ikauf.marshal_with(group_member)
    @ikauf.expect(group_member, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten GroupMembership-Objekts."""

        adm = ShoppingListAdministration()
        a = GroupMembership.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.save_group_member_ship(a)
            return '', 200
        else:
            return '', 500


@ikauf.route('/group-membership')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class GroupMembershipListOperations(Resource):
    @ikauf.marshal_list_with(group_member)
    @secured
    def get(self):
        """Auslesen aller GroupMembership-Objekte"""

        adm = ShoppingListAdministration()
        gms = adm.get_all_group_members()
        return gms

    def post(self):
        """Anlegen eines neuen GroupMembership-Objekts für einen gegebene Group"""

        adm = ShoppingListAdministration()

        r = adm.get_member_by_group_membership(id)
        x = adm.get_group_membership_by_member(id)

        if r is not None:
            x = adm.create_group_membership(r, x)
            return x, 200
        else:
            return 'Group unknown', 500


@ikauf.route('/groups-by-membership/int:id>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('userId', 'Das User Objekt')
class GroupsByMembershipOperations(Resource):
    @ikauf.marshal_with(group_member)
    @secured
    def get(self, member):
        """ Auslesen von Gruppen-Objekten, die durch den User bestimmt werden.

        Die auszulesenden Objekte werden durch ```user``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_group_by_user(member)
        return cust




"""
Klassen und Operationen für Favorite
"""


@ikauf.route('/favorite')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class FavoriteListOperations(Resource):
    @ikauf.marshal_list_with(favorite)
    @secured
    def get(self):
        """Auslesen aller Favorite-Objekte"""

        adm = ShoppingListAdministration()
        a = adm.get_all_favorits()
        return a

    def post(self):
        """Anlegen eines neuen Favorite-Objekts"""

        adm = ShoppingListAdministration()

        proposal = Favorite.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_favorite(proposal.get_favorit(), proposal.get_amount(), proposal.get_unit(),
                                    proposal.get_article()) # todo unfilled konnten problem nicht lösen
            return x, 200
        else:
            return '', 500


@ikauf.route('favorite-by-id/<int:favoriteId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des Favorite-Objektes')
class FavoriteOperations(Resource):
    @ikauf.marshal_with(favorite)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Favorite-Objekts"""

        adm = ShoppingListAdministration()
        a = adm.get_favorite_by_id(id)
        return a

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Favorite-Objekts"""

        adm = ShoppingListAdministration()
        a = adm.get_favorite_by_id(id)
        adm.delete_favorite_by_id(a)
        return '', 200

    @ikauf.marshal_with(favorite)
    @ikauf.expect(favorite, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Favorite-Objekts."""

        adm = ShoppingListAdministration()
        a = favorite.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.save_favorite(a)
            return '', 200
        else:
            return '', 500


"""
Start der main.py um zu testen ob es funktioniert (in der lokalen Entwicklerumgebung).
Um dies zu testen muss, wie in der VL eine Db in Python vorliegen.
"""

if __name__ == '__main__':
    app.run(debug=True)