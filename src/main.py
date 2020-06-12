from flask import Flask
from flask_restx import Resource, Api
from flask_cors import CORS
"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""
app = Flask(__name__)
api = Api(app)
#CORS(app, Resource/ikauf/)

ikauf = api.namespace('ikauf', description='Funktionen der App Ikauf')

if __name__ == '__main__':
  app.run (port=1337, debug=True)

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
  'group_name' : fields.String(attribute = '_group_name', description='Name einer Gruppe'),
  'user_list' : fields.List(attribute = '_user_list',description='Alle Benutzer einer Gruppe')
})

retailer = api.inherit('retailer', bo, {
    'retailer_name': fields.String(attribute='_retailer_name', description='Name eines Verkäufers'),
    'group_id': fields.Integer(attribute='_group_id', description='ID einer Gruppe')
})

retailer_entry_list = api.inherit('RetailerEntryList', bo,{
  'retailer' : fields.String(attribute = '_retailer', description='Name eines Verkäufers'),
  'user' : fields.String(attribute = '_user', description='Name eines Benutzers'),
  'shopping_list_id' : fields.Intengar(attribute = '_shopping_list_id',description='ID einer Shopping List' )
})

entry = api.inherit('Entry', bo, {
  'article' : fields.String(attribute = '_article', discription = 'Name eines Artikel'),
  'unit' : fields.String(attribute = '_unit', discription = 'Name der Einheit'),
  'amount': fields.Intengar(attribute = '_amount', discription = 'Menge eines Artikel'),
  'modification_date': fields.Date(attribute = '_modification_date', discription = 'Änderungsdatum der Entry' ),
  'retailer_entry_list_id': fields.Intengar(attrubute = '_retailer_entry_list_id', discription = 'ID der RetailerEntryList')
})

shopping_list = api.inherit('ShoppingList', bo, {
  'shopping_list_name' : fields.String(attribute = '_shopping_list_name', discription = 'Name einer Shoppingliste'),
  'group_id' : fields.Intengar(attribute = '_group_id', discription = 'ID einer Gruppe')
})

article = api.inherit('Article', bo, {
    'name': fields.String(attribute='_name' , description='Name eines Artikels'),
    'standart_boolean': fields.Boolean(attribute='_standart_boolean', description= 'Prüfung auf Standartikel'),#Description anpassen
    'retailer_id': fields.Intenger(attribute='_retailer_id', description='ID eines Verkäufers')
})\

"""
Klassen und Operationen zu Gruppen
"""

@ikauf.route('/group')
@ikauf.route(500, "Falls Server-seitiger Fehler")
class GroupListOperations(Resource):
  @ikauf.marshal_list_with(group)
  @secured
  def get(self):
      "Auslesen aller Gruppen-Objekte"

      adm = ShoppingListAdministration()
      g = adm.get_all_groups()
      return g

  def post(self):
    "Anlegen eines neuen Gruppen-Objekts"

    adm = ShoppingListAdministration()

    prosposal = Group.from_dict(api.payload)

    if prosposal is not None:
      x = adm.create_group(prosposal.get_group_name(), prosposal.get_user_list())
      return x, 200
    else:
      return '', 500


@ikauf.route('/group/<int:groupId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('groupId', 'Id des Gruppen-Objekts')
class GroupOperations(Resource):
    @ikauf.marshal_with(group)
    @secured
    def get(self, id):
        "Auslesen eines bestimmten Gruppen-Objekts"

        adm = ShoppingListAdministration()
        g = adm.get_group_by_id(id)
        return g

    @secured
    def delete(self, id):
        "Läschen eines bestimmten Gruppen-Objekts"

        adm = ShoppingListAdministration()
        g = adm.get_group_by_id(id)
        adm.delete_group(g)
        return '', 200

    @banking.marshal_with(group)
    @banking.expect(group, validate=True)
    @secured
    def put(self, id):
        "Update eines bestimmten Customer-Objekts."

        adm = ShoppingListdministration()
        g = group.from_dict(api.payload)

        if g is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            g.set_id(id)
            adm.save_group(g)
            return '', 200
        else:
            return '', 500


@ikauf.route('/group-by-name/<string:groupName>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('groupName', 'Name des Gruppen-Objekts')
class GroupRelatedByNameOperations(Resource):
    @ikauf.marshal_with(group)
    @secured
    def get(self, name):
        "Auslesen eines bestimmten Gruppen-Objekts nach Namen"

        adm = ShoppingListAdministration()
        g = adm.get_group_by_name()
        return g


@ikauf.route('/group-by-user/<int:userId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('userId', 'Id des User-Objekts')
class GroupRelatedByUserOperations(Resource):
    @ikauf.marshal_with(user)
    @secured
    def get(self, user):
        "Auslesen eines bestimmten Gruppen-Objekt nach User"

        adm = ShoppingListAdministration()
        g= adm.get_group_by_user()
        return g

#TODO Ändern mit Zwischentabelle

@ikauf.route('/user-by-group/<int:groupId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('groupId', 'Gruppen-Objekt')
class UserRelatedByGroupOperations(Resource):
    @ikauf.marshal_with(group)
    @secured
    def get(self, id):
        "Auslesen aller User einer Gruppe"

        adm = ShoppingListAdministration()

        g = adm.get_group_by_id(id)
        if g is not None:
            group_list = adm.get_user_by_group()
            return group_list
        else:
            return "Gruppe nicht gefunden", 500

"""
Klassen und Operationen zu Retailer
"""

@ikauf.route('/retailer')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerListOperations(Resource):
    @ikauf.marshal_list_with(retailer)
    @secured
    def get(self):
        "Auslesen aller Retailer-Objekte"

        adm = ShoppingListAdministration()
        r = adm.get_all_retailer()
        return r

#TODO anschauen und bearbeiten

 """  def post(self):
        "Anlegen eines neuen Retailer-Objekts für einen gegebene Group"

        adm = ShoppingListAdministration()

        prosposal = Retailer.get_group_id(groupId)

        if prosposal is not None:
            x = adm.create_retailer(prosposal.get_retailer_name(), prosposal.get_group_id())
            return x, 200
        else:
            return '', 500
            """


@ikauf.route('/retailer/<int:groupId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('groupId', 'Id des Gruppen-Objekts')
class RetailerOperations(Resource):
    @ikauf.marshal_with(retailer)
    @secured
    def get(self, id):
        "Auslesen eines bestimmten Retailer-Objekts"

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_id(id)
        return r

    @secured
    def delete(self, id):
        "Läschen eines bestimmten Retailer-Objekts"

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_id(id)
        adm.delete_retailer(r)
        return '', 200

    @banking.marshal_with(retailer)
    @banking.expect(retailer, validate=True)
    @secured
    def put(self, id):
        "Update eines bestimmten Retailer-Objekts."

        adm = ShoppingListdministration()
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
        "Auslesen eines bestimmten Retailer-Objekts nach RetailerEntry"

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_retailer_entry()
        return r


@ikauf.route('/retailer-by-name/<string:retailerName>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailerName', 'Name eines Retailer-Objekts')
class RetailerRelatedByNameOperations(Resource):
    @ikauf.marshal_with(retailer)
    @secured
    def get(self, name):
        "Auslesen eines bestimmten Retailer-Objekt nach Name"

        adm = ShoppingListAdministration()
        r= adm.get_retailer_by_name()
        return r


@ikauf.route('/retailer-by-group/<int:groupId>')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('groupId', 'Gruppen-Objekt des zugehörigen RetailerEntryList-Objekts')
class RetailerRelatedByGroupOperations(Resource):
    @ikauf.marshal_with(retailer_entry_list)
    @secured
    def get(self, group):
        "Auslesen eines bestimmten Retailer-Objekts nach Gruppe"

        adm = ShoppingListAdministration()
        rel = adm.get_retailer_entry_list_by_group()
        return rel

#TODO RetailerEntryList ändern, nur mit nur mit Foreignkeys als Attribute

@ikauf.route('/retailer_entry_list')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerEntryListListOperations(Resource):
    @ikauf.marshal_list_with(retailer_entry_list)
    @secured
    def get(self):
        "Auslesen aller RetailerEntryList-Objekte"

        adm = ShoppingListAdministration()
        rel = adm.get_all_retailer_entry_list()
        return rel

#TODO anschauen und bearbeiten

"""    def post(self):
        "Anlegen eines neuen RetailerEntryList-Objekts für einen gegebene Group"

        adm = ShoppingListAdministration()

        prosposal = RetailerEntryList.from_dict(api.payload)

        if prosposal is not None:
            x = adm.create_retailer_entry_list(prosposal.get_retailer_name())
            return x, 200
        else:
            return '', 500

        "hier bei x nochmal schauen ob es Sinn macht"
"""

@ikauf.route('/retailer')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('id', 'Id des Gruppen-Objekts')
class RetailerEntryListOperations(Resource):
    @ikauf.marshal_with(retailer)
    @secured
    def get(self, id):
        "Auslesen eines bestimmten Retailer-Objekts"

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_id(id)
        return r

    @secured
    def delete(self, id):
        "Läschen eines bestimmten Retailer-Objekts"

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_id(id)
        adm.delete_retailer(r)
        return '', 200

    @banking.marshal_with(retailer)
    @banking.expect(retailer, validate=True)
    @secured
    def put(self, id):
        "Update eines bestimmten Retailer-Objekts."

        adm = ShoppingListdministration()
        r = retailer.from_dict(api.payload)

        if r is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            r.set_id(id)
            adm.save_retailer(r)
            return '', 200
        else:
            return '', 500


@ikauf.route('/retailer')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('retailer_entry', 'RetailerEntry des zugehörigen Retailer-Objekts')
class RetailerByRetailerEntryOperations(Resource):
    @ikauf.marshal_with(retailer)
    @secured
    def get(self, retailer_entry_list):
        "Auslesen eines bestimmten Retailer-Objekts nach RetailerEntry"

        adm = ShoppingListAdministration()
        r = adm.get_retailer_by_retailer_entry()
        return r


@ikauf.route('/retailer')
@ikauf.response(500, 'Falls Server-seitiger Fehler')
@ikauf.param('name', 'Name eines Retailer-Objekts')
class RetailerRelatedByNameOperations(Resource):
    @ikauf.marshal_with(retailer)
    @secured
    def get(self, name):
        "Auslesen eines bestimmten Retailer-Objekt nach Name"

        adm = ShoppingListAdministration()
        r= adm.get_retailer_by_name()
        return r


@ikauf.route('/retailer')
@ikauf.response(500, "Falls Server-seitiger Fehler")
class RetailerEntryListListOperations(Resource):
    @ikauf.marshal_list_with(retailer)
    @secured
    def get(self):
        "Auslesen aller Retailer-Objekte"

        adm = ShoppingListAdministration()
        rel = adm.get_all_retailer_entry_list()
        return rel

    def post(self):
        "Anlegen eines neuen Retailer-Objekts"

        adm = ShoppingListAdministration()

        r = adm.get_retailer_by_id(id)

        if r is not None:
            result = adm.get_retailer_for_retailer_entry_list()
            return result, 200
        else:
            return 'Retailer unknown', 500

        "hier bei x nochmal schauen ob es Sinn macht"



