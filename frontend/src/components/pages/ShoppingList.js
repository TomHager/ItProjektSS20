import React, { Component } from 'react';
import ShoppingListList from './ShoppingListList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import ShoppingListBO from '../../api/ShoppingListBO';
/* import RetailerBO from '../../api/RetailerBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import ShoppingListBo from '../../api/ShoppingListBO'; */

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      shoppinglists: [],
      rowIndex: -1,
      error: false,
    };
  }
  //testdata
  fetchShoppinglists() {
    const data = [
      {
        id: 1,
        name: 'Fest',
        group_id: 3,
        retailer_id: 1,
      },
      {
        id: 2,
        name: 'Hochzeit',
        group_id: 4,
        retailer_id: 2,
      },
      {
        id: 3,
        name: 'Abschlussfeier',
        group_id: 5,
        retailer_id: 3,
      },
    ];
    this.setState({ data });
  }

  componentDidMount() {
    this.fetchShoppinglists();
  }

  toggleHidden = (id) => {
    this.state.rowIndex === id
      ? this.setState({ rowIndex: -1 })
      : this.setState({ rowIndex: id });
  };

  validateAdd = () => {
    this.state.shoppinglistname.trim() !== ''
      ? this.AddShoppingList(this.shoppinglistname)
      : this.setState({ error: true });
  };

  AddShoppingList = (shoppinglistname) => {
    const { data, groupsId } = this.state;
    const shoppinglist = new ShoppingListBO();
    shoppinglist.setName(shoppinglistname);
    shoppinglist.setGroupId(groupsId);
    //@TODO shoppinglist.setId später entfernen
    shoppinglist.setID(Math.floor(Math.random() * Math.floor(500)));
    this.state.data.unshift(shoppinglist);
    this.setState({ data, error: false });
  };

  render() {
    const { error, data, rowIndex, shoppinglistname } = this.state;
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
              placeholder="Einkauflslistenname"
              error={error}
              onChange={(e) => this.setState({ shoppinglistname: e.target.value })}
            />
            <IconButton>
              <Add id={'AddBtn'} onClick={(e) => this.validateAdd()} />
            </IconButton>
          </CardContent>
        </Card>
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
                      groupsId={elem.group_id}
                      shoppinglistname={shoppinglistname}
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
