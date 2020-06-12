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
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),

"""Users, Customers, Accounts & Transactions sind BusinessObjects..."""
user = api.inherit('User', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
    'external_user_id': fields.String(attribute='_external_user_id', description='Google User ID eines Benutzers')
})

group = api.inherit('Group', bo, {
  'group_name' : fields.String(attribute = '_group_name', description='Name einer Gruppe')
  'user_list' : fields.List(attribute = '_user_list',description='Alle Benutzer einer Gruppe')
})

retailer = api.inherit('retailer', bo, {
    'retailer_name': fields.String(attribute='_retailer_name', description='Name eines Verkäufers')
    'group_id': fields.Integer(attribute='_group_id', description='ID einer Gruppe')
})

retailer_entry_list = api.inherit('RetailerEntryList', bo,{
  'retailer' : fields.String(attribute = '_retailer', description='Name eines Verkäufers')
  'user' : fields.String(attribute = '_user', description='Name eines Benutzers')
  'shopping_list_id' : fields.Intengar(attribute = '_shopping_list_id',description='ID einer Shopping List' )
})

entry = api.inherit('Entry', bo {
  'article' : fields.String(attribute = '_article', discription = 'Name eines Artikel')
  'unit' : fields.String(attribute = '_unit', discription = 'Name der Einheit')
  'amount': fields.Intengar(attribute = '_amount', discription = 'Menge eines Artikel')
  'modification_date': fields.Date(attribute = '_modification_date', discription = 'Änderungsdatum der Entry' )
  'retailer_entry_list_id': fields.Intengar(attrubute = '_retailer_entry_list_id', discription = 'ID der RetailerEntryList')
})

shopping_list = api.inherit('ShoppingList' bo {
  'shopping_list_name' : fields.String(attribute = '_shopping_list_name', discription = 'Name einer Shoppingliste')
  'group_id' : fields.Intengar(attribute = '_group_id', discription = 'ID einer Gruppe')
})

article = api.inherit('Article', bo, {
    'name': fields.String(attribute='_name' , description='Name eines Artikels'),
    'standart_boolean': fields.Boolean(attribute='_standart_boolean', description= 'Prüfung auf Standartikel'),#Description anpassen
    'retailer_id': fields.Intenger(attribute='_retailer_id', description='ID eines Verkäufers')
})\

@ikauf.route('/group')
@ikauf.route(500, "Falls Server-seitiger Fehler")
class GroupListOperations(Resource):
  @ikauf.marshal_list_with(group)
  @secured
  def get(self):
      "Auslesen aller Gruppen-Objekte"

      adm = ShoppingListAdministration()
      group = adm.get_all_groups()
      return group

  def post(self):
    "Anlegen eines neuen Gruppen-Objekts"

    adm = ShoppingListAdministration()

    prosposal = Group.from_dict(api.payload)

    if prosposal is not None:
      x = adm.create_group(prosposal.get_group_name(), prosposal.get_user_list())
      return x, 200
    else:
      return '', 500

@ikauf.route('/retailer')
@ikauf.response(500)



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
    def get(self,name):
        """ Auslesen von User-Objekten, die durch den Namen bestimmt werden.

        Die auszulesenden Objekte werden durch ```name``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_user_by_name(name)
        return cust


@ikauf.route('/user-by-external-id/<int:external_id>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('external_id', 'Die Id des User-Objektes')

class UserByExternalIdOperations(Resource):
    @ikauf.marshal_with(user)
    @secured
    def get(self,external_id):
        """ Auslesen von User-Objekten, die durch eine externe Id bestimmt werden.

        Die auszulesenden Objekte werden durch ```external_id``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_user_by_external_id(external_id)
        return cust

@ikauf.route('/user-by-email/<string:email>')
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('email', 'Die Email des User')
class UserByEmailOperations(Resource):
    @ikauf.marshal_with(user)
    @secured
    def get(self,email):
        """ Auslesen von User-Objekten, die durch die E-Mail bestimmt werden.

        Die auszulesenden Objekte werden durch ```email``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_user_by_email(email)
        return cust

@ikauf.route('/group-by-user/int:id>')  String? Oder was???  GroupId UserId
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@ikauf.param('userId', 'Das User Objekt')
class GroupByUserOperations(Resource):
    @ikauf.marshal_with(user)
    @secured
    def get(self,user):
        """ Auslesen von Gruppen-Objekten, die durch den User bestimmt werden.

        Die auszulesenden Objekte werden durch ```user``` in dem URI bestimmt.
        """
        adm = ShoppingListAdministration()
        cust = adm.get_group_by_user(user)
        return cust



@ikauf.route('/user-by-list')   ???
@ikauf.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserListOperations(Resource):
  @ikauf.marshal_list_with(user)
  @secured
  def get(self):
      "Auslesen aller User-Objekte"

      adm = ShoppingListAdministration()
      user = adm.get_all_user()
      return user

  def post(self):
    "Anlegen eines neuen User-Objekts"

    adm = ShoppingListAdministration()

    prosposal = user.from_dict(api.payload)

    if prosposal is not None:
      x = adm.create_user(prosposal.get_user_name(), prosposal.get_user_id())
      return x, 200
    else:
        return '', 500
