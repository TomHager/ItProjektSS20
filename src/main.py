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
    'unit': fields.String(attribute='_unit', description='Einheit eines Artikels'),
    'amount': fields.Integer(attribute='_amount', description='Menge eines Artikels'),
    'article': fields.String(attribute='_article', description='ID eines Artikels'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='ID eines Retailers'),
    'group_id': fields.Integer(attribute='_group_id', description='ID einer Gruppe')
})

shopping_list = api.inherit('ShoppingList', bo, {
    'name': fields.String(attribute='_name', discription='Name einer Shoppingliste'),
    'groups_id': fields.Integer(attribute='_groups_id', discription='ID einer Gruppe')
})

retailer_groups = api.inherit('RetailerGroup', {
    'retailer_member': fields.Integer(attribute='_retailer_member', description='Retailer ID'),
    'retailer_group': fields.Integer(attribute='_retailer_group',
                                     description='Retailer Gruppe'),
})

group_member = api.inherit('GroupMember', {
    'member': fields.Integer(attribute='_member', description='User ID'),
    'group_membership': fields.Integer(attribute='_group_membership',
                                 description='Gruppen ID'),
})


@ikauf.route('/favorite')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class FavoriteListOperations(Resource):
    @ikauf.marshal_list_with(favorite)
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
            x = adm.create_favorite(proposal.get_retailer_id(), proposal.get_amount(), proposal.get_unit(),
                                    proposal.get_article(), proposal.get_retailer_id(), proposal.get_group_id())
            return x, 200
        else:
            return '', 500


@ikauf.route('/favorite-by-group/<int:group_id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('group_id', 'ID des Favorite-Objektes')
class FavoriteByGroupOperations(Resource):
    @ikauf.marshal_with(favorite)
    def get(self, group_id):
        """Auslesen eines bestimmten Favorite-Objekts"""

        adm = ShoppingAdministration()
        a = adm.get_favorite_by_group(group_id)
        return a


@ikauf.route('/favorite-by-id/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'ID des Favorite-Objektes')
class FavoriteOperations(Resource):
    @ikauf.marshal_with(favorite)
    def get(self, id):
        """Auslesen eines bestimmten Favorite-Objekts"""

        adm = ShoppingAdministration()
        a = adm.get_favorite_by_id(id)
        return a

    def delete(self, id):
        """Löschen eines bestimmten Favorite-Objekts"""

        adm = ShoppingAdministration()
        a = adm.get_favorite_by_id(id)
        adm.delete_favorite_by_id(a)
        return '', 200

    @ikauf.marshal_with(favorite)
    @ikauf.expect(favorite, validate=True)
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
        adm = ShoppingAdministration()
        cust = adm.get_user_by_id(id)
        return cust

    @secured
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
            return '', 200
        else:
            return '', 500

"""
Start der main.py um zu testen ob es funktioniert (in der lokalen Entwicklerumgebung).
Um dies zu testen muss, wie in der VL eine Db in Python vorliegen.
"""

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    adm = ShoppingAdministration()
    x = adm.create_favorite(3, 4, "ererere", "L", 4, 4)
    print(x)

if __name__ == '__main__':
    adm = ShoppingAdministration()
    a = Favorite()
    a.set_id(2)
    a.set_unit('L')
    a.set_amount(5)
    a.set_article('Bier')
    a.set_retailer_id(4)
    a.set_group_id(5)
    x = adm.save_favorite(a)
    print(x)