// import { withRouter } from "react-router-dom";
// import React, { Component }  from 'react';
// // import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
// // // import AddIcon from '@material-ui/icons/Add';
// // // import ClearIcon from '@material-ui/icons/Clear'
// // import PropTypes from 'prop-types';

// // class GroupList extends Component {

// //     constructor(props) {
// //         super(props);
// //         // console.log(props);

// //         this.state = {

// //         }
// //     }

// //   render() {
// //     const { classes } = this.props;
// //     const { groupFilter } = this.state;

// //     return (
// //     //   <div className={classes.root}>
// //     //     <Grid
// //     //       className={classes.groupFilter}
// //     //       container
// //     //       spacing={1}
// //     //       justify="flex-start"
// //     //       alignItems="center"
// //     //     >
// //     //       <Grid item>
// //     //         <Typography>Filter group list by name:</Typography>
// //     //       </Grid>
// //     //       <Grid item xs={4}>
// //     //         <TextField
// //     //           autoFocus
// //     //           fullWidth
// //     //           id="groupFilter"
// //     //           type="text"
// //     //           value={groupFilter}
// //     //           onChange={this.filterFieldValueChange}
// //     //           InputProps={{
// //     //             endAdornment: (
// //     //               <InputAdornment position="end">
// //     //                 <IconButton onClick={this.clearFilterFieldButtonClicked}>
// //     //                   {/* <ClearIcon /> */}
// //     //                 </IconButton>
// //     //               </InputAdornment>
// //     //             ),
// //     //           }}
// //     //         />
// //     //       </Grid>
// //     //     </Grid>
// //     //   </div>
// //         <div>
// //             <table>
// //                 <th>hallo</th>
// //             </table>
// //         </div>
// //     );
// //   }
// // }

// // /** PropTypes */
// // GroupList.propTypes = {
// //     /** @ignore */
// //     classes: PropTypes.object.isRequired,
// //     /** @ignore */
// //     location: PropTypes.object.isRequired,
// //   }

// export default withRouter(GroupList);
// // // withRouter(withStyles(styles)(GroupList));

import React from "react";
import { makeStyles, Paper, Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(1),
  },
}));

/**
 * Shows the about page with the impressum
 */
function GroupList() {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h6">KEIN Project</Typography>
        <br />
        <Typography>Writen by NULL</Typography>
      </div>
    </Paper>
  );
}

export default GroupList;
