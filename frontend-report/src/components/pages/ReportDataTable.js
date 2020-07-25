import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

/**
 * Displays the data table for the report generator
 *
 * @author Lukas Rutkauskas
 * @author Tom Hager
 */

export default class ReportDataTable extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      data: [],
    };
  }

  fetchEntriesByGroup() {
    ShoppingAPI.getAPI()
      .searchEntryByGroup(this.props.groupId)
      .then((data) => {
        this.setState({ data });
      });
  }

  fetchEntriesByGroupAndTime() {
    const { groupId, dateFrom, dateTo } = this.props;
    ShoppingAPI.getAPI()
      .searchReportDataURL(groupId, dateFrom, dateTo)
      .then((data) => {
        this.setState({ data });
      });
  }

  // componentDidMount = () => {
  //   this.props.dateFrom === ''
  //     ? this.fetchEntriesByGroup()
  //     : this.fetchEntriesByGroupAndTime();
  // };

  render() {
    const { data } = this.state;
    return (
      <TableContainer
        style={{
          width: Math.round(window.innerWidth * 0.68),
          marginLeft: '2em',
        }}
        component={Paper}
      >
        <Table
          size="small"
          aria-label="spanning table"
          style={{
            height: Math.round(window.innerHeight * 0.23),
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Articles bought in this time period</b>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Report Table */}
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.article}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
