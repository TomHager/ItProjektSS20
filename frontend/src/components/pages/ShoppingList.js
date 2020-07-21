import { Refresh, AddBox, Delete, Edit, Save, Clear } from '@material-ui/icons';
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
 * Displays entrys for given group
 *
 * @author Tom Hager
 */

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      //passed Columns and Data loaded into state
      data: [
        {
          id: 1,
          retailer: 'Rewe',
          article: 'Apfel',
          amount: 4,
          unit: 'Kg',
        },
        {
          id: 2,
          retailer: 'Rewe',
          article: 'Birne',
          amount: 3,
          unit: 'pcs',
        },
      ],
      units: [
        { name: 'Kg' },
        { name: 'L' },
        { name: 'g' },
        { name: 'pcs' },
        { name: 'pack' },
      ],
      retailers: [
        { id: 1, name: 'Edeka' },
        { id: 2, name: 'Rewe' },
        { id: 3, name: 'Kaufland' },
        { id: 4, name: 'Test' },
      ],
      members: [
        { id: 1, name: 'Tom' },
        { id: 2, name: 'Robin' },
        { id: 3, name: 'Dimi' },
      ],
      rowIndex: -1,

      // Add entry entry
      article: '',
      amount: 1,
      unit: '',

      // Edit entry entry
      editArticle: '',
      editAmount: 1,
      editUnit: '',

      oldData: {},
    };
  }

  // Fetching all entrys for a group
  async fetchEntriess() {
    // const res = await fetch('http://DESKTOP-DU328LQ:8081/api/iKauf/entries');
    // const resjson = await res.json();
    // this.setState({ data: resjson });
    console.log('fetch complete');
  }

  // Start Callbacks
  componentDidMount() {
    // this.fetchEntriess();
    const { units } = this.state;
    this.setState({
      unit: units[0].name,
      editUnit: units[0].name,
    });
  }

  // All ClickHanlder for Table
  // Toggle selected Row
  toggleSelectedRow = (data) => {
    this.state.rowIndex === data.id
      ? this.setState({ rowIndex: -1 })
      : this.setState({ rowIndex: data.id });
    this.setState({ oldData: data });
    this.setState({
      editArticle: data.article,
      editAmount: data.amount,
      editUnit: data.unit,
    });
  };

  // Add entry entry
  startAddEntry = () => {
    const { article, amount } = this.state;
    article !== '' && (amount !== '' || parseInt(amount) < 0)
      ? this.addEntry()
      : console.log('Please fill in all details');
  };

  addEntry = () => {
    const { article, amount, unit, units } = this.state;
    const fav = { id: 3, article, amount, unit };
    console.log(this.state.addedInput);
    this.setState((prevState) => {
      const data = [...prevState.data];
      data.unshift(fav);
      return { ...prevState, data };
    });
    document.getElementById('addArticle').value = '';
    document.getElementById('addAmount').value = 1;
    document.getElementById('addUnit').value = units[0].name;
    this.setState({
      article: '',
      amount: 1,
      unit: units[0].name,
    });
  };

  // Updates selected entry
  saveEntries = (id) => {
    const { editArticle, editAmount, editUnit } = this.state;
    const entry = {
      id,
      article: editArticle,
      amount: editAmount,
      unit: editUnit,
    };
    editArticle !== '' && (editAmount !== '' || editAmount < 0)
      ? this.updateEntries(entry)
      : console.log('Please fill in all details');
  };

  updateEntries = (entry) => {
    console.log(entry);
    console.log(this.state.oldData);
    this.setState((prevState) => {
      const data = [...prevState.data];
      data[data.indexOf(this.state.oldData)] = entry;
      return { ...prevState, data };
    });
    this.toggleSelectedRow(entry);
  };

  // Delete selected entry
  delEntries = (favId) => {
    console.log(favId);
    this.fetchEntriess();
  };

  render() {
    const { retailers, members, units, data, rowIndex } = this.state;
    console.log('render');
    return (
      <React.Fragment>
        <Container maxWidth="md">
          <CssBaseline />
          <IconButton onClick={(e) => this.fetchEntriess()}>
            <Refresh />
          </IconButton>
          {/* Retailer for entries */}
          <Select
            id="selectedRetailer"
            retailers={retailers}
            defaultValue={retailers[0].name}
            onChange={(e) => this.setState({ retailers: e.target.value })}
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
                    required
                    onChange={(e) => this.setState({ article: e.target.value })}
                  ></Input>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    name="amount"
                    id="addAmount"
                    placeholder="enter unit"
                    defaultValue="1"
                    required
                    onChange={(e) => this.setState({ amount: e.target.value })}
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
                    <AddBox onClick={this.startAddEntry.bind(this)} />
                  </IconButton>
                </TableCell>
              </TableRow>

              {/* Show all entry articles of group */}
              {data.map((row) => (
                <TableRow key={row.id}>
                  {/* Bought */}
                  <TableCell>
                    <Checkbox></Checkbox>
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
                        required
                        onChange={(e) => this.setState({ editArticle: e.target.value })}
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
                        required
                        onChange={(e) => this.setState({ editAmount: e.target.value })}
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
                        <Save onClick={this.saveEntries.bind(this, row.id)} />
                      ) : (
                        <Edit onClick={this.toggleSelectedRow.bind(this, row)} />
                      )}
                    </IconButton>
                    <IconButton id={`${row.id} btn2`}>
                      {rowIndex === row.id ? (
                        <Clear onClick={this.toggleSelectedRow.bind(this)} />
                      ) : (
                        <Delete onClick={this.delEntries.bind(this, row.id)} />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* End of entry articles of group */}
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
