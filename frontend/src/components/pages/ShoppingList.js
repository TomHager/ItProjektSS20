import React, {Component} from 'react';
import ShoppingListList from './ShoppingListList';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typogrphy, { Typography } from '@material-ui/core'
/* import RetailerBO from '../../api/RetailerBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import ShoppingListBo from '../../api/ShoppingListBO'; */



export default class ShoppingList extends Component{
  constructor(props){
    super(props);

    this.state = {
      data: [],
      shoppinglists: [],
    }
  }
    //testdata
  fetchShoppinglists() {
      const data = [
        {
          id: 1,
          name: "Fest",
          groups_id: 3,
          retailer_id: 1
        },
        {
          id: 2,
          name: "Hochzeit",
          groups_id: 4,
          retailer_id: 2
        },
        {
          id: 3,
          name: "Abschlussfeier",
          groups_id: 5,
          retailer_id: 3
        }
      ]
      this.setState({data})
    }
  //Alle Retailers fetchen der jeweiligen Gruppe
/*   fetchRetailers(){
    const retailers = [{
      id:1,
      name: "EDEKA"
    },
    {
      id:2,
      name: "EDEKA2"
    },
    {
      id:3,
      name: "EDEKA3"
    }]
    this.setState({retailers})
  }
 */
  componentDidMount(){
    /* this.fetchRetailers(); */
    this.fetchShoppinglists();
  }

  render(){
    const {data,
      shoppingListId,
      groupsId,
      shoppinglistname,
    } = this.state
    return(
      <div>
          {data.map((elem) => (
            <Card>
              <CardContent>
                {/* <Typography>{elem.name}</Typography> */}
                  <ShoppingListList 
                  shoppingListId = {shoppingListId}
                  groupsId = {groupsId}
                  shoppinglistname = {shoppinglistname}
                />     
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }
}

// ruft die RetailerEntryLists richtig auf, nur wiederholen. muss auf 1 mal pro Shoppinglist geändert werden
/*           <ShoppingListList 
                  shoppingListId = {shoppingListId}
                  groupsId = {groupsId}
                  shoppinglistname = {shoppinglistname}
                /> */

/*  retailer = {retailers.find((x) => x.id === elem.retailer_id)} */