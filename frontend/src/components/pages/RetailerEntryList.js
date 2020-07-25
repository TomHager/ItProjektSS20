import {
  Refresh,
  AddBox,
  Delete,
  Edit,
  Check,
  Clear,
  Favorite,
} from '@material-ui/icons';
import React, { Component } from 'react';
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
  Checkbox,
} from '@material-ui/core';
import EntryBO from '../../api/EntryBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import firebase from 'firebase/app';

/**
 * Displays entries for selected group, shoppinglist and retailer
 *
 * @author Tom Hager
 */

export default class RetailerEntryList extends Component {
  constructor(props) {
    super(props);

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
      members: [{ name: 'loading' }],
      rowIndex: -1,

      // Add entry
      article: '',
      amount: 1,
      unit: '',

      // Edit entry
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

      // Search filter
      unfilteredData: [],
      oldFilter: '',
    };
  }
  // All Asynccallbacks

  // @TEST
  // Fetching all entrys of a RetailerShoppingList
  fetchEntries() {
    ShoppingAPI.getAPI()
      .searchEntryByShoppingListAndRetailer(
        this.props.shoppingListId,
        this.props.retailer.id
      )
      .then((result) => {
        this.setState({ data: result, unfilteredData: result });
        this.sortEntries(false);
        // start fetch Members
        this.fetchMembers();
        // console.log('fetch entries complete');
      });
  }

  // @TEST
  // Fetch all members of a group
  fetchMembers() {
    // Fetch all users of group
    ShoppingAPI.getAPI()
      .searchMembersByGroup(this.props.groupId)
      .then((membership) => {
        // Fetch all users of data warehouse
        ShoppingAPI.getAPI()
          .getUsers()
          .then((users) => {
            const members = [];
            for (let i of membership) {
              members.push(users.find((x) => x.id === i.member));
            }
            console.log(members);

            // Moves person responsible to position 0 if not already
            let index = 0;
            // check if entries in this list exist
            if (this.state.unfilteredData.length > 0) {
              // Get user responisble for entries
              index = members.findIndex(
                (obj) => obj.id === this.state.unfilteredData[0].user_id
              );
            } else {
              // Else get current user
              ShoppingAPI.getAPI()
                .searchUserByEmail(firebase.auth().currentUser.email)
                .then((returnedUser) => {
                  index = members.findIndex((obj) => obj.id === returnedUser.id);
                });
            }
            // Check if User is already in index 0
            if (index > 0) {
              this.arrayMove(members, index, 0);
            }
            // Set user state
            console.log(members);
            this.setState({ members });
          });
      });
  }

  // Move array element to a new position
  arrayMove(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  }

  // Start Callbacks
  componentDidMount() {
    const { units } = this.state;
    this.setState({
      unit: units[0].name,
      editUnit: units[0].name,
    });
    this.fetchEntries(); // Also fetches users
    // this.fetchRetailer();
  }

  // get Date as YYYY-MM-DDTHH:MM:SS
  getModDate = () => new Date().toISOString().substr(0, 19);

  //Refreshs page
  refresh = () => {
    this.setState({
      data: [],
      retailers: [{ name: 'loading' }],
      members: [{ name: 'loading' }],
      errorAArticle: false,
      errorAAmount: false,
      rowIndex: -1,
    });
    document.getElementById('addArticle').value = '';
    document.getElementById('addAmount').value = 1;
    document.getElementById('addUnit').value = this.state.units[0].name;
    document.getElementById('filter').value = '';

    this.componentDidMount();
  };

  // Sort given entries
  sortEntries = (resetSearch = true) => {
    const nData = this.state.unfilteredData;
    // Iterates through each object
    for (let i of nData) {
      // changes ISO Date to integer
      if (typeof i.modification_date === 'string') {
        i.modification_date = Date.parse(i.modification_date);
      }
    }
    // Sorts Date Integer asc
    nData.sort((a, b) => b.modification_date - a.modification_date);
    // Sorts Bought asc
    nData.sort((a, b) => a.bought - b.bought);
    this.setState({ unfilteredData: nData });
    if (resetSearch === true) {
      document.getElementById('filter').value = '';
      this.setState({ oldFilter: '' });
    }
    this.search();
    // console.log('Sorting complete');
  };

  // Search for a article in given list
  search = (req = this.state.oldFilter) => {
    this.setState({
      data: this.state.unfilteredData.filter(
        (el) => el.article.toLowerCase().indexOf(req.trim().toLowerCase()) > -1
      ),
      oldFilter: req,
    });
  };

  // @TEST
  // Adds all favorites for the given retailer
  TriggerAddFavorites = () => {
    ShoppingAPI.getAPI()
      .searchFavoriteByGroup(this.props.groupId)
      .then((result) => {
        // On Success
        const favorites = result.filter((x) => x.retailer_id === this.props.retailer.id);
        // Adds each element of the favorites array to the list
        for (let i of favorites) {
          this.addFavorite(i);
        }
        this.sortEntries();
      });
  };

  // @TEST
  // Adds favorite as entry
  addFavorite = (fav) => {
    const entry = new EntryBO();
    entry.setID(Math.floor(Math.random() * Math.floor(500))); // @TODO id should be return Update ID On Success
    entry.setArticle(fav.article);
    entry.setAmount(fav.amount);
    entry.setUnit(fav.unit);
    entry.setBought(0);
    entry.setModificationDate(this.getModDate());
    entry.setUserId(this.state.members[0].id); // member responsible
    entry.setRetailerId(this.props.retailer.id);
    entry.setShoppingListId(this.props.shoppingListId);
    entry.setGroupId(this.props.groupId);

    // Async Add
    ShoppingAPI.getAPI()
      .addEntry(entry)
      .catch((e) => {
        console.log(e);
        // On success add to unfilteredData
        this.state.unfilteredData.unshift(entry);
        this.setState({ unfilteredData: this.state.unfilteredData });
      });
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
      editArticle: data.article,
      editAmount: data.amount,
      editUnit: data.unit,
      errorEArticle: false,
      errorEAmount: false,
    });
  };

  // Toggle bought boolean
  toggleBought = (entry) => {
    // console.log('update bought');
    entry.bought === 1 ? (entry.bought = 0) : (entry.bought = 1);

    // Async update entry
    ShoppingAPI.getAPI()
      .updateEntry(entry)
      .then(() => {
        // On success
        this.setState((prevState) => {
          const unfilteredData = [...prevState.unfilteredData];
          unfilteredData[unfilteredData.indexOf(this.state.oldData)] = entry;
          return { ...prevState, unfilteredData };
        });
        this.sortEntries(false);
      });
  };

  // Display correct error input field for add
  setAddError = (article, amount) => {
    article.trim() !== ''
      ? this.setState({ errorAArticle: false })
      : this.setState({ errorAArticle: true });
    amount !== '' && amount > 0
      ? this.setState({ errorAAmount: false })
      : this.setState({ errorAAmount: true });
  };

  // Display correct error input field for edit
  setEditError = (article, amount) => {
    article.trim() !== ''
      ? this.setState({ errorEArticle: false })
      : this.setState({ errorEArticle: true });
    amount !== '' && amount > 0
      ? this.setState({ errorEAmount: false })
      : this.setState({ errorEAmount: true });
  };

  // Validate add entry
  validateAdd = () => {
    const { article, amount } = this.state;
    article.trim() !== '' && amount > 0
      ? this.addEntry()
      : this.setAddError(article, amount);
  };

  // Validate edit entry
  validateEdit = (id) => {
    const { editArticle, editAmount, editUnit, members } = this.state;
    const entry = new EntryBO();
    entry.setID(id);
    entry.setArticle(editArticle);
    entry.setAmount(editAmount);
    entry.setUnit(editUnit);
    entry.setModificationDate(this.getModDate());
    entry.setUserId(members[0].name); // Member responsible
    entry.setRetailerId(this.props.retailer.id);
    entry.setShoppingListId(this.props.shoppingListId);
    entry.setGroupId(this.props.groupId);
    entry.setBought(0);

    editArticle.trim() !== '' && editAmount > 0
      ? this.updateEntry(entry)
      : this.setEditError(editArticle, editAmount);
  };

  // @TEST
  // Add new entry
  addEntry = () => {
    const { article, amount, unit, units, members } = this.state;
    this.setAddError(article, amount); // Resets errors
    const entry = new EntryBO();
    entry.setID(Math.floor(Math.random() * Math.floor(500))); // @TODO id should be return Update ID On Success
    entry.setArticle(article);
    entry.setAmount(amount);
    entry.setUnit(unit);
    entry.setBought(0);
    entry.setModificationDate(this.getModDate());
    entry.setUserId(members[0].id); // Member responsible
    entry.setRetailerId(this.props.retailer.id);
    entry.setShoppingListId(this.props.shoppingListId);
    entry.setGroupId(this.props.groupId);

    // Async add entry
    ShoppingAPI.getAPI()
      .addEntry(entry)
      .then((result) => {
        console.log(result);
        console.log('Es geht doch');
      })
      .catch((e) => {
        console.info(e);
        // On success resets add inputs
        document.getElementById('addArticle').value = '';
        document.getElementById('addAmount').value = 1;
        document.getElementById('addUnit').value = units[0].name;
        this.setState({
          article: '',
          amount: 1,
          unit: units[0].name,
        });
        // On success add to unfilteredData
        this.state.unfilteredData.unshift(entry);
        this.setState({ unfilteredData: this.state.unfilteredData });
        this.sortEntries();
      });
  };

  // @TEST
  // Updates selected entry
  updateEntry(entry) {
    // Reset Errors
    this.setEditError(entry.article, entry.amount);

    // Async update entry
    ShoppingAPI.getAPI()
      .updateEntry(entry)
      .then(() => {
        // On success
        this.setState((prevState) => {
          const unfilteredData = [...prevState.unfilteredData];
          unfilteredData[unfilteredData.indexOf(this.state.oldData)] = entry;
          return { ...prevState, unfilteredData };
        });
        this.toggleSelectedRow(entry);
        this.sortEntries(false);
      });
  }

  // @TEST
  // Update Member
  updateMember(id) {
    console.log('start update member');
    const { unfilteredData, members } = this.state;
    this.arrayMove(
      members,
      members.findIndex((obj) => obj.id === id),
      0
    );
    for (let i of unfilteredData) {
      i.setUserId(id); // Set Member
      // Only update modification date if not bought
      if (i.bought === 0) {
        i.setModificationDate(this.getModDate());
      }

      // Async update entry
      ShoppingAPI.getAPI()
        .updateEntry(i)
        .then(() => {
          // On success
          this.setState((prevState) => {
            const unfilteredData = [...prevState.unfilteredData];
            unfilteredData[unfilteredData.indexOf(this.state.oldData)] = i;
            return { ...prevState, unfilteredData };
          });
        });
    }
    this.search();
    console.log('Updated all Members');
  }

  // @TEST
  // Delete selected entry
  delEntry = (id) => {
    const { unfilteredData } = this.state;

    // Async Delete Entry
    ShoppingAPI.getAPI()
      .deleteEntry(id)
      .then(() => {
        this.setState({
          unfilteredData: [...unfilteredData.filter((x) => x.id !== id)],
        });
        // DON'T DELETE THIS TIMOUT!
        setTimeout(() => {
          this.search();
        }, 1);
      });
  };

  render() {
    const {
      members,
      units,
      data,
      rowIndex,
      errorAArticle,
      errorAAmount,
      errorEArticle,
      errorEAmount,
    } = this.state;
    console.info('render');
    return (
      <React.Fragment>
        <Container maxWidth="md">
          <CssBaseline />

          <h3>{this.props.retailer.name}</h3>
          {/* Refresh table content */}
          <IconButton id={'refreshBtn'} onClick={(e) => this.refresh()}>
            <Refresh />
          </IconButton>
          {/* @TODO #nicetohave Retailer for entries */}
          {/* <Select
            id="selectedRetailer"
            retailers={retailers}
            defaultValue={retailers[0].name}
            //
            onChange={(e) => this.setRetailer.bind(this)}
          >
            {retailers.map((option) => (
              <option key={`${option.id} retailer`} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select> */}
          {/* Members responsible for entries */}
          <Select
            id="selectedMember"
            members={members}
            defaultValue={members[0].name}
            onChange={(e) => this.updateMember(e.target.value)}
          >
            {members.map((option) => (
              <option key={`${option.id} member`} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
          {/* Search articles */}
          <Input
            type="text"
            id="filter"
            placeholder="search article"
            defaultValue=""
            onChange={(e) => this.search(e.target.value)}
          ></Input>
          <IconButton
            id={1}
            onClick={this.TriggerAddFavorites.bind(this)}
            label="add favorites"
          >
            <Favorite />
          </IconButton>

          {/* Table start */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h4>Bought</h4>
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

            {/* Add new entry row */}
            <TableBody>
              <TableRow>
                <TableCell>
                  <Checkbox disabled></Checkbox>
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
                    <AddBox id={'addBtn'} onClick={this.validateAdd.bind(this)} />
                  </IconButton>
                </TableCell>
              </TableRow>

              {/* Show all entries of group */}
              {data.map((row) => (
                <TableRow key={row.id}>
                  {/* Bought */}
                  <TableCell>
                    <Checkbox
                      id={`${row.id} checkbox`}
                      checked={row.bought === 1 ? true : false}
                      onClick={this.toggleBought.bind(this, row)}
                    ></Checkbox>
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
                    <IconButton id={`${row.id} btn1`} disabled={row.bought === 1}>
                      {rowIndex === row.id ? (
                        <Check onClick={this.validateEdit.bind(this, row.id)} />
                      ) : (
                        <Edit onClick={this.toggleSelectedRow.bind(this, row)} />
                      )}
                    </IconButton>
                    <IconButton id={`${row.id} btn2`}>
                      {rowIndex === row.id ? (
                        <Clear onClick={this.toggleSelectedRow.bind(this)} />
                      ) : (
                        <Delete onClick={this.delEntry.bind(this, row.id)} />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* End of articles of RetailerList */}
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
