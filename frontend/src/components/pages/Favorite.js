import { Container, CssBaseline, IconButton } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  AddShoppingCartOutlined,
  Search,
  Delete,
  Edit,
  LastPage,
  FirstPage,
  ArrowBackIos,
  ArrowForwardIos,
  Clear,
  Done,
  CheckBox,
  CheckBoxOutlineBlank,
  MoreVert,
  ArrowUpward,
  Refresh,
} from '@material-ui/icons';
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import ShoppingAPI from '../../api/ShoppingAPI';
import { addEntry } from '../../actions/shoppingList';
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

      data: [],

      members: [
        {
          member: 'Tom',
        },
        {
          member: 'Klaus',
        },
      ],
      retailerName: 'Default',
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
    const state = this.state;
    return (
      <React.Fragment>
        <Container maxWidth="md">
          <CssBaseline />
          <IconButton onClick={(e) => this.fetchEntries()}>
            <Refresh />
          </IconButton>
          {/* {this.memberButton()} */}
          <MaterialTable
            title={state.retailerName}
            columns={state.columns}
            data={state.data}
            icons={{
              Add: AddShoppingCartOutlined,
              Search: Search,
              Delete: Delete,
              Edit: Edit,
              FirstPage: FirstPage,
              LastPage: LastPage,
              PreviousPage: ArrowBackIos,
              NextPage: ArrowForwardIos,
              Clear: Clear,
              ResetSearch: Clear,
              Check: Done,
              ViewColumn: MoreVert,
              SortArrow: ArrowUpward,
            }}
            options={{
              columnsButton: true,
              actionsColumnIndex: -1,
              // selection: true,
              showSelectAllCheckbox: false,
              showTextRowsSelected: false,
              sorting: true,
              rowStyle: (rowData) => ({
                backgroundColor: rowData.modificationDate != null ? '#039be5' : '#fff',
              }),
            }}
            // onSelectionChange={(row, rowData) => {
            //   setState((prevState) => {
            //     const data = [...prevState.data];
            //     return { ...prevState, data };
            //   });
            // }}
            editable={{
              isEditable: (rowData) => rowData.modificationDate == null,
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                // new Promise((this.updateEntry(oldData))
                // new Promise(this.fetchEntries()),
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      this.setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        </Container>
      </React.Fragment>
    );
  }
}
