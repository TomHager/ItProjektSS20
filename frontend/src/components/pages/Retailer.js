import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // IconButton,
} from '@material-ui/core';
import DeleteRetailerAlert from '../dialogs/DeleteRetailerAlert';
import AddRetailer from '../subcomponents/AddRetailer';
import RetailerBO from "../../api/RetailerBO"
import RetailerGroupBO from "../../api/RetailerGroupBO"
import ShoppingAPI from "../../api/ShoppingAPI";

/**
 *
 * @author Tom Hager
 * @author Robin Fink
 * @author Lukas Rutkauskas
 */

export default class RetailerList extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      retailerRows: [],
      retailers: [],
      retailerName: '',
      groupId: this.props.groupId,
    };
  }

  // Fetch all retailer for given group
  fetchRetailers(justFetch=true, name="") {
    // Fetch all retailer for group
    ShoppingAPI.getAPI()
      .searchRetailerMemberByGroup(this.state.groupId)
      .then((membership) => {
        // Fetch all retailers of data warehouse
        ShoppingAPI.getAPI()
          .getRetailers()
          .then((allRetailers) => {
            const retailers = [];
            for (let i of membership) {
              retailers.push(
                allRetailers.find((x) => x.id === i.retailer_member)
                );
            }
            // On success
            this.setState({              retailers,            });

            // Add new Retailer to RetailerGroupList
            if(!justFetch){
              const matchingRetailers = allRetailers.find(x=> x.name === name)
              const membership = new RetailerGroupBO();
              membership.setRetailerGroup(this.state.groupId);
              membership.setRetailerMember(matchingRetailers.id);
              ShoppingAPI.getAPI().addRetailerGroup(membership).catch();
              }
          });
      });

  }

  //calls all Callbacks for Repor Selection
  componentDidMount = () => {
    this.fetchRetailers();
    console.log('All Callbacks initialised');
  };

  // Delte Retailer
  delRetailer = (id) => {
    ShoppingAPI.getAPI().deleteRetailerGroup(this.state.groupId, id).then(()=>{
      this.setState({
        retailers: [...this.state.retailers.filter((retailer) => retailer.id !== id)],
      });
      // this.checkRetailerGroups(id);
    })
  };

  // Not Implemented in API and Backend
  //Delete RetilerGroup
  // checkRetailerGroups(retailreId){
  //   // get all entries for retailergroup
  //   const membership = []
  //   if(membership.length = 0) {
  //     ShoppingAPI.getAPI().deleteRetailer(retailerId);
  //   }
  // }

  // Add Retailer
  addRetailer = (name) => {
    const retailer = new RetailerBO();
    retailer.setID(Math.floor(Math.random() * Math.floor(500))); 
    retailer.setName(name)

    // Right soluction but no response
    // this.setState({ retailers: [...this.state.retailers, newRetailer] });
  console.log(retailer)
    ShoppingAPI.getAPI()
      .addRetailer(retailer)
      .catch((e) => {
        this.fetchRetailers(false, name);

      });
  };

  render() {
    const retailers = this.state.retailers;
    return (
      <div align="center">
        <TableContainer
          style={{ width: Math.round(window.innerWidth * 0.3), margin: '3em' }}
          component={Paper}
        >
          {/* Retailer Table */}
          <Table
            size="small"
            aria-label="spanning table"
            // style={{ height: Math.round(window.innerHeight * 0.3) }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Retailer:</b>
                </TableCell>
                <TableCell>
                  <AddRetailer addRetailer={this.addRetailer}></AddRetailer>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {retailers.map((row) => (
                <TableRow
                  key={row.id}
                  style={{
                    backgroundColor:
                      row.id === this.state.groupIndex ? '#0090FF' : 'white',
                  }}
                  // onClick={this.groupClickHandler.bind(this, row)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <DeleteRetailerAlert delRetailer={this.delRetailer} id={row.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
