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
import FavoriteBO from '../../api/FavoriteBO';
// import RetailerBO from '../../api/RetailerBO';
import ShoppingAPI from '../../api/ShoppingAPI';

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

      //
      unfilteredData: [],
    };
  }

  // @TEST
  // Fetch all retailer for given group
  fetchRetailers() {
    // Fetch all retailer for group
    ShoppingAPI.getAPI()
      .searchRetailerMemberByGroup(2)
      .then((membership) => {
        // Fetch all retailers of data warehouse
        ShoppingAPI.getAPI()
          .getRetailers()
          .then((allRetailers) => {
            const retailers = [];
            for (let i of membership) {
              retailers.push(allRetailers.find((x) => x.id === i.retailer_member));
            }
            console.log(retailers);

            // On success
            // setState before fetchfavorites because we need retailers in state
            this.setState({
              retailers,
              retailer: retailers[0].id,
              editRetailer: retailers[0].id,
              unit: this.state.units[0].name,
              editUnit: this.state.units[0].name,
            });
            // Fetch favorites after because they rely on retailer names
            this.fetchFavorites();
          });
      });
  }

  // @TEST
  // Fetching all favorites for a group
  fetchFavorites() {
    // Get all  favorites for group
    ShoppingAPI.getAPI()
      // @TODO
      // .searchFavoriteByGroup(this.props.groupId)
      .searchFavoriteByGroup(2)
      .then((data) => {
        this.setState({ data: data.sort((a, b) => b.id - a.id), unfilteredData: data });
      });
    // console.log('fetch favorites complete');
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

  // Search by article name
  search = (req) => {
    this.setState({
      data: this.state.unfilteredData.filter(
        (el) => el.article.toLowerCase().indexOf(req.trim().toLowerCase()) > -1
      ),
    });
  };

  // Resets search
  resetSearch = () => {
    console.log(this.state.unfilteredData);
    document.getElementById('filter').value = '';
    this.search('');
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
      editRetailer: data.retailer_id,
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
    amount > 0
      ? this.setState({ errorAAmount: false })
      : this.setState({ errorAAmount: true });
  };

  setEditError = (article, amount) => {
    article.trim() !== ''
      ? this.setState({ errorEArticle: false })
      : this.setState({ errorEArticle: true });
    amount > 0
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

  // @TEST
  // Add new favorite
  addFavorite = () => {
    const { retailer, article, amount, unit, retailers, units } = this.state;
    this.setAddError(article, amount); // Resets errors
    // @TODO fav should be respons of Async Add
    const fav = new FavoriteBO();
    fav.setID(Math.floor(Math.random() * Math.floor(500)));
    fav.setArticle(article);
    fav.setAmount(amount);
    fav.setUnit(unit);
    fav.setRetailerID(retailer);
    fav.setGroupID(2);
    // @TODO groupId from parent component
    // groupId: this.props.groupId,

    // Async Update Favorite
    ShoppingAPI.getAPI()
      .updateFavorite(fav)
      .then(() => {
        // On success reset inputs
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
        // On success add to unfilteredData
        this.state.unfilteredData.unshift(fav);
        this.setState({ unfilteredData: this.state.unfilteredData });
        this.resetSearch();
      });
  };

  // Updates selected entry
  validateUpdateFavorite = (id) => {
    const { editRetailer, editArticle, editAmount, editUnit } = this.state;
    const eAmount = Math.round(editAmount * 1000) / 1000;
    const fav = new FavoriteBO();
    fav.setID(id);
    fav.setArticle(editArticle);
    fav.setAmount(eAmount);
    fav.setUnit(editUnit);
    fav.setRetailerID(editRetailer);
    fav.setGroupID(2);
    // @TODO groupId from parent component
    // groupId: this.props.groupId

    editArticle.trim() !== '' && eAmount > 0
      ? this.updateFavorite(fav)
      : this.setEditError(editArticle, eAmount);
  };

  // @TEST
  // Update Favorite
  updateFavorite = (favorite) => {
    this.setEditError(favorite.article, favorite.amount);
    // Async update favorite
    ShoppingAPI.getAPI()
      .updateFavorite(favorite)
      .then(() => {
        // On success
        this.setState((prevState) => {
          const unfilteredData = [...prevState.unfilteredData];
          unfilteredData[unfilteredData.indexOf(this.state.oldData)] = favorite;
          return { ...prevState, unfilteredData };
        });
        this.toggleSelectedRow(favorite);
        this.resetSearch();
      });
  };

  // @TEST
  // Delete selected entry
  delFavorite = (id) => {
    const { unfilteredData } = this.state;
    //Async Delete Favorite
    ShoppingAPI.getAPI()
      .deleteFavorite(id)
      .then(() => {
        // On success
        this.setState({
          unfilteredData: [...unfilteredData.filter((x) => x.id !== id)],
        });
        // DON'T DELETE THIS TIMOUT!
        setTimeout(() => {
          this.resetSearch();
        }, 1);
      });
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
          <IconButton>
            <Refresh onClick={(e) => this.refresh()} />
          </IconButton>
          {/* Search articles */}
          <Input
            type="text"
            id="filter"
            placeholder="search article"
            defaultValue=""
            onChange={(e) => this.search(e.target.value)}
          ></Input>

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
                      <option key={`ed ${option.id}`} value={option.id}>
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
                      <option key={`un ${option.name}`}>{option.name}</option>
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
                    {rowIndex === row.id ? (
                      <Select
                        id="editRetailer"
                        key={row.retailer_id}
                        defaultValue={row.retailer_id}
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
                      retailers.find((x) => x.id === row.retailer_id).name
                    )}
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
