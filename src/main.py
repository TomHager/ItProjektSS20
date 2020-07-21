# Flask import da der Service darauf basiert
from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS

# Zugriff auf BusinessObject Klassen und Applikationslogik
from server.ShoppingAdministration import ShoppingAdministration
from server.bo.Entry import Entry
from server.bo.User import User
from server.bo.Group import Group
from server.bo.User import User
from server.bo.Retailer import Retailer
from server.bo.Favorite import Favorite
from server.bo.ShoppingList import ShoppingList
from server.bo.GroupMembership import GroupMembership
from server.bo.RetailerGroup import RetailerGroup

# selbstgeschriebener Decorator, übernimmt Authentifikation
from SecurityDecorater import secured



"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""

app = Flask(__name__)

"""
Modell gebaut, welches die Datenstruktur beschreibt. Auf dieser Basis tauschen Cliets und Sever Daten aus.
"""

api = Api(app, version='1.0', title='Eikaufs App API',
          description='API für das Shared-Shopping-List-System')

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
    'article': fields.String(attribute='_article', discription='Name eines Artikel'),
    'unit': fields.String(attribute='_unit', discription='Name der Einheit'),
    'amount': fields.Integer(attribute='_amount', discription='Menge eines Artikel'),
    'modification_date': fields.Date(attribute='_modification_date', discription='Änderungsdatum der Entry'),
    'user_id': fields.Integer(attribut='_user_id', description='Name eines Benutzers'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Name eines Verkäufers'),
    'shopping_list_id': fields.Integer(attribute='_shopping_list_id', description='ID einer Shopping List'),
})

favorite = api.inherit('Favorite', bo, {
    'unit': fields.Integer(attribute='_unit', description='Einheit eines Artikels'),
    'amount': fields.Integer(attribute='_amount', description='Menge eines Artikels'),
    'article': fields.Integer(attribute='article', description='ID eines Artikels')
})

shopping_list = api.inherit('ShoppingList', bo, {
    'name': fields.String(attribute='_name', discription='Name einer Shoppingliste'),
    'groups_id': fields.Integer(attribute='_groups_id', discription='ID einer Gruppe')
})

retailer_group = api.inherit('RetailerGroup', {
    'retailer_member': fields.Integer(attribute='_retailer_member', description='Retailer ID'),
    'retailer_group': fields.Integer(attribute='_retailer_group',
                                     description='Retailer Gruppe'),
})


@ikauf.route('/entry')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class EntryListOperations(Resource):
    @ikauf.marshal_list_with(entry)
    def get(self):
        """Auslesen aller Entry-Objekte"""

        adm = ShoppingAdministration()
        e = adm.get_all_entrys()
        return e

    def post(self):
        """Anlegen eines neuen Entry-Objekts"""

        adm = ShoppingAdministration()

        proposal = Entry.from_dict(api.payload)

        if proposal is not None:
            x = adm.create_entry(proposal.get_entry_name()) #todo überlgen ob : prosposal.get_entry_list() sinn macht
            return x, 200
        else:
            return '', 500


@ikauf.route('/entry-by-id/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des Entry-Objekts')
class EntryOperations(Resource):
    @ikauf.marshal_with(entry)
    def get(self, id):
        """Auslesen eines bestimmten Entry-Objekts"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_id(id)
        return e

    def delete(self, id):
        """Läschen eines bestimmten Entry-Objekts"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_id(id)
        adm.delete_entry_by_id(e)
        return '', 200

    @ikauf.marshal_with(entry)
    @ikauf.expect(entry, validate=True)
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
    def get(self, article):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_article(article)
        return e


@ikauf.route('/entry-by-retailer/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Retailer des zugehörigen Entry-Objekts')
class EntryRelatedByRetailerOperations(Resource):
    @ikauf.marshal_with(entry)
    def get(self, retailer_id):
        """Auslesen eines bestimmten Entry-Objekts nach Retailer"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_retailer(retailer_id)
        return e


@ikauf.route('/entry-by-user/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'User des zugehörigen Entry-Objekte')
class EntryRelatedByUserOperations(Resource):
    @ikauf.marshal_with(entry)
    def get(self, user_id):
        """Auslesen eines bestimmten Entry-Objekts nach User"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_user(user_id)
        return e


@ikauf.route('/entry-by-shoppin-list/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ShoppingList des zugehörigen Entry-Objekts')
class EntryRelatedByShoppingListOperations(Resource):
    @ikauf.marshal_with(entry)
    def get(self, shopping_list_id):
        """Auslesen eines bestimmten Entry-Objekts nach Article"""

        adm = ShoppingAdministration()
        e = adm.get_entry_by_shopping_list(shopping_list_id)
        return e


"""
Start der main.py um zu testen ob es funktioniert (in der lokalen Entwicklerumgebung).
Um dies zu testen muss, wie in der VL eine Db in Python vorliegen.
"""

if __name__ == '__main__':
    app.run(debug=True)
