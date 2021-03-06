import React, { Component } from 'react';
import RetailerEntryList from './RetailerEntryList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ShoppingAPI from '../../api/ShoppingAPI';
// import RetailerBO from '../../api/RetailerBO';
// import ShoppingListBo from '../../api/ShoppingListBO';

/**
 * Displays shoppinglists for selected group
 *
 * @author Erik Lebedkin
 * @author Tom Hager
 */

export default class ShoppingListList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      retailers: [],
    };
  }

  // Fetch all retailer for given group
  fetchRetailers() {
    // Fetch all retailer for group
    ShoppingAPI.getAPI()
      .searchRetailerMemberByGroup(this.props.groupId)
      .then((membership) => {
        // Fetch all retailers of data warehouse
        ShoppingAPI.getAPI()
          .getRetailers()
          .then((allRetailers) => {
            const retailers = [];
            for (let i of membership) {
              retailers.push(allRetailers.find((x) => x.id === i.retailer_member));
            }
            // if (retailers.length === 0) {
            //   retailers.push({ id: 0, name: 404 });
            // }
            console.log(retailers);
            // On success
            // setState before fetchfavorites because we need retailers in state
            this.setState({ retailers });
          });
      });
  }

  componentDidMount() {
    this.fetchRetailers();
  }

  render() {
    const { retailers } = this.state;
    return (
      <div>
        {retailers.map((elem) => (
          <Card>
            <CardContent style={{ marginTop: 10 }} variant="h5">
              <RetailerEntryList
                shoppingListId={this.props.shoppingListId}
                retailer={retailers.find((x) => x.id === elem.id)}
                groupId={this.props.groupId}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}
