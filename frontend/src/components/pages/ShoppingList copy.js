// import { Container, CssBaseline, IconButton } from '@material-ui/core';
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
// import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
// import MaterialTable from 'material-table';
// import ShoppingAPI from '../../api/ShoppingAPI';
// // import EntryBO from '../../api/EntryBO';

// /**
//  * Displays a ShoppingList for given Data
//  *
//  * @author Tom Hager
//  */

// const ShoppingList = ({}) => {
//   // constructor(props) {
//   //   super(props);

//   // Init an empty state
//   // this.state = {
//   //passed Columns and Data loaded into state
//   const [state, setState] = useState({
//     columns: [
//       {
//         align: 'center',
//         title: 'bought',
//         field: 'modificationDate',
//         defaultSort: 'asc',
//         type: 'date',
//         editComponent: (props) => (
//           <Checkbox
//             type="boolean"
//             icon={
//               <CheckBoxOutlineBlank
//                 checkedIcon={<CheckBox />}
//                 onChange={(e) =>
//                   (this.state.data.modificationDate = setModDate(
//                     this.state.data.modificationDate
//                   ))
//                 }
//               />
//             }
//           />
//           // console.log(this.state.data.modificationDate)
//         ),
//         render: (data) => (
//           <FormControlLabel
//             control={
//               <Checkbox
//                 icon={<CheckBoxOutlineBlank />}
//                 checkedIcon={<CheckBox />}
//                 checked={data.modificationDate != null}
//                 onChange={(e) => (
//                   (data.modificationDate = setModDate(data.modificationDate)),
//                   // (this.updateEntry(data)),
//                   console.log(data.modificationDate),
//                   this.setState((prevState) => {
//                     const data = [...prevState.data];
//                     return { ...prevState, data };
//                   })
//                 )}
//                 name="boughtCheckBox"
//                 color="primary"
//               />
//             }
//           />
//         ),
//       },
//       {
//         title: 'Article',
//         field: 'articleName',
//         align: 'center',
//       },
//       {
//         title: 'Amount',
//         field: 'entryAmount',
//         type: 'numeric',
//         align: 'center',
//         editComponent: (props) => (
//           // editComponent: (onChange()) => (
//           //   validity.valid||(props='')
//           // )
//           // onChange = (props) => (validity.valid||(props=''))
//           <input
//             name="entryAmount"
//             type="number"
//             value={this.state.data.entryAmount}
//             min="0"
//             oninput="validity.valid||(value='');"
//           />
//         ),
//       },
//       {
//         title: 'Unit',
//         field: 'entryUnit',
//         align: 'center',
//         lookup: {
//           1: 'KG',
//           2: 'g',
//           3: 'L',
//           4: 'Stk',
//           5: ' Sack',
//           6: 'Karton',
//           7: 'Flasche',
//           8: 'Dose',
//           9: 'Bund',
//           10: 'm',
//         },
//       },
//     ],

//     data: [],

//     members: [
//       {
//         member: 'Tom',
//       },
//       {
//         member: 'Klaus',
//       },
//     ],
//     retailerName: 'Default',
//   });
//   // }
//   const { data } = state;
//   const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

//   const setModDate = (date) => (date !== null ? null : Date.now());

//   const fetchEntries = async (e) => {
//     const res = await fetch('http://DESKTOP-S3RCLLP:8081/api/iKauf/entry');
//     const resjson = await res.json();
//     this.setState({ data: resjson });
//   };

//   function componentDidMount() {
//     fetchEntries();
//   }

//   /** Updates the entry */
//   const updateEntry = async (newData) => {
//     ShoppingAPI.getAPI().updateEntry(newData);
//     this.fetchEntries();
//   };

//   // memberButton = () => {
//   //   this.MakeItem = function(X) {
//   //     return <MenuItem >{X}</MenuItem >;
//   //   }
//   //   return(
//   //     <Select
//   //       value={this.state.members}
//   //     >
//   //       {this.state.members.map(this.MakeItem)};
//   //     </Select>
//   //   )
//   //   let members = this.state.members;
//   //   let options = members.map((data) =>
//   //       <option
//   //           key={data.member}
//   //           value={data.member}
//   //       >
//   //           {data.member}
//   //       </option>
//   //   );
//   //   return (

//   //     <select name="memberList" onChange={this.onChange}>
//   //         <option>Select Responsible</option>
//   //         {options}
//   //    </select>
//   //   )
//   // }

//   // render() {
//   // const state = this.state;
//   return (
//     <React.Fragment>
//       <Container maxWidth="md">
//         <CssBaseline />
//         <IconButton onClick={(e) => this.fetchEntries()}>
//           <Refresh />
//         </IconButton>
//         {/* {this.memberButton()} */}
//         <MaterialTable
//           title={state.retailerName}
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
//               backgroundColor: rowData.modificationDate != null ? '#039be5' : '#fff',
//             }),
//           }}
//           // onSelectionChange={(row, rowData) => {
//           //   setState((prevState) => {
//           //     const data = [...prevState.data];
//           //     return { ...prevState, data };
//           //   });
//           // }}
//           editable={{
//             isEditable: (rowData) => rowData.modificationDate == null,
//             onRowAdd: (newData) =>
//               new Promise((resolve) => {
//                 setTimeout(() => {
//                   resolve();
//                   this.setState((prevState) => {
//                     const data = [...prevState.data];
//                     data.push(newData);
//                     return { ...prevState, data };
//                   });
//                 }, 600);
//               }),
//             onRowUpdate: (newData, oldData) =>
//               // new Promise((this.updateEntry(oldData))
//               // new Promise(this.fetchEntries()),
//               new Promise((resolve) => {
//                 setTimeout(() => {
//                   resolve();
//                   if (oldData) {
//                     this.setState((prevState) => {
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
//                   this.setState((prevState) => {
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
// };

// // ShoppingList.propTypes = {
// //   data: PropTypes.array,
// // };
// // const mapStateToProps = (state) => ({
// //   entries: state.data,
// // });

// export default ShoppingList;
