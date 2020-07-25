import React, { Component } from 'react';
import RetailerEntryList from './RetailerEntryList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
/* import RetailerBO from '../../api/RetailerBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import ShoppingListBo from '../../api/ShoppingListBO'; */

export default class ShoppingListList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      retailers: [],
    };
  }
  //testdata
  fetchShoppinglistlists() {
    const data = [
      {
        id: 1,
        name: 'Fest',
        group_id: 3,
        retailer_id: 1,
      },
      {
        id: 1,
        name: 'Hochzeit',
        group_id: 2,
        retailer_id: 2,
      },
      {
        id: 1,
        name: 'Abschlussfeier',
        group_id: 5,
        retailer_id: 3,
      },
    ];
    this.setState({ data });
  }
  //Alle Retailers fetchen der jeweiligen Gruppe
  fetchRetailers() {
    const retailers = [
      {
        id: 1,
        name: 'EDEKA',
      },
      {
        id: 2,
        name: 'EDEKA2',
      },
      {
        id: 3,
        name: 'EDEKA3',
      },
    ];
    this.setState({ retailers });
  }

  componentDidMount() {
    this.fetchRetailers();
    this.fetchShoppinglistlists();
  }

  render() {
    const { data, retailers } = this.state;
    return (
      <div>
        {data.map((elem) => (
          <Card>
            <CardContent style={{ marginTop: 10 }} variant="h5">
              <RetailerEntryList
                shoppingListId={elem.id}
                retailer={retailers.find((x) => x.id === elem.retailer_id)}
                groupId={elem.group_id}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}
