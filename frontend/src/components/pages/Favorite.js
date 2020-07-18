import {
  Refresh,
  AddBox,
  Delete,
  Edit,
} from '@material-ui/icons';
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
      columns: [
        {
            title: "Retailer",
            field: "retailer",
            align: "center",
            
        },
        {
          title: 'Article',
          field: 'name',
          align: 'center',
        },
        {
          title: 'Amount',
          field: 'amount',
          type: 'numeric',
          align: 'center',
          editComponent: (props) => (
            // editComponent: (onChange()) => (
            //   validity.valid||(props='')
            // )
            // onChange = (props) => (validity.valid||(props=''))
            <input
              name="amount"
              type="number"
              value={this.state.data.entryAmount}
              min="0"
              oninput="validity.valid||(value='');"
            />
          ),
        },
        {
          title: 'Unit',
          field: 'unit',
          align: 'center',
          lookup: {
            1: 'KG',
            2: 'g',
            3: 'L',
            4: 'Stk',
            5: ' Sack',
            6: 'Karton',
            7: 'Flasche',
            8: 'Dose',
            9: 'Bund',
            10: 'm',
          },
        },
      ],

      data: [
        {
          id: 1,
          retailer: "Rewe",
          article: "Apfel",
          amount: 4,
          unit: "Kg",
        }, {
          id: 2,
          retailer: "Rewe",
          article: "Birne",
          amount: 3,
          unit: "Kg",
        }
      ],
      unit: [
        {
          name: "Kg",
      }, {
        name: "g",
      }, {
        name: "pcs",
      }, {
        name: "pack"
      }

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
          name: "Edeka",
        }, {
          id: 2,
          name: "Rewe",
        }, {
          id: 3,
          name: "Kaufland"
        }, {
          id: 4,
          name: "Test"
        }
      ],
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

  async fetchEntries() {
    const res = await fetch('http://DESKTOP-DU328LQ:8081/api/iKauf/entries');
    const resjson = await res.json();
    this.setState({ data: resjson });
    await console.log('fetch complete');
  }

  componentDidMount() {
    this.fetchEntries();
    console.log('MOUNT');
  }

  /** Updates the entry */
  async updateEntry(newData) {
    ShoppingAPI.getAPI().updateEntry(newData);
    this.fetchEntries();
  }

  handleChange = (e) => {
    let selectedValue = e.target.value;
    this.state.members.onSelectChange(selectedValue);
    // console.log(e.taget.value)
  };
  // memberButton = () => {
  //   this.MakeItem = function(X) {
  //     return <MenuItem >{X}</MenuItem >;
  //   }
  //   return(
  //     <Select
  //       value={this.state.members}
  //     >
  //       {this.state.members.map(this.MakeItem)};
  //     </Select>
  //   )
  //   let members = this.state.members;
  //   let options = members.map((data) =>
  //       <option
  //           key={data.member}
  //           value={data.member}
  //       >
  //           {data.member}
  //       </option>
  //   );
  //   return (

  //     <select name="memberList" onChange={this.handleChange}>
  //         <option>Select Responsible</option>
  //         {options}
  //    </select>
  //   )
  // }

  render() {
    const {retailer, unit, data} = this.state;
    console.log("FAV")
    return (
      <React.Fragment>
        <Container maxWidth="md">
          <CssBaseline />
          <IconButton onClick={(e) => this.fetchEntries()}>
            <Refresh />
          </IconButton>

          <Table size="small">

            <TableHead>
              <TableRow>
                <TableCell><h4>Retailer</h4></TableCell>
                <TableCell><h4>Article</h4></TableCell>
                <TableCell><h4>Amount</h4></TableCell>
                <TableCell><h4>Unit</h4></TableCell>
                <TableCell><h4>Action</h4></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
              <TableCell>
                <Select id="retailer" retailer ={this.state.retailer}>
              {retailer.map((option) => (
                  <option key={option.id}>{option.name}</option>
                  ))}
                </Select>
                </TableCell>
                <TableCell>
                  <Input type="text" name="article" id="article" placeholder="enter article"></Input>
                </TableCell>
                <TableCell>
                  <Input type="text" name="amount" id="amount" placeholder="enter unit"></Input>
                </TableCell>
                <TableCell>
                <Select id="unit" unit ={this.state.unit}>
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

              {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.retailer}</TableCell>
              <TableCell>{row.article}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell><IconButton><Edit></Edit></IconButton><IconButton><Delete></Delete></IconButton></TableCell>
              </TableRow>
                  ))}
            </TableBody>

          </Table>

        </Container>
      </React.Fragment>
    );
  }
}
