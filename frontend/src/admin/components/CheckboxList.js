import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from "@material-ui/core";
import styles from "./CheckboxList.style";
import CheckBoxOutlineBlankIcon  from "@material-ui/icons/CheckBoxOutlineBlank";

const CheckboxList = ({checked, setChecked, classes, idField, getText, values}) => {
  const handleToggle = value => {
    console.log(value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {values.map(value => (
        <ListItem key={value[idField]} dense button onClick={() => {
          handleToggle(value[idField])
        }}>
          <Checkbox checked={checked.indexOf(value[idField]) !== -1} disableRipple icon={<CheckBoxOutlineBlankIcon className={classes.checkboxIcon}/>}/>
          <ListItemText primary={getText(value)} className={classes.listText}/>
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(CheckboxList);