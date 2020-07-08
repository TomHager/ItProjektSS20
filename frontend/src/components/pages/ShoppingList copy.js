// // import { Container, CssBaseline } from "@material-ui/core";
// // import Checkbox from "@material-ui/core/Checkbox";
// // import FormControlLabel from "@material-ui/core/FormControlLabel";
// // import {
// //   Favorite,
// //   FavoriteBorder,
// //   AddShoppingCartOutlined,
// //   Search,
// //   Delete,
// //   Edit,
// //   LastPage,
// //   FirstPage,
// //   ArrowBackIos,
// //   ArrowForwardIos,
// //   Clear,
// //   Done,
// //   CheckBox,
// //   CheckBoxOutlineBlank,
// //   MoreVert,
// //   ArrowUpward,
// // } from "@material-ui/icons";
// // import React from "react";
// // import MaterialTable from "material-table";

// // /**
// //  * Displays a ShoppingList for given Data 
// //  * 
// //  * @author Tom Hager
// //  * 
// //  */

// // export default function ShoppingList() {
// //   const [state, setState] = React.useState({
// //     //passed Columns and Data loaded into state
// //     columns: [
// //       {
// //         align: "center",
// //         title: "bought",
// //         field: "bought",
// //         defaultSort: "asc",
// //         type: "boolean",
// //         customSort: (a,b) => a.bought - b.bought,
// //         // editComponent: props => (
// //         //   <Checkbox
// //         //     type="boolean"
// //         //     value={props.value}
// //         //     onChange={e => props.onChange(!e.target.value)}
// //         //   />
// //         // ),
// //         render: (data) => (
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 icon={<CheckBoxOutlineBlank />}
// //                 checkedIcon={<CheckBox />}
// //                 checked={data.bought}
// //                 onChange={(e) => (
// //                   (data.bought = !data.bought),
// //                   e,
// //                   setState((prevState) => {
// //                     const data = [...prevState.data];
// //                     return { ...prevState, data };
// //                   })
// //                 )}
// //                 name="boughtCheckBox"
// //                 color="primary"
// //               />
// //             }
// //           />
// //         ),
// //       },
// //       { title: "Article", field: "articleName", align: "center", sorting: false },
// //       {
// //         title: "Amount",
// //         field: "entryAmount",
// //         type: "numeric",
// //         align: "center",
// //         sorting: false,
// //       },
// //       {
// //         title: "Unit",
// //         field: "entryUnit",
// //         sorting: false,
// //         align: "center",
// //         lookup: {
// //           1: "KG",
// //           2: "g",
// //           3: "L",
// //           4: "Stk",
// //           5: " Sack",
// //           6: "Karton",
// //           7: "Flasche",
// //           8: "Dose",
// //           9: "Bund",
// //           10: "m",
// //         }, //
// //       },
// //       {
// //         title: "Favorite     ",
// //         align: "center",
// //         field: "favorite",
// //         type: "boolean",
// //         sorting: false,
// //         render: (data) => (
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 icon={<FavoriteBorder />}
// //                 checkedIcon={<Favorite />}
// //                 checked={data.favorite}
// //                 onChange={(e) => (
// //                   (data.favorite = !data.favorite),
// //                   e,
// //                   setState((prevState) => {
// //                     const data = [...prevState.data];
// //                     return { ...prevState, data };
// //                   })
// //                 )}
// //                 name="favoriteButton"
// //                 color="primary"
// //               />
// //             }
// //           />
// //         ),
// //       },
// //     ],

// //     // TODO: Connect Back-End for Data
// //     data: [
// //       {
// //         id: 1,
// //         bought: false,
// //         favorite: false,
// //         articleName: "Apfel",
// //         entryAmount: "26",
// //         entryUnit: "1",
// //       },
// //       {
// //         id: 2,
// //         bought: true,
// //         favorite: true,
// //         articleName: "Birne",
// //         entryAmount: "3",
// //         entryUnit: "3",
// //       },
// //       {
// //         id: 1,
// //         bought: false,
// //         favorite: false,
// //         articleName: "Apfel",
// //         entryAmount: "26",
// //         entryUnit: "1",
// //       },
// //       {
// //         id: 2,
// //         bought: true,
// //         favorite: true,
// //         articleName: "Birne",
// //         entryAmount: "3",
// //         entryUnit: "3",
// //       },
// //     ],
// //   });

// //   // fetchEntry(() => {
// //   //   const fetchData = async () => {
// //   //     const result = await fetch(
// //   //       'http://desktop-j5f6l70:8081/api/iKauf/entry',
// //   //     );

// //   //     setState(result.state.data);
// //   //   };

// //   //   fetchData();
// //   // }, []);

/** Updates the entry */
// updateEntry = (newData) => {
//     ShoppingAPI.getAPI().updateEntry(newData);
//     this.refresh()
//   }
    // clone the original cutomer, in case the backend call fails
    // let updatedEntry = Object.assign(new EntryBO(), oldData);
    // set the new attributes from our dialog
    // updatedEntry.setBought(newData.bought);
    // updatedEntry.setUnit(newData.unit);
    // updatedEntry.setAmount(newData.amount);
    // updatedEntry.setArticleId(newData.articleId);
    // updatedEntry.setArticleName(newData.articleName);
    // updatedEntry.setArticleStandard(newData.articleStandard);
    // updatedEntry.setModificationDate(newData.modificationDate);
    // ShoppingAPI.getAPI().updateEntry(newData).then(entry => {
    //   this.setState({
        // updatingInProgress: false,              // disable loading indicator  
        // updatingError: null                     // no error message
      //   refresh();
      // });
      // // keep the new state as base state
      // this.baseState.bought = this.state.data.bought;
      // this.baseState.unit = this.state.data.unit;
      // this.baseState.amount = this.state.data.amount;
      // this.baseState.articleName = this.state.data.articleName;
      // this.baseState.articleStandard = this.state.data.articleStandard;
      // this.baseState.modificationDate = this.state.data.modificationDate;
      // this.props.onClose(updatedEntry);      // call the parent with the new entry
    // }).catch(e =>
    //   this.setState({
        // updatingInProgress: false,              // disable loading indicator 
        // updatingError: e                        // show error message
      //   refresh()
      // })
    // );
    // set loading to true
    // this.setState({
    //   updatingInProgress: true,                 // show loading indicator
    //   updatingError: null                       // disable error message
    // });
  // }

// //   // TODO: select resposible shopper DropDown
// //   return (
// //     <React.Fragment>
// //       <CssBaseline />

// //       <Container maxWidth="sm">
// //         <MaterialTable 
// //           size="small"
// //           title="Rewe"
// //           columns={state.columns}
// //           data={state.data}
// //           icons={{
// //             Add: AddShoppingCartOutlined,
// //             Search: Search,
// //             Delete: Delete,
// //             Edit: Edit,
// //             FirstPage: FirstPage,
// //             LastPage: LastPage,
// //             PreviousPage: ArrowBackIos,
// //             NextPage: ArrowForwardIos,
// //             Clear: Clear,
// //             ResetSearch: Clear,
// //             Check: Done,
// //             ViewColumn: MoreVert,
// //             SortArrow: ArrowUpward,
// //           }}
// //           options={{
// //             columnsButton: true,
// //             actionsColumnIndex: -1,
// //             // selection: true,
// //             showSelectAllCheckbox: false,
// //             showTextRowsSelected: false,
// //             sorting: true,
// //             rowStyle: (rowData) => ({
// //               backgroundColor: rowData.bought ? "#039be5" : "#fff",
// //             }),
// //           }}
// //           // onSelectionChange={(row, rowData) => {
// //           //   setState((prevState) => {
// //           //     const data = [...prevState.data];
// //           //     return { ...prevState, data };
// //           //   });
// //           // }}
// //           editable={{
// //             isEditable: rowData => rowData.bought === false,
// //             onRowAdd: (newData) =>
// //               new Promise((resolve) => {
// //                 setTimeout(() => {
// //                   resolve();
// //                   setState((prevState) => {
// //                     const data = [...prevState.data];
// //                     data.push(newData);
// //                     return { ...prevState, data };
// //                   });
// //                 }, 600);
// //               }),
// //             onRowUpdate: (newData, oldData) =>
// //               new Promise((resolve) => {
// //                 setTimeout(() => {
// //                   resolve();
// //                   if (oldData) {
// //                     setState((prevState) => {
// //                       const data = [...prevState.data];
// //                       data[data.indexOf(oldData)] = newData;
// //                       return { ...prevState, data };
// //                     });
// //                   }
// //                 }, 600);
// //               }),
// //             onRowDelete: (oldData) =>
// //               new Promise((resolve) => {
// //                 setTimeout(() => {
// //                   resolve();
// //                   setState((prevState) => {
// //                     const data = [...prevState.data];
// //                     data.splice(data.indexOf(oldData), 1);
// //                     return { ...prevState, data };
// //                   });
// //                 }, 600);
// //               }),
// //           }}
// //         />
// //       </Container>
// //     </React.Fragment>
// //   );
// // }
// import { Container, CssBaseline } from "@material-ui/core";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import {
//   Favorite,
//   FavoriteBorder,
//   AddShoppingCartOutlined,
//   Search,
//   Delete,
//   Edit,
//   LastPage,
//   FirstPage,
//   ArrowBackIos,
//   ArrowForwardIos,
//   Clear,
//   Done,
//   CheckBox,
//   CheckBoxOutlineBlank,
//   MoreVert,
//   ArrowUpward,
// } from "@material-ui/icons";
// import React, { Component } from "react";
// import MaterialTable from "material-table";

// /**
//  * Displays a ShoppingList for given Data 
//  * 
//  * @author Tom Hagerw
//  * 
//  */

// export default class ShoppingList extends Component {
//   constructor(props) {
//     super(props);

//     // Init an empty state
//     this.state = {
//         //passed Columns and Data loaded into state
//           columns: [
//             {
//               align: "center",
//               title: "bought",
//               field: "bought",
//               defaultSort: "asc",
//               type: "boolean",
//               customSort: (a,b) => a.bought - b.bought,
//               // editComponent: props => (
//               //   <Checkbox
//               //     type="boolean"
//               //     value={props.value}
//               //     onChange={e => props.onChange(!e.target.value)}
//               //   />
//               // ),
//               render: (data) => (
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       icon={<CheckBoxOutlineBlank />}
//                       checkedIcon={<CheckBox />}
//                       checked={data.bought}
//                       onChange={(e) => (
//                         (data.bought = !data.bought),
//                         e,
//                         setState((prevState) => {
//                           const data = [...prevState.data];
//                           return { ...prevState, data };
//                         })
//                       )}
//                       name="boughtCheckBox"
//                       color="primary"
//                     />
//                   }
//                 />
//               ),
//             },
//             { title: "Article", field: "articleName", align: "center", sorting: false },
//             {
//               title: "Amount",
//               field: "entryAmount",
//               type: "numeric",
//               align: "center",
//               sorting: false,
//             },
//             {
//               title: "Unit",
//               field: "entryUnit",
//               sorting: false,
//               align: "center",
//               lookup: {
//                 1: "KG",
//                 2: "g",
//                 3: "L",
//                 4: "Stk",
//                 5: " Sack",
//                 6: "Karton",
//                 7: "Flasche",
//                 8: "Dose",
//                 9: "Bund",
//                 10: "m",
//               }, //
//             },
//             {
//               title: "Favorite     ",
//               align: "center",
//               field: "favorite",
//               type: "boolean",
//               sorting: false,
//               render: (data) => (
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       icon={<FavoriteBorder />}
//                       checkedIcon={<Favorite />}
//                       checked={data.favorite}
//                       onChange={(e) => (
//                         (data.favorite = !data.favorite),
//                         e,
//                         setState((prevState) => {
//                           const data = [...prevState.data];
//                           return { ...prevState, data };
//                         })
//                       )}
//                       name="favoriteButton"
//                       color="primary"
//                     />
//                   }
//                 />
//               ),
//             },
//           ],
      
//           // TODO: Connect Back-End for Data
//           data: [
//             // {
//             //   id: 1,
//             //   bought: false,
//             //   favorite: false,
//             //   articleName: "Apfel",
//             //   entryAmount: "26",
//             //   entryUnit: "1",
//             // },
//             // {
//             //   id: 2,
//             //   bought: true,
//             //   favorite: true,
//             //   articleName: "Birne",
//             //   entryAmount: "3",
//             //   entryUnit: "3",
//             // },
//             // {
//             //   id: 1,
//             //   bought: false,
//             //   favorite: false,
//             //   articleName: "Apfel",
//             //   entryAmount: "26",
//             //   entryUnit: "1",
//             // },
//             // {
//             //   id: 2,
//             //   bought: true,
//             //   favorite: true,
//             //   articleName: "Birne",
//             //   entryAmount: "3",
//             //   entryUnit: "3",
//             // },
//           ],
//     };
//     // setState((prevState) => {
//     //   const data = [...prevState.data];
//     //   data.push(newData);
//     //   return { ...prevState, data };
//     // })

//   }
  
//   async fetchEntries() {
//     const res = await fetch(
//       'http://desktop-j5f6l70:8081/api/iKauf/entry',
//       );
//       const resjson = fetch.json();
//     console.log(resjson);
//     this.setState({ data: data });
//   }

//   componentDidMount() {
//     this.fetchEntries();
//   }



//   render(){
//     const state = this.state
//     return (
//     <React.Fragment>
//       <CssBaseline />

//       <Container maxWidth="sm">
//         <MaterialTable 
//           size="small"
//           title="Rewe"
//           columns={state.columns}
//           data={state.data}
//           icons={{
//             Add: AddShoppingCartOutlined,
//             Search: Search,
//             Delete: Delete,
//             Edit: Edit,
//             FirstPage: FirstPage,
//             LastPage: LastPage,
//             PreviousPage: ArrowBackIos,
//             NextPage: ArrowForwardIos,
//             Clear: Clear,
//             ResetSearch: Clear,
//             Check: Done,
//             ViewColumn: MoreVert,
//             SortArrow: ArrowUpward,
//           }}
//           options={{
//             columnsButton: true,
//             actionsColumnIndex: -1,
//             // selection: true,
//             showSelectAllCheckbox: false,
//             showTextRowsSelected: false,
//             sorting: true,
//             rowStyle: (rowData) => ({
//               backgroundColor: rowData.bought ? "#039be5" : "#fff",
//             }),
//           }}
//           // onSelectionChange={(row, rowData) => {
//           //   setState((prevState) => {
//           //     const data = [...prevState.data];
//           //     return { ...prevState, data };
//           //   });
//           // }}
//           editable={{
//             isEditable: rowData => rowData.bought === false,
//             onRowAdd: (newData) =>
//               new Promise((resolve) => {
//                 setTimeout(() => {
//                   resolve();
//                   setState((prevState) => {
//                     const data = [...prevState.data];
//                     data.push(newData);
//                     return { ...prevState, data };
//                   });
//                 }, 600);
//               }),
//             onRowUpdate: (newData, oldData) =>
//               new Promise((resolve) => {
//                 setTimeout(() => {
//                   resolve();
//                   if (oldData) {
//                     setState((prevState) => {
//                       const data = [...prevState.data];
//                       data[data.indexOf(oldData)] = newData;
//                       return { ...prevState, data };
//                     });
//                   }
//                 }, 600);
//               }),
//             onRowDelete: (oldData) =>
//               new Promise((resolve) => {
//                 setTimeout(() => {
//                   resolve();
//                   setState((prevState) => {
//                     const data = [...prevState.data];
//                     data.splice(data.indexOf(oldData), 1);
//                     return { ...prevState, data };
//                   });
//                 }, 600);
//               }),
//           }}
//         />
//       </Container>
//     </React.Fragment>
//   );
// }
// }