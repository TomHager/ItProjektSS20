import React from "react";
import {
  makeStyles,
  Container,
  CssBaseline,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import { TableCell } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(1),
  },
  table: {},
}));

/**
 * Shows the about page with the impressum
 */
export default function ReportMenu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <Container>
          <TableContainer component={Paper}>
            <Table name="groupSelection" aria-label="simple table" size="small" >
              <TableRow>
                <TableHead>Select Group:</TableHead>
              </TableRow>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      type="boolean"
                      icon={
                        <CheckBoxOutlineBlank
                          checkedIcon={<CheckBox />}
                          onChange={(e) => e}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell>Group 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      type="boolean"
                      icon={
                        <CheckBoxOutlineBlank
                          checkedIcon={<CheckBox />}
                          onChange={(e) => e}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell>Group 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      type="boolean"
                      icon={
                        <CheckBoxOutlineBlank
                          checkedIcon={<CheckBox />}
                          onChange={(e) => e}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell>Group 1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            {/* RetailerSelection */}
          </TableContainer>
          <TableContainer component={Paper}>
            {/* DateSelection */}
          </TableContainer>
        </Container>
      </React.Fragment>
    </div>
  );
}
