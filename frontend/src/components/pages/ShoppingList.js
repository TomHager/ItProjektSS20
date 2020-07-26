import React, { Component } from 'react';
import ShoppingListList from './ShoppingListList';
import Favorite from './Favorite';
import Retailer from './Retailer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import ShoppingListBO from '../../api/ShoppingListBO';
import ShoppingAPI from '../../api/ShoppingAPI';
// import RetailerBO from '../../api/RetailerBO';
// import ShoppingListBo from '../../api/ShoppingListBO';

/**
 * Displays shoppinglists for selected group
 *
 * @author Tom Hager
 * @author Erik Lebedkin
 */

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    // groupId

    this.state = {
      data: [],
      shoppinglists: [],
      rowIndex: -1,
      error: false,
      showFav: false,
      showRetailer: false,
      groupId: this.props.match.params.groupId.toString()
    };
  }
  // Fetch shoppinglists for group
  fetchShoppinglist() {
    ShoppingAPI.getAPI()
      .searchShoppingListByGroupId(this.state.groupId)
      .then((data) => {
        this.setState({ data });
      });
  }

  componentDidMount() {
    this.fetchShoppinglist();
  }

  toggleHidden = (id) => {
    this.state.rowIndex === id
      ? this.setState({ rowIndex: -1 })
      : this.setState({ rowIndex: id });
  };

  toggleShowFav = () => {
    this.setState({ showFav: !this.state.showFav, shorRetailer: false });
  };

  toggleShowRetailer = () => {
    this.setState({ showRetailer: !this.state.showRetailer, showFav: false });
  };

  validateAdd = () => {
    this.state.shoppinglistname.trim() !== ''
      ? this.AddShoppingList()
      : this.setState({ error: true });
  };

  AddShoppingList = () => {
    const { shoppinglistname, groupId } = this.state;
    const shoppinglist = new ShoppingListBO();
    shoppinglist.setName(shoppinglistname.trim());
    shoppinglist.setGroupId(groupId);
    shoppinglist.setID(Math.floor(Math.random() * Math.floor(500)));

    console.log(shoppinglist)
    ShoppingAPI.getAPI()
    .addShoppingList(shoppinglist)
    .catch((e) => {
      console.info(e);
      // On success
      // this.state.data.push(shoppinglist);
      // this.setState({ data, error: false });
      this.fetchShoppinglist()
      document.getElementById('AddSL').value = '';
      
    });
  };

  render() {
    const { error, data, rowIndex, showFav,showRetailer, groupId } = this.state;
    return (
      <div>
        <Card
          style={{
            margin: '5px',
            fontSize: 'none',
          }}
        >
          <CardContent>
            <Input
            id="AddSL"
              placeholder="Einkauflslistenname"
              error={error}
              onChange={(e) => this.setState({ shoppinglistname: e.target.value })}
            />
            <IconButton>
              <Add id={'AddBtn'} onClick={(e) => this.validateAdd()} />
            </IconButton>

            <Button id="FavBtn" onClick={this.toggleShowFav.bind(this)}>
              ♥ Edit Favorites
            </Button>
            <Button id="RetailerBtn" onClick={this.toggleShowRetailer.bind(this)}>Retailer</Button>


            {showFav && (
              <Typography id={'Fav'}>
                <Favorite
                  groupId={groupId}
                />
              </Typography>
            )}
                        {showRetailer && (
              <Typography id={'Retailer'}>
                <Retailer
                  groupId={groupId}
                />
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Displays all shoppinglist of group */}
        {data.map((elem) => (
          <Card
            style={{
              margin: '5px',
              fontSize: '100px',
            }}
          >
            <CardContent id={elem.id}>
              <Typography>
                <Button
                  id={`Btn${elem.id}`}
                  onClick={() => this.toggleHidden(elem.id)}
                >{`EinkaufsListe: ${elem.name}`}</Button>
                {rowIndex === elem.id && (
                  <Typography id={`ShoppingList${elem.id}`}>
                    <ShoppingListList
                      shoppingListId={elem.id}
                      groupId={elem.group_id}
                      shoppinglistname={elem.name}
                    />
                  </Typography>
                )}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}
