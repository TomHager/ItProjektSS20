import { Refresh, AddBox, Delete, Edit, Check, Clear } from '@material-ui/icons';
import React, { Component } from 'react';
// import ShoppingAPI from '../../api/ShoppingAPI';
// import { addEntry } from '../../actions/shoppingList';
import {
  Container,
  CssBaseline,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  NativeSelect as Select,
} from '@material-ui/core';
// import EntryBO from '../../api/EntryBO';

/**
 * Displays favorites for given group
 *
 * @author Tom Hager
 */

export default class Favorite extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      //passed Columns and Data loaded into state
      data: [],
      units: [
        { name: 'Kg' },
        { name: 'L' },
        { name: 'g' },
        { name: 'pcs' },
        { name: 'pack' },
      ],
      retailers: [{ name: 'loading' }],
      rowIndex: -1,

      // Add favorite entry
      retailer: '',
      article: '',
      amount: 1,
      unit: '',

      // Edit favorite entry
      editRetailer: '',
      editArticle: '',
      editAmount: 1,
      editUnit: '',

      oldData: {},

      // Error for add
      errorAArticle: false,
      errorAAmount: false,

      // Error for Edit
      errorEArticle: false,
      errorEAmount: false,
    };
  }

  async fetchRetailers() {
    // @TODO fetch retailer
    setTimeout(() => {
      const retailers = [
        { id: 1, name: 'Edeka' },
        { id: 2, name: 'Rewe' },
        { id: 3, name: 'Kaufland' },
        { id: 9, name: 'Test' },
      ];
      // setState before fetchfavorites because we need retailers in state
      this.setState({
        retailers,
        retailer: retailers[0].id,
        editRetailer: retailers[0].id,
        unit: this.state.units[0].name,
        editUnit: this.state.units[0].name,
      });
      this.fetchFavorites();
    }, 1000);
  }

  // Fetching all favorites for a group
  async fetchFavorites() {
    // @TODO fetch favorites
    const data = [
      {
        id: 1,
        article: 'Apfel',
        amount: 4,
        unit: 'Kg',
        retailerId: 2,
        bought: false,
      },
      {
        id: 2,
        article: 'Birne',
        amount: 3,
        unit: 'pcs',
        retailerId: 9,
        bought: true,
      },
      {
        id: 3,
        article: 'Ananas',
        amount: 6,
        unit: 'g',
        retailerId: 3,
        bought: false,
      },
    ];
    setTimeout(() => {
      this.setState({ data: data });
      console.log('fetch favorites complete');
    }, 600);
  }

  // Start Callbacks
  componentDidMount() {
    console.log('Mount');
    // fetch all starts with Retailer
    this.fetchRetailers();
  }

  //Refreshs page and resets all state elements
  refresh = (e) => {
    this.setState({
      data: [],
      retailers: [{ name: 'loading' }],
      errorAArticle: false,
      errorAAmount: false,
      rowIndex: -1,
    });
    this.componentDidMount();
    document.getElementById('addArticle').value = '';
    document.getElementById('addAmount').value = 1;
    document.getElementById('addUnit').value = this.state.units[0].name;
  };

  // All ClickHanlder for Table
  // Toggle selected Row
  toggleSelectedRow = (data) => {
    this.state.rowIndex === data.id
      ? this.setState({ rowIndex: -1 })
      : this.setState({ rowIndex: data.id });
    this.setState({ oldData: data });
    // Allways sets state of these elements
    this.setState({
      editRetailer: data.retailerId,
      editArticle: data.article,
      editAmount: data.amount,
      editUnit: data.unit,
      errorEArticle: false,
      errorEAmount: false,
    });
  };

  // Display correct error input field
  setAddError = (article, amount) => {
    article.trim() !== ''
      ? this.setState({ errorAArticle: false })
      : this.setState({ errorAArticle: true });
    amount !== '' && amount > 0
      ? this.setState({ errorAAmount: false })
      : this.setState({ errorAAmount: true });
  };

  setEditError = (article, amount) => {
    article.trim() !== ''
      ? this.setState({ errorEArticle: false })
      : this.setState({ errorEArticle: true });
    amount !== '' && amount > 0
      ? this.setState({ errorEAmount: false })
      : this.setState({ errorEAmount: true });
  };

  // Add favorite entry
  validateAddFavorite = () => {
    const { article, amount } = this.state;
    const aAmount = Math.round(amount * 1000) / 1000;
    article.trim() !== '' && aAmount > 0
      ? this.addFavorite()
      : this.setAddError(article, aAmount);
  };

  addFavorite = () => {
    const { retailer, article, amount, unit, retailers, units } = this.state;
    console.log(retailer);
    const fav = {
      id: 3,
      retailerId: retailer,
      article,
      amount,
      unit,
      // @TODO groupId from parent component
      // groupId: this.props.groupId,
    };
    this.setAddError(article, amount);
    this.setState((prevState) => {
      const data = [...prevState.data];
      data.unshift(fav);
      return { ...prevState, data };
    });
    document.getElementById('addRetailer').value = retailers[0].id;
    document.getElementById('addArticle').value = '';
    document.getElementById('addAmount').value = 1;
    document.getElementById('addUnit').value = units[0].name;
    this.setState({
      retailer: retailers[0].id,
      article: '',
      amount: 1,
      unit: units[0].name,
    });
  };

  // Updates selected entry
  validateUpdateFavorite = (id) => {
    const { editRetailer, editArticle, editAmount, editUnit } = this.state;
    console.log(editRetailer);
    const favorite = {
      id,
      retailerId: editRetailer,
      article: editArticle,
      amount: editAmount,
      unit: editUnit,
      // @TODO groupId from parent component
      // groupId: this.props.groupId
    };
    const eAmount = Math.round(editAmount * 1000) / 1000;
    editArticle.trim() !== '' && eAmount > 0
      ? this.updateFavorite(favorite)
      : this.setEditError(editArticle, eAmount);
  };

  updateFavorite = (favorite) => {
    this.setEditError(favorite.article, favorite.amount);
    // Timout to test Async
    setTimeout(() => {
      this.setState((prevState) => {
        const data = [...prevState.data];
        data[data.indexOf(this.state.oldData)] = favorite;
        return { ...prevState, data };
      });
      this.toggleSelectedRow(favorite);
    }, 500);
  };

  // Delete selected entry
  delFavorite = (favId) => {
    console.log(favId);
    this.fetchFavorites();
  };

  render() {
    const {
      retailers,
      units,
      data,
      rowIndex,
      errorAArticle,
      errorAAmount,
      errorEArticle,
      errorEAmount,
    } = this.state;
    console.log('render');
    return (
      <React.Fragment>
        <Container maxWidth="md">
          <CssBaseline />
          {/* Refresh table content */}
          <IconButton onClick={(e) => this.refresh()}>
            <Refresh />
          </IconButton>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h4>Retailer</h4>
                </TableCell>
                <TableCell>
                  <h4>Article</h4>
                </TableCell>
                <TableCell>
                  <h4>Amount</h4>
                </TableCell>
                <TableCell>
                  <h4>Unit</h4>
                </TableCell>
                <TableCell>
                  <h4>Action</h4>
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Add new favorite row */}
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select
                    id="addRetailer"
                    retailers={retailers}
                    defaultValue={retailers[0].id}
                    onChange={(e) =>
                      this.setState({ retailer: parseInt(e.target.value) })
                    }
                  >
                    {retailers.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    name="article"
                    id="addArticle"
                    placeholder="enter article"
                    defaultValue=""
                    onChange={(e) => this.setState({ article: e.target.value })}
                    error={errorAArticle}
                  ></Input>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    name="amount"
                    id="addAmount"
                    placeholder="enter unit"
                    defaultValue="1"
                    onChange={(e) => this.setState({ amount: e.target.value })}
                    error={errorAAmount}
                  ></Input>
                </TableCell>
                <TableCell>
                  <Select
                    id="addUnit"
                    units={units}
                    defaultValue={units[0].name}
                    onChange={(e) => this.setState({ unit: e.target.value })}
                  >
                    {units.map((option) => (
                      <option key={option.name}>{option.name}</option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <AddBox onClick={this.validateAddFavorite.bind(this)} />
                  </IconButton>
                </TableCell>
              </TableRow>

              {/* Show all favorite articles of group */}
              {data.map((row) => (
                <TableRow key={row.id}>
                  {/* Retailer */}
                  <TableCell id={`${row.id} retailer`}>
                    {
                      rowIndex === row.id ? (
                        <Select
                          id="editRetailer"
                          key={row.retailerId}
                          defaultValue={row.retailerId}
                          onChange={(e) =>
                            this.setState({ editRetailer: parseInt(e.target.value) })
                          }
                        >
                          {retailers.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        // (console.log(retailers, row.retailerId),
                        // retailers.find((x) => x.id == 3).name)
                        retailers.find((x) => x.id === row.retailerId).name
                      )
                      // row.retailerId
                    }
                  </TableCell>

                  {/* Article */}
                  <TableCell id={`${row.id} article`}>
                    {rowIndex === row.id ? (
                      <Input
                        type="text"
                        name="editArticle"
                        id="editArticle"
                        placeholder="enter article"
                        defaultValue={row.article}
                        onChange={(e) => this.setState({ editArticle: e.target.value })}
                        error={errorEArticle}
                      ></Input>
                    ) : (
                      row.article
                    )}
                  </TableCell>

                  {/* Amount */}
                  <TableCell id={`${row.id} amount`}>
                    {rowIndex === row.id ? (
                      <Input
                        type="number"
                        name="editAmount"
                        id="editAmount"
                        placeholder="enter amount"
                        defaultValue={row.amount}
                        onChange={(e) => this.setState({ editAmount: e.target.value })}
                        error={errorEAmount}
                      ></Input>
                    ) : (
                      row.amount
                    )}
                  </TableCell>

                  {/* Unit */}
                  <TableCell id={`${row.id} unit`}>
                    {rowIndex === row.id ? (
                      <Select
                        id="editUnit"
                        defaultValue={row.unit}
                        onChange={(e) => this.setState({ editUnit: e.target.value })}
                      >
                        {units.map((option) => (
                          <option key={option.name}>{option.name}</option>
                        ))}
                      </Select>
                    ) : (
                      row.unit
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell id={`${row.id} id`}>
                    <IconButton id={`${row.id} btn1`}>
                      {rowIndex === row.id ? (
                        <Check onClick={this.validateUpdateFavorite.bind(this, row.id)} />
                      ) : (
                        <Edit onClick={this.toggleSelectedRow.bind(this, row)} />
                      )}
                    </IconButton>
                    <IconButton id={`${row.id} btn2`}>
                      {rowIndex === row.id ? (
                        <Clear onClick={this.toggleSelectedRow.bind(this)} />
                      ) : (
                        <Delete onClick={this.delFavorite.bind(this, row.id)} />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* End of favorite articles of group */}
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
