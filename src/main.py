# Flask import da der Service darauf basiert
from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS

# Zugriff auf BusinessObject Klassen und Applikationslogik
from server.ShoppingAdministration import ShoppingListAdministration
from server.bo.Group import Group
from server.bo.User import User
from server.bo.Retailer import Retailer
from server.bo.RetailerEntryList import RetailerEntryList


# selbstgeschriebener Decorator, übernimmt Authentifikation



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

group = api.inherit('Group', bo, {
    'group_name': fields.String(attribute='_name', description='Name einer Gruppe'),
})

retailer = api.inherit('retailer', bo, {
    'retailer_name': fields.String(attribute='_name', description='Name eines Verkäufers'),
    'group_id': fields.Integer(attribute='_id', description='ID einer Gruppe')
})

retailer_entry_list = api.inherit('RetailerEntryList', {
  'retailer': fields.String(attribute='_retailer', description='Name eines Verkäufers'),
  'user': fields.String(attribut='_user', description='Name eines Benutzers'),
  'shopping_list_id': fields.Integer(attribute='_shopping_list_id', description='ID einer Shopping List'),
  'entry_id': fields.Integer(attribute='_entry_id', description='ID eines Eintrags')
})

entry = api.inherit('Entry', bo, {
  'article': fields.String(attribute='_article', discription='Name eines Artikel'),
  'unit': fields.String(attribute='_unit', discription='Name der Einheit'),
  'amount': fields.Integer(attribute='_amount', discription='Menge eines Artikel'),
  'modification_date': fields.Date(attribute='_modification_date', discription='Änderungsdatum der Entry'),
  'retailer_entry_list_id': fields.Integer(attrubute='_retailer_entry_list_id', discription='ID der RetailerEntryList')
})


@ikauf.route('/retailer-entry-list')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerEntryListListOperations(Resource):
    @ikauf.marshal_list_with(retailer_entry_list)
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
            result = adm.create_retailer_entry_list_for_group(gruppe)
            return result
        else:
            return "RetailerEntryList unknown", 500

@ikauf.route('/retailer-entry-list/<int:id>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Id des RetailerEntryList-Objekts')
class RetailerEntryListOperations(Resource):
    @ikauf.marshal_with(retailer_entry_list)
    def get(self, id):
        """Auslesen eines bestimmten RetailerEntryList-Objekts"""

        adm = ShoppingListAdministration()
        rel = adm.get_retailer_entry_list_by_id(id)
        return rel


    def delete(self, id):
        """Löschen eines bestimmten RetailerEntryList-Objekts"""

        adm = ShoppingListAdministration()
        rel = adm.get_retailer_entry_list_by_id(id)
        adm.delete_retailer_entry_list(rel)
        return '', 200

    @ikauf.marshal_with(retailer_entry_list)
    @ikauf.expect(retailer_entry_list, validate=True)
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

"""
Start der main.py um zu testen ob es funktioniert (in der lokalen Entwicklerumgebung).
Um dies zu testen muss, wie in der VL eine Db in Python vorliegen.
"""

if __name__ == '__main__':
    app.run(debug=True)