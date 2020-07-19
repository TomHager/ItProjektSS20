import { Refresh, AddBox, Delete, Edit, Save, Clear } from '@material-ui/icons';
import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import { addEntry } from '../../actions/shoppingList';
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
 * Displays a ShoppingList for given Data
 *
 * @author Tom Hager
 */

export default class Favorite extends Component {
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
      unit: [
        {
          name: 'Kg',
        },
        {
          name: 'L',
        },
        {
          name: 'g',
        },
        {
          name: 'pcs',
        },
        {
          name: 'pack',
        },
      ],
      members: [
        {
          member: 'Tom',
        },
        {
          member: 'Klaus',
        },
      ],
      retailer: [
        {
          id: 1,
          name: 'Edeka',
        },
        {
          id: 2,
          name: 'Rewe',
        },
        {
          id: 3,
          name: 'Kaufland',
        },
        {
          id: 4,
          name: 'Test',
        },
      ],
      rowIndex: -1,
    };
    const onChange = (e) =>
      this.setState({ ...this.state, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
      e.preventDefault();
      // if (...) {
      // } else {
      addEntry(this.state.data);
      // }
    };
  }

  setModDate = (date) => (date == null ? (date = Date.now()) : (date = null));

  async fetchFavorites() {
    const res = await fetch('http://DESKTOP-DU328LQ:8081/api/iKauf/entries');
    const resjson = await res.json();
    this.setState({ data: resjson });
    await console.log('fetch complete');
  }

  componentDidMount() {
    this.fetchFavorites();
    console.log('MOUNT Fav');
  }

  /** Updates the entry */
  async updateEntry(newData) {
    ShoppingAPI.getAPI().updateEntry(newData);
    this.fetchFavorites();
  }

  handleChange = (e) => {
    let selectedValue = e.target.value;
    this.state.members.onSelectChange(selectedValue);
    // console.log(e.taget.value)
  };

  delFavorite = (favId) => {
    this.fetchFavorites();
  };

  editFavorite = (favorite) => {
    this.setState({ rowIndex: favorite.id });
  };

  render() {
    const { retailer, unit, data, rowIndex } = this.state;
    console.log('FAV');
    return (
      <React.Fragment>
        <Container maxWidth="md">
          <CssBaseline />
          <IconButton onClick={(e) => this.fetchFavorites()}>
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

            {/* Add new Favorite Row */}
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select id="retailer" retailer={retailer}>
                    {retailer.map((option) => (
                      <option key={option.id}>{option.name}</option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    name="article"
                    id="article"
                    placeholder="enter article"
                    required
                  ></Input>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="enter unit"
                    defaultValue="1"
                    required
                  ></Input>
                </TableCell>
                <TableCell>
                  <Select id="unit" unit={unit}>
                    {unit.map((option) => (
                      <option key={option.name}>{option.name}</option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <AddBox />
                  </IconButton>
                </TableCell>
              </TableRow>

              {/* Show all favorite articles of group */}
              {data.map((row) => (
                <TableRow key={row.id}>
                  {/* Retailer */}
                  <TableCell id={`${row.id} retailer`}>
                    {rowIndex === row.id ? (
                      <Select id="editRetailer" defaultValue={row.retailer}>
                        {retailer.map((option) => (
                          <option key={option.id}>{option.name}</option>
                        ))}
                      </Select>
                    ) : (
                      row.retailer
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
                        required
                      ></Input>
                    ) : (
                      row.article
                    )}{' '}
                  </TableCell>

                  {/* Amount */}
                  <TableCell id={`${row.id} amount`}>
                    {rowIndex === row.id ? (
                      <Input
                        type="number"
                        name="editAmount"
                        id="editAmount"
                        placeholder="enter amount"
                        helperText="no negative number"
                        defaultValue={row.amount}
                        required
                      ></Input>
                    ) : (
                      row.amount
                    )}
                  </TableCell>

                  {/* Unit */}
                  <TableCell id={`${row.id} unit`}>
                    {rowIndex === row.id ? (
                      <Select id="unit" defaultValue={row.unit}>
                        {unit.map((option) => (
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
                        <Save onClick={this.editFavorite.bind(this, row)} />
                      ) : (
                        <Edit onClick={this.editFavorite.bind(this, row)} />
                      )}
                    </IconButton>
                    <IconButton id={`${row.id} btn2`}>
                      {rowIndex === row.id ? (
                        <Clear onClick={this.editFavorite.bind(this, row)} />
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
