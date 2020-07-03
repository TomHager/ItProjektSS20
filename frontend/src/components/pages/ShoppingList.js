import { Container, CssBaseline, IconButton } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Favorite,
  FavoriteBorder,
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
  SpaceBar,
} from "@material-ui/icons";
import React, { Component } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
// import { ShoppingAPI } from '../../api'

/**
 * Displays a ShoppingList for given Data
 *
 * @author Tom Hagerw
 *
 */

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      //passed Columns and Data loaded into state
      columns: [
        {
          align: "center",
          title: "bought",
          field: "bought",
          defaultSort: "asc",
          type: "boolean",
          customSort: (a, b) => a.bought - b.bought,
          // editComponent: props => (
          //   <Checkbox
          //     type="boolean"
          //     value={props.value}
          //     onChange={e => props.onChange(!e.target.value)}
          //   />
          // ),
          render: (data) => (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlank />}
                  checkedIcon={<CheckBox />}
                  checked={data.bought}
                  onChange={(e) => (
                    (data.bought = !data.bought),
                    e,
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      return { ...prevState, data };
                    })
                  )}
                  name="boughtCheckBox"
                  color="primary"
                />
              }
            />
          ),
        },
        {
          title: "Article",
          field: "articleName",
          align: "center",
          sorting: false,
        },
        {
          title: "Amount",
          field: "entryAmount",
          type: "numeric",
          align: "center",
          sorting: false,
        },
        {
          title: "Unit",
          field: "entryUnit",
          sorting: false,
          align: "center",
          lookup: {
            1: "KG",
            2: "g",
            3: "L",
            4: "Stk",
            5: " Sack",
            6: "Karton",
            7: "Flasche",
            8: "Dose",
            9: "Bund",
            10: "m",
          },
        },
        {
          title: "Favorite     ",
          align: "center",
          field: "articleStandard",
          type: "boolean",
          sorting: false,
          render: (data) => (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={data.articleStandard}
                  onChange={(e) => (
                    (data.articleStandard = !data.articleStandard),
                    e,
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      return { ...prevState, data };
                    })
                  )}
                  name="favoriteButton"
                  color="primary"
                />
              }
            />
          ),
        },
      ],

      data: [],
    };
  }

  async fetchEntries() {
    const res = await fetch("http://desktop-du328lq:8081/api/iKauf/entry");
    const resjson = await res.json();
    this.setState({ data: resjson });
  }

  componentDidMount() {
    this.fetchEntries();
  }

  refresh() {
    this.fetchEntries();
  }
  // getEntriesHandler = (getEntries);

  // componentDidMount() {
  // this.getEntriesHandler();
  // }

  render() {
    const state = this.state;
    console.log(state.data);
    return (
      <React.Fragment>
          <Container maxWidth="sm">
          <CssBaseline />
          <IconButton
            onClick={(e) => this.refresh()}
          >
            <Refresh />
          </IconButton>
          <MaterialTable
            // MTableToolbar={{}}
            // components={{
            //   Toolbar
            // }}
            size="small"
            title="Rewe"
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
                backgroundColor: rowData.bought ? "#039be5" : "#fff",
              }),
            }}
            // onSelectionChange={(row, rowData) => {
            //   setState((prevState) => {
            //     const data = [...prevState.data];
            //     return { ...prevState, data };
            //   });
            // }}
            editable={{
              isEditable: (rowData) => rowData.bought === false,
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
