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

#Datetime importieren
import datetime
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
    'modification_date': fields.DateTime(attribute='_modification_date', discription='Änderungsdatum der Entry'),
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



@ikauf.route('/retailer-by-group')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerGroupListOperations(Resource):
    @ikauf.marshal_list_with(retailer_group)
    def post(self):
        """Anlegen eines neuen Retailer-Objekts für einen gegebene Group"""

        adm = ShoppingAdministration()

        r = adm.get_retailer_by_group(id)

        if r is not None:
            x = adm.create_retailer(r)
            return x, 200
        else:
            return 'Group unknown',


@ikauf.route('/retailer-member-by-group/<int:retailer_group>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer_group', 'Gruppen-Objekt des zugehörigen RetailerEntryList-Objekts')
class RetailerGroupRelatedByGroupOperations(Resource):
    @ikauf.marshal_with(retailer_group)
    def get(self, retailer_group):
        """Auslesen eines bestimmten Retailer-Objekts nach Gruppe"""

        adm = ShoppingAdministration()
        r = adm.get_retailer_by_group(retailer_group)
        return r


@ikauf.route('/retailer-member-by-group/<int:retailer_member>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer_member', 'Gruppen-Objekt des zugehörigen RetailerEntryList-Objekts')
class RetailerGroupRelatedByRetailerOperations(Resource):
    @ikauf.marshal_with(retailer_group)
    def get(self, retailer_member):
        """Auslesen eines bestimmten Retailer Member-Objekts nach Retailer"""

        adm = ShoppingAdministration()
        r = adm.get_retailer_group_by_retailer(retailer_member)
        return r


"""
Start der main.py um zu testen ob es funktioniert (in der lokalen Entwicklerumgebung).
Um dies zu testen muss, wie in der VL eine Db in Python vorliegen.
"""

if __name__ == '__main__':
    app.run(debug=True)
