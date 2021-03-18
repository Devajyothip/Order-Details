import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: 15,
  },
}));

export default function GeneralLink({ meta }) {
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
        {meta.leadingIcon && <Icon>{meta.leadingIcon}</Icon>}
        {meta.name}
        <ExpandMore />
      </IconButton>
      {meta.menu.length > 0 && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {meta.menu.map((element) => (
            <MenuItem
              key={element}
              onClick={handleClose}
              component={Link}
              to="/home"
            >
              {element}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}
