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
  Checkbox,
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
      members: [{ name: 'loading' }],
      rowIndex: -1,

      // Add favorite entry
      article: '',
      amount: 1,
      unit: '',

      // Edit favorite entry
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

  // All Asynccallbacks

  // Fetching all entrys of a RetailerShoppingList
  fetchEntries() {
    // const res = await fetch('http://DESKTOP-DU328LQ:8081/api/iKauf/entries');
    // const resjson = await res.json();
    // this.setState({ data: resjson });
    const data = [
      {
        id: 1,
        amount: 4,
        unit: 'Kg',
        article: 'Apfel',
        modificationDate: Date.now(),
        shoppingListId: 1,
        userId: 1,
        retailerId: 1,
        bought: false,
      },
      {
        id: 2,
        amount: 3,
        unit: 'pcs',
        article: 'Birne',
        modificationDate: Date.now(),
        shoppingListId: 1,
        userId: 1,
        retailerId: 2,
        bought: true,
      },
      {
        id: 3,
        amount: 6,
        unit: 'g',
        article: 'Ananas',
        modificationDate: Date.now(),
        shoppingListId: 1,
        userId: 1,
        retailerId: 2,
        bought: false,
      },
    ];
    setTimeout(() => {
      this.setState({ data: data });
      console.log('fetch entries complete');
    }, 1000);
  }

  // Fetch all retailer of a group
  fetchRetailer() {
    const retailers = [
      { id: 1, name: 'Edeka' },
      { id: 2, name: 'Rewe' },
      { id: 3, name: 'Kaufland' },
      { id: 4, name: 'Test' },
    ];
    setTimeout(() => {
      this.setState({ retailers: retailers });
      console.log('fetch retailers complete');
    }, 1000);
  }

  // Fetch all members of a group
  fetchMembers() {
    const members = [
      { id: 1, name: 'Tom' },
      { id: 2, name: 'Robin' },
      { id: 3, name: 'Dimi' },
    ];
    setTimeout(() => {
      this.setState({ members: members });
      console.log('fetch members complete');
    }, 1000);
  }

  // Start Callbacks
  componentDidMount() {
    this.fetchEntries();
    this.fetchRetailer();
    this.fetchMembers();
    const { units } = this.state;
    this.setState({
      unit: units[0].name,
      editUnit: units[0].name,
    });
  }
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
    this.componentDidMount();
    document.getElementById('addArticle').value = '';
    document.getElementById('addAmount').value = 1;
    document.getElementById('addUnit').value = this.state.units[0].name;
  };
  // @TODO Search

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
    let {
      id,
      unit,
      amount,
      article,
      modificationDate,
      shoppingListId,
      userId,
      retailerId,
      bought,
    } = entry;
    if (bought === 1) {
      bought = 0;
    }
    const nEntry = {
      id,
      unit,
      amount,
      article,
      modificationDate,
      shoppingListId,
      userId,
      retailerId,
      bought,
    };
    this.updateEntry(nEntry);
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
    console.log(amount);
    article.trim() !== '' && amount !== '' && amount > 0
      ? this.addEntry()
      : this.setAddError(article, amount);
  };

  // Validate edit entry
  validateEdit = (id) => {
    const { editRetailer, editArticle, editAmount, editUnit } = this.state;
    const entry = {
      id,
      retailer: editRetailer,
      article: editArticle,
      amount: editAmount,
      unit: editUnit,
    };
    editArticle.trim() !== '' && editAmount !== '' && editAmount > 0
      ? this.editEntry(entry)
      : this.setEditError(editArticle, editAmount);
  };

  // Update edited entry
  editEntry = (entry) => {
    this.setEditError(entry.article, entry.amount);
    this.updateEntry(entry);
    console.log('Triggered Edit Event');
  };

  // Add method
  // Add new entry
  // @TODO Async add entry
  addEntry() {
    const { retailer, article, amount, unit, retailers, units } = this.state;
    const entry = { id: 3, retailer, article, amount, unit };
    this.setAddError(article, amount);
    console.log(this.state.addedInput);
    this.setState((prevState) => {
      const data = [...prevState.data];
      data.unshift(entry);
      return { ...prevState, data };
    });
    document.getElementById('addArticle').value = '';
    document.getElementById('addAmount').value = 1;
    document.getElementById('addUnit').value = units[0].name;
    this.setState({
      retailer: retailers[0].name,
      article: '',
      amount: 1,
      unit: units[0].name,
    });
  }

  // Update method
  // Updates selected entry
  updateEntry(entry) {
    setTimeout(() => {
      this.setState((prevState) => {
        const data = [...prevState.data];
        data[data.indexOf(this.state.oldData)] = entry;
        return { ...prevState, data };
      });
      this.toggleSelectedRow(entry);
      this.state.rowIndex === entry.id
        ? this.toggleSelectedRow(entry)
        : // setState for false missing
          console.log('Triggered Update Event');
    }, 1000);
  }

  // Delete selected entry
  delFavorite = (id) => {
    console.log(id);
    this.fetchEntries();
  };

  render() {
    const {
      retailers,
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
          {/* Refresh table content */}
          <IconButton onClick={(e) => this.refresh()}>
            <Refresh />
          </IconButton>
          {/* Retailer for entries */}
          <Select
            id="selectedRetailer"
            retailers={retailers}
            defaultValue={retailers[0].name}
            //
            onChange={(e) => this.setRetailer.bind(this)}
          >
            {retailers.map((option) => (
              <option key={option.id}>{option.name}</option>
            ))}
          </Select>
          {/* Members responsible for entries */}
          <Select
            id="selectedMember"
            members={members}
            defaultValue={members[0].name}
            onChange={(e) => this.setState({ members: e.target.value })}
          >
            {members.map((option) => (
              <option key={option.id}>{option.name}</option>
            ))}
          </Select>
          <Input
            type="text"
            id="filter"
            placeholder="search article"
            defaultValue=""
          ></Input>

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

            {/* Add new favorite row */}
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
                    <AddBox onClick={this.validateAdd.bind(this)} />
                  </IconButton>
                </TableCell>
              </TableRow>

              {/* Show all entries of group */}
              {data.map((row) => (
                <TableRow key={row.id}>
                  {/* Bought */}
                  <TableCell>
                    <Checkbox onClick={this.toggleBought(row)}></Checkbox>
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
                        <Check onClick={this.validateEdit.bind(this, row.id)} />
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
