import React, { Component } from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
  Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Axios from "axios";
import notFound from "../../images/not-found.jpg";

const styles = (theme) =>
  createStyles({
    result: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(3),
      justifyContent: "space-around",
      backgroundColor: "inherit",
    },
    gridList: {
      width: "100%",
      height: "100%",
    },
    icon: {
      color: theme.palette.primary.main,
    },
    img: {
      height: "100%",
      width: "100%",
    },
  });
class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  fetchData = () => {
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${this.props.query}`;
    Axios.get(API_URL)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { classes, query } = this.props;
    const { data } = this.state;
    console.log(data, query);
    return (
      <div className={classes.result}>
        {data ? (
          <GridList
            cellHeight="auto"
            spacing={16}
            cols={3}
            className={classes.gridList}
          >
            <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
              <ListSubheader component="div">{`Showing results for "${query}"`}</ListSubheader>
            </GridListTile>
            {data.items.map((item) => (
              <GridListTile key={item.id}>
                <img
                  src={
                    item.volumeInfo.imageLinks
                      ? item.volumeInfo.imageLinks.thumbnail
                      : notFound
                  }
                  alt={item.title}
                  className={classes.img}
                />
                <GridListTileBar
                  title={item.volumeInfo.title}
                  subtitle={
                    <span>
                      Author:{" "}
                      {item.volumeInfo.authors
                        ? item.volumeInfo.authors.length > 1
                          ? item.volumeInfo.authors.map(
                              (author) => `${author}, `
                            )
                          : item.volumeInfo.authors
                        : "Anonymous"}
                      <br />
                      Categories:{" "}
                      {item.volumeInfo.categories
                        ? item.volumeInfo.categories.length > 1
                          ? item.volumeInfo.categories.map(
                              (category) => `${category}, `
                            )
                          : item.volumeInfo.categories[0]
                        : "Unknown"}
                      <br />
                      Publised in: {item.volumeInfo.publishedDate}
                    </span>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${item.volumeInfo.title}`}
                      className={classes.icon}
                      onClick={() => {
                        Object.assign(document.createElement("a"), {
                          target: "_blank",
                          href: item.volumeInfo.infoLink,
                        }).click();
                      }}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        ) : (
          <Typography variant="body1">
            Nothing to show{" "}
            <span role="img" aria-labelledby="shrug-face">
              🤷
            </span>
          </Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(BookList);
