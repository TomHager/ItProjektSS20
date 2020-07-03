import { Container, CssBaseline } from "@material-ui/core";
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
} from "@material-ui/icons";
import React from "react";
import MaterialTable from "material-table";

/**
 * Displays a ShoppingList for given Data 
 * 
 * @author Tom Hager
 * 
 */

export default function ShoppingList() {
  const [state, setState] = React.useState({
    //passed Columns and Data loaded into state
    columns: [
      {
        align: "center",
        title: "bought",
        field: "bought",
        defaultSort: "asc",
        type: "boolean",
        customSort: (a,b) => a.bought - b.bought,
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
                  setState((prevState) => {
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
      { title: "Article", field: "articleName", align: "center", sorting: false },
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
        }, //
      },
      {
        title: "Favorite     ",
        align: "center",
        field: "favorite",
        type: "boolean",
        sorting: false,
        render: (data) => (
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={data.favorite}
                onChange={(e) => (
                  (data.favorite = !data.favorite),
                  e,
                  setState((prevState) => {
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

    // TODO: Connect Back-End for Data
    data: [
      {
        id: 1,
        bought: false,
        favorite: false,
        articleName: "Apfel",
        entryAmount: "26",
        entryUnit: "1",
      },
      {
        id: 2,
        bought: true,
        favorite: true,
        articleName: "Birne",
        entryAmount: "3",
        entryUnit: "3",
      },
      {
        id: 1,
        bought: false,
        favorite: false,
        articleName: "Apfel",
        entryAmount: "26",
        entryUnit: "1",
      },
      {
        id: 2,
        bought: true,
        favorite: true,
        articleName: "Birne",
        entryAmount: "3",
        entryUnit: "3",
      },
    ],
  });

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="sm">
        <MaterialTable
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
            isEditable: rowData => rowData.bought === false,
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
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
                    setState((prevState) => {
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
                  setState((prevState) => {
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
