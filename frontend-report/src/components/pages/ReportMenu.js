import React from "react";
import { makeStyles, Container } from "@material-ui/core";

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
function Report() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
    <Container>
    {/* GroupSelection */}
    
    </Container>
    <Container>
      {/* RetailerSelection */}

    </Container>
    <Container>
      {/* DateSelection */}

    </Container>
    </React.Fragment>
  );
}

export default Report;
