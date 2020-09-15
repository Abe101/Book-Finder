import React, { Component } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import cogoToast from "cogo-toast";
import BookList from "../BookList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.booklist = React.createRef();
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (this.state.input !== "") {
        cogoToast.loading("Loading...");
        this.booklist.current.fetchData();
      } else {
        cogoToast.error("Please enter something to search for");
      }
    }
  };

  handleClick = () => {
    if (this.state.input !== "") {
      cogoToast.loading("Loading...");
      this.booklist.current.fetchData();
    } else {
      cogoToast.error("Please enter something to search for");
    }
  };

  render() {
    const { classes } = this.props;
    const { input } = this.state;
    return (
      <div>
        <Container>
          <div className={classes.title}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h3">Book Finder</Typography>
            </Box>
          </div>
          <div className={classes.searchArea}>
            <Box display="flex" justifyContent="center">
              <TextField
                variant="outlined"
                label="Search"
                autoFocus
                className={classes.input}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              />
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={this.handleClick.bind(this)}
              >
                Search
              </Button>
            </Box>
          </div>
          <div>
            <BookList query={input} ref={this.booklist} />
          </div>
        </Container>
      </div>
    );
  }
}

const styles = (theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      marginTop: theme.spacing(5),
      color: theme.palette.error.light,
    },
    button: {
      boxShadow: "none",
      "&:hover": {
        backgroundColor: theme.palette.error.light,
      },
      marginLeft: theme.spacing(2),
    },
    searchArea: {
      color: "inherit",
      marginTop: theme.spacing(3),
    },
    input: {
      width: "50%",
    },
  });

export default withStyles(styles)(App);
