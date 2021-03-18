import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";

import GeneralLink from "./GeneralLink";
import OrderLink from "./OrderLink";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavigationBar({
  ordersOfCustomer,
  handleOrderSelection,
}) {
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const productsLink = {
    name: "Products",
    menu: ["Product 1", "Product 2", "Product 3"],
  };

  const brandsLink = {
    name: "Brands",
    menu: ["Brand 1", "Brand 2"],
  };

  const dealsLink = {
    name: "Deals",
    menu: ["Deal 1"],
  };

  const servicesLink = {
    name: "Services",
    menu: ["Service 1"],
  };

  const accountLink = {
    name: "Account",
    menu: [],
    leadingIcon: "account_circle",
  };

  const recentlyViewedLink = {
    name: "Recently Viewed",
    menu: ["Product 2"],
  };

  const savedItemsLink = {
    name: "Saved Items",
    menu: ["Item 2", "Item 3"],
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <GeneralLink meta={productsLink} />
      </MenuItem>
      <MenuItem>
        <GeneralLink meta={brandsLink} />
      </MenuItem>
      <MenuItem>
        <GeneralLink meta={dealsLink} />
      </MenuItem>
      <MenuItem>
        <GeneralLink meta={servicesLink} />
      </MenuItem>

      <div className={classes.grow} />

      <MenuItem>
        <GeneralLink meta={accountLink} />
      </MenuItem>
      <MenuItem>
        <GeneralLink meta={recentlyViewedLink} />
      </MenuItem>
      <MenuItem>
        <OrderLink
          ordersOfCustomer={ordersOfCustomer}
          handleOrderSelection={handleOrderSelection}
        />
      </MenuItem>
      <MenuItem>
        <GeneralLink meta={savedItemsLink} />
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.sectionDesktop}>
            <GeneralLink meta={productsLink} />
            <GeneralLink meta={brandsLink} />
            <GeneralLink meta={dealsLink} />
            <GeneralLink meta={servicesLink} />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <GeneralLink meta={accountLink} />
            <GeneralLink meta={recentlyViewedLink} />
            <OrderLink
              ordersOfCustomer={ordersOfCustomer}
              handleOrderSelection={handleOrderSelection}
            />
            <GeneralLink meta={savedItemsLink} />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
