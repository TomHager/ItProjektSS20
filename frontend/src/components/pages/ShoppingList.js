import React, {Component} from 'react';
import ShoppingListList from './ShoppingListList';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
/* import RetailerBO from '../../api/RetailerBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import ShoppingListBo from '../../api/ShoppingListBO'; */



export default class ShoppingList extends Component{
  constructor(props){
    super(props);

    this.state = {
      data: [],
      shoppinglists: [],
      rowIndex: -1,
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

  componentDidMount(){
    this.fetchShoppinglists();
  }

  toggleHidden = (id) =>{
    this.state.rowIndex === id
    ? this.setState({ rowIndex: -1})
    : this.setState({rowIndex: id});
    }

  render(){
    const {data,
      shoppingListId,
      groupsId,
      rowIndex,
      shoppinglistname,
    } = this.state
    return(
      <div>
          {data.map((elem) => (
            <Card style ={{ 
              margin : "5px",
              fontSize: "100px"
              
              }}>
              <CardContent>
                  <Typography id = {elem.id} onClick = {() => this.toggleHidden(elem.id)}> EinkaufsListe: {elem.name}
                    {rowIndex === elem.id &&
                    <Typography>
                    <ShoppingListList 
                      shoppingListId = {shoppingListId}
                      groupsId = {groupsId}
                      shoppinglistname = {shoppinglistname}
                    />
                    </Typography>}
                  </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }
}
