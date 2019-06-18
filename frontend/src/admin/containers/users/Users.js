import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EnhancedTable from "../../../shared/EnchancedTable";
import history from "../../../history";
import api from "./../../../api";
import {Checkbox, MenuItem, withStyles} from "@material-ui/core";
import Select from "../../../shared/Select";

const styles = () => ({
  root: {
    padding: 50
  },
  tabs: {
  },
});

class Users extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    api.get("/account").then(r => {
      this.setState({users: r.data});
    })
  }

  lockedFormatter = (row) => {
    return <Checkbox checked={row.locked}/>
  };

  rolesFormatter = (row) => (
    <Select value={row.role} style={{width: "100%"}} onChange={(e) => {
      let users = this.state.users;
      for (let user of users) {
        if (user.id === row.id) {
          user.role = e.target.value;
          break;
        }
      }
      this.setState({users})
    }}>
      {["ADMIN", "USER", "MODERATOR"].map((el) => <MenuItem value={el}>{el}</MenuItem>)};
    </Select>
  );

  render() {
    const {classes} = this.props;
    const {users} = this.state;
    return (
      <div className={classes.root}>
        <EnhancedTable columns={[{name: "givenName", label: "Имя"}, {name: "familyName", label: "Фамилия"}, {name: "email", label: "Email"}, {name: "locked", label: "Заблокирован?", format: this.lockedFormatter}, {name: "role", label: "Роль", width: "200px", format: this.rolesFormatter}, {label: "", format: this.editFormatter}]}
                       idField={"id"} data={users} title={"Users"} onDelete={this.deleteFilms}
                       selected={[]} setSelected={(selected) => this.setState({selectedFilms: selected})}
                       padding={"none"}
        />
      </div>
    );
  }
}

Users.propTypes = {};

export default withStyles(styles)(Users);