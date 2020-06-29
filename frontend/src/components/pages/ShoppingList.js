// import React, { Component } from 'react';
// import MaterialTable from 'material-table';
import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCartOutlined,
  Search,
  Delete,
  Edit,
  Save,
} from "@material-ui/icons";

// export default class ShoppingList extends Component {

//     constructor(props) {
//         super(props);

//         // Init an empty state
//         this.state = {
//           tabindex: 0,
//         };
//       }

//   render() {
//     return (

//         //   <div>
//         //    <Typography variant='h6'>DEIN Project</Typography>
//         //   <br />
//         //   <FormControlLabel
//         //     control={
//         //       <Checkbox
//         //         icon={<FavoriteBorder />}
//         //         checkedIcon={<Favorite />}
//         //         name='checkedH'
//         //       />
//         //     }
//         //   />
//         //   <FormControlLabel
//         //   control={<Checkbox name='checkedA' />}
//         // />
//         //   <Button name='AddEntry'>
//         //     <AddShoppingCartOutlined />
//         //   </Button>
//         //   <Typography>Writen by NULL</Typography>
//         //   </div>
//     );
//   }
// }

import React from "react";
import MaterialTable from "material-table";

export default function ShoppingList() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Article", field: "articleName" },
      {
        title: "Amount",
        field: "entryAmount",
        type: "numeric",
        // cellStyle: {
        //   backgroundColor: "#039be5",
        //   color: "#FFF",
        // },
        // headerStyle: {
        //   backgroundColor: "#FFF",
        // },
      },
      {
        title: "Unit",
        field: "entryUnit",
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
      // { title: "Favorite", field: "Favorite", type: "Button" },
    ],
    data: [
      {
        id: 1,
        marked: false,
        articleName: "Apfel",
        entryAmount: "26",
        entryUnit: "KG",
      },
      {
        id: 2,
        marked: false,
        articleName: "Birne",
        entryAmount: "3",
        entryUnit: "Stk",
      },
    ],
  });

  return (
    <div>
      <MaterialTable
        title="Rewe"
        columns={state.columns}
        data={state.data}
        icons={{
          Add: AddShoppingCartOutlined,
          Search: Search,
          Delete: Delete,
          Edit: Edit,
          Save: Save,
        }}
        options={{
          selection: true,
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          rowStyle: (rowData) => ({
            backgroundColor: rowData.marked ? "#039be5" : "#fff",
          }),
        }}
        onSelectionChange={(row, rowData) => {
          rowData.marked = !rowData.marked;
          setState(Object.assign({}, state));
        }}
        
        editable={{
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
      <Typography variant="h6">Fav Icon</Typography>
      <br />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="checkedH"
          />
        }
      />
      <MaterialTable
        title="Edeka"
        columns={state.columns}
        data={state.data}
        icons={{
          Add: AddShoppingCartOutlined,
          Search: Search,
          Delete: Delete,
          Edit: Edit,
          Save: Save,
        }}
        options={{
          selection: true,
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          rowStyle: (rowData) => ({
            backgroundColor: rowData.marked ? "#fff" : "#039be5",
          }),
        }}
        onSelectionChange={(row, rowData) => {
          rowData.marked = !rowData.marked;
          // console.log(options.length);
          // setState({})
        }}
        editable={{
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
    </div>
  );
}
