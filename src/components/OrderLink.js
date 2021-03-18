import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import useWindowDimensions from "./useWindowDimensions";

import OrderSummary from "./OrderSummary";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: 15,
  },
  menu: {
    color: "blue",
    width: "15em",
    padding: theme.spacing(2),
    outline: "none",
  },

  menuTitle: {
    borderBottomStyle: "solid",
    borderBottomWidth: "thin",
    paddingBottom: theme.spacing(0.9),
    display: "flex",
    justifyContent: "space-between",
    // position: "absolute",
    zIndex: "99",
  },
  menuItem: {
    marginTop: theme.spacing(1),
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  divider: {
    backgroundColor: "#d9e2ee",
    margin: ".5em 0",
  },
}));

export default function OrderLink({ ordersOfCustomer, handleOrderSelection }) {
  const { width } = useWindowDimensions();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        Order Status
        <ExpandMore />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {width >= 700 ? (
          <OrderSummary
            closeMenu={handleClose}
            ordersOfCustomer={ordersOfCustomer}
            handleOrderSelection={handleOrderSelection}
          />
        ) : (
          <div className={classes.menu}>
            <div className={classes.menuTitle}>
              <div>Sign in | Create account</div>
              <div>x</div>
            </div>
            <div>
              <Button
                className={classes.menuItem}
                color="primary"
                variant={"outlined"}
              >
                Account
              </Button>
              <Divider variant={"middle"} className={classes.divider} />
              <Button
                className={classes.menuItem}
                color="primary"
                variant={"outlined"}
              >
                Credit Cards
              </Button>
              <Button
                className={classes.menuItem}
                color="primary"
                variant={"outlined"}
                component={Link}
                to="/order-details"
              >
                Order Status
              </Button>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}
