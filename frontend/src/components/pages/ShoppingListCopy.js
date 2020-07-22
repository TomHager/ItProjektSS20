// import {
//   Container,
//   CssBaseline,
//   IconButton,
//   NativeSelect as Select,
// } from '@material-ui/core';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import {
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
//   Refresh,
// } from '@material-ui/icons';
// import React, { Component } from 'react';
// import MaterialTable from 'material-table';
// import ShoppingAPI from '../../api/ShoppingAPI';
// // import { addEntry } from '../../actions/shoppingList';
// // import EntryBO from '../../api/EntryBO';

// /**
//  * Displays a ShoppingList for given Data
//  *
//  * @author Tom Hager
//  */

// export default class ShoppingListCopy extends Component {
//   constructor(props) {
//     super(props);

//     // Init an empty state
//     this.state = {
//       //passed Columns and Data loaded into state
//       columns: [
//         {
//           align: 'center',
//           title: 'bought',
//           field: 'modificationDate',
//           defaultSort: 'asc',
//           type: 'date',
//           editComponent: (props) => (
//             <Checkbox
//               type="boolean"
//               icon={
//                 <CheckBoxOutlineBlank
//                   checkedIcon={<CheckBox />}
//                   // @TODO setState
//                   onChange={(e) =>
//                     (this.state.data.modificationDate = this.setModDate(
//                       this.state.data.modificationDate
//                     ))
//                   }
//                 />
//               }
//             />
//             // console.log(this.state.data.modificationDate)
//           ),
//           render: (data) => (
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   icon={<CheckBoxOutlineBlank />}
//                   checkedIcon={<CheckBox />}
//                   checked={data.modificationDate != null}
//                   onChange={(e) => (
//                     (data.modificationDate = this.setModDate(data.modificationDate)),
//                     // (this.updateEntry(data)),
//                     console.log(data.modificationDate),
//                     this.setState((prevState) => {
//                       const data = [...prevState.data];
//                       return { ...prevState, data };
//                     })
//                   )}
//                   name="boughtCheckBox"
//                   color="primary"
//                 />
//               }
//             />
//           ),
//         },
//         {
//           title: 'Article',
//           field: 'name',
//           align: 'center',
//         },
//         {
//           title: 'Amount',
//           field: 'amount',
//           type: 'numeric',
//           align: 'center',
//           editComponent: (props) => (
//             // editComponent: (onChange()) => (
//             //   validity.valid||(props='')
//             // )
//             // onChange = (props) => (validity.valid||(props=''))
//             <input
//               name="amount"
//               type="number"
//               value={this.state.data.entryAmount}
//               min="0"
//               oninput="validity.valid||(value='');"
//             />
//           ),
//         },
//         {
//           title: 'Unit',
//           field: 'unit',
//           align: 'center',
//           lookup: {
//             1: 'KG',
//             2: 'g',
//             3: 'L',
//             4: 'Stk',
//             5: ' Sack',
//             6: 'Karton',
//             7: 'Flasche',
//             8: 'Dose',
//             9: 'Bund',
//             10: 'm',
//           },
//         },
//       ],

//       data: [],
//       retailers: [
//         { id: 1, name: 'Edeka' },
//         { id: 2, name: 'Rewe' },
//         { id: 3, name: 'Kaufland' },
//         { id: 4, name: 'Test' },
//       ],
//       members: [
//         {
//           member: 'Tom',
//         },
//         {
//           member: 'Klaus',
//         },
//       ],
//       retailerName: 'Default',
//     };
//     // const onChange = (e) =>
//     //   this.setState({ ...this.state, [e.target.name]: e.target.value });
//     // const onSubmit = async (e) => {
//     //   e.preventDefault();
//     //   // if (...) {
//     //   // } else {
//     //   addEntry(this.state.data);
//     //   // }
//     // };
//   }

//   setModDate = (date) => (date == null ? (date = Date.now()) : (date = null));

//   fetchEntries = () => {
//     const data = [
//       { id: 1, bought: true, article: 'Apfel', amount: 10, unit: 'Kg', retailerId: 1 },
//     ];
//     this.setState({ data: data });
//     //   ShoppingAPI.getAPI().getEntries().then(entryBOs => this.setState({data: entryBOs})).catch(e => this.setState({data: []}))
//     console.log('FetchEntries');
//   };
//   componentDidMount() {
//     this.fetchEntries();
//   }

//   //   getItems = () => {
//   //     ShoppingAPI.getAPI().getAllItems().then(ItemBOs =>
//   //             this.setState({
//   //                 items: ItemBOs
//   //             }))
//   // }

//   //   Updates the entry
//   //   updateEntry = (oldData, newData) => {
//   //     // ShoppingAPI.getAPI().updateEntry(newData);
//   //     new Promise((resolve) => {
//   //       resolve();
//   //       if (oldData) {
//   //         this.setState((prevState) => {
//   //           const data = [...prevState.data];
//   //           data[data.indexOf(oldData)] = newData;
//   //           return { ...prevState, data };
//   //         });
//   //       }
//   //     }),
//   //       this.fetchEntries();
//   //   };

//   handleChange = (e) => {
//     let selectedValue = e.target.value;
//     this.state.members.onSelectChange(selectedValue);
//     // console.log(e.taget.value)
//   };

//   render() {
//     const { retailers, members, retailerName, columns, data } = this.state;
//     return (
//       <React.Fragment>
//         <Container maxWidth="md">
//           <CssBaseline />
//           <IconButton onClick={(e) => this.fetchEntries()}>
//             <Refresh />
//           </IconButton>
//           {/* Retailer for entries */}
//           <Select
//             id="selectedRetailer"
//             retailers={retailers}
//             defaultValue={retailers[0].name}
//             onChange={(e) => this.setState({ retailers: e.target.value })}
//           >
//             {retailers.map((option) => (
//               <option key={option.id}>{option.name}</option>
//             ))}
//           </Select>
//           {/* Members responsible for entries */}
//           <Select
//             id="selectedMember"
//             members={members}
//             defaultValue={members[0].name}
//             onChange={(e) => this.setState({ members: e.target.value })}
//           >
//             {members.map((option) => (
//               <option key={option.id}>{option.name}</option>
//             ))}
//           </Select>

//           {/* EntryTable */}
//           <MaterialTable
//             title={retailerName}
//             columns={columns}
//             data={data}
//             icons={{
//               Add: AddShoppingCartOutlined,
//               Search: Search,
//               Delete: Delete,
//               Edit: Edit,
//               FirstPage: FirstPage,
//               LastPage: LastPage,
//               PreviousPage: ArrowBackIos,
//               NextPage: ArrowForwardIos,
//               Clear: Clear,
//               ResetSearch: Clear,
//               Check: Done,
//               ViewColumn: MoreVert,
//               SortArrow: ArrowUpward,
//             }}
//             options={{
//               columnsButton: true,
//               actionsColumnIndex: -1,
//               // selection: true,
//               showSelectAllCheckbox: false,
//               showTextRowsSelected: false,
//               sorting: true,
//               rowStyle: (rowData) => ({
//                 backgroundColor: rowData.modificationDate != null ? '#039be5' : '#fff',
//               }),
//             }}
//             // onSelectionChange={(row, rowData) => {
//             //   setState((prevState) => {
//             //     const data = [...prevState.data];
//             //     return { ...prevState, data };
//             //   });
//             // }}
//             editable={{
//               isEditable: (rowData) => rowData.modificationDate == null,
//               onRowAdd: (newData) =>
//                 new Promise((resolve) => {
//                   setTimeout(() => {
//                     resolve();
//                     this.setState((prevState) => {
//                       const data = [...prevState.data];
//                       data.push(newData);
//                       return { ...prevState, data };
//                     });
//                   }, 600);
//                 }),
//               onRowUpdate: (newData, oldData) =>
//                 new Promise((resolve) => {
//                   resolve();
//                   if (oldData) {
//                     this.setState((prevState) => {
//                       const data = [...prevState.data];
//                       data[data.indexOf(oldData)] = newData;
//                       return { ...prevState, data };
//                     });
//                   }
//                 }),
//               // this.updateEntry(newData, oldData),

//               onRowDelete: (oldData) =>
//                 new Promise((resolve) => {
//                   setTimeout(() => {
//                     resolve();
//                     this.setState((prevState) => {
//                       const data = [...prevState.data];
//                       data.splice(data.indexOf(oldData), 1);
//                       return { ...prevState, data };
//                     });
//                   }, 600);
//                 }),
//             }}
//           />
//         </Container>
//       </React.Fragment>
//     );
//   }
// }
