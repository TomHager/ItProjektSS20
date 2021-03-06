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
  Input,
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
      unfilteredData: [],
    };
  }

  fetchEntriesByGroup() {
    console.log('ONLY GROUP');
    ShoppingAPI.getAPI()
      .searchEntryByGroup(this.props.groupId)
      .then((data) => {
        console.log(data);
        this.filterData(data);
      });
  }

  fetchEntriesByGroupAndTime() {
    console.log('DATE GROUP');
    const { groupId, dateFrom, dateTo } = this.props;
    ShoppingAPI.getAPI()
      .searchReportDataURL(
        groupId,
        new Date().toISOString(dateFrom),
        new Date().toISOString(dateTo)
      )
      .then((data) => {
        this.filterData(data);
      });
  }

  componentDidMount = () => {
    if (this.props.groupId > 0) {
      this.props.dateFrom !== null && this.props.dateTo !== null
        ? this.fetchEntriesByGroup()
        : this.fetchEntriesByGroupAndTime();
    }
  };

  filterData(array) {
    let data = [];
    if (this.props.retailerId !== -1) {
      data = array.filter((x) => x.retailer_id === this.props.retailerId);
    } else {
      data = array;
    }
    this.setState({ data, unfilteredData: data });
  }

  search = (req) => {
    this.setState({
      data: this.state.unfilteredData.filter(
        (el) => el.article.toLowerCase().indexOf(req.trim().toLowerCase()) > -1
      ),
    });
  };

  render() {
    const { data } = this.state;
    return (
      <TableContainer
        style={{
          width: Math.round(window.innerWidth * 0.7),
          marginLeft: '2em',
        }}
        component={Paper}
      >
        {/* Search articles */}
        <Input
          type="text"
          id="filter"
          placeholder="search article"
          defaultValue=""
          onChange={(e) => this.search(e.target.value)}
        ></Input>

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
