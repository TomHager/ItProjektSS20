import { Add, Edit } from '@material-ui/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Input,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import GroupBO from '../../api/GroupBO';
import firebase from 'firebase/app';
import GroupManagement from "./GroupManagement"

/**
 * Displays favorites for given group
 *
 * @author Tom Hager
 */

export default class GroupsList extends Component {
  constructor(props) {
    super(props);
    // user

    // Init an empty state
    this.state = {
      //passed Columns and Data loaded into state
      data: [], // Groups of user
      user: {}, // Current user
      rowIndex: -1,

      // Add Group
      addGroup: '',

      // Error
      errorGroup: false,
    };
  }

  //All Fetch Fucnstions
  
  fetchCurrentUser = () => {
    ShoppingAPI.getAPI()
      .searchUserByEmail(firebase.auth().currentUser.email)
      .then((user) => {
        this.setState({ user:user[0] });
        this.fetchGroupsForUser(user[0]);
      });
  };

  // Fetch all groups of user
  fetchGroupsForUser = (user) => {
    ShoppingAPI.getAPI()
      .searchGroupsByMember(user.id)
      .then((groupMemberships) => {
        if (groupMemberships.length > 0) {
          ShoppingAPI.getAPI()
            .getGroups()
            .then((groups) => {
              const data = [];
              for (let i of groupMemberships) {
                data.push(groups.find((x) => x.id === i.group_membership));
              }
              this.setState({ data });
            });
        }
        // @TODO evtl fix for no Group
      });
  };

  // Start Callbacks
  componentDidMount() {
    this.setState({ user: this.props.user });
    this.fetchCurrentUser();
    console.log('Mount');
  }

  // Select Row
  toggleSelectedRow = (data) => {
    this.state.rowIndex === data.id
      ? this.setState({ rowIndex: -1 })
      : this.setState({ rowIndex: data.id });
  };

  // Validate Add Group
  validateAddGroup = () => {
    this.state.addGroup.trim() !== ''
      ? this.AddGroup()
      : this.setState({ errorGroup: true });
  };

  // @TEST
  // Add Group
  AddGroup = () => {
    const group = new GroupBO();
    group.setID(Math.floor(Math.random() * Math.floor(500)));
    group.setName(this.state.addGroup.trim());
    ShoppingAPI.getAPI()
      .addGroup(group)
      .catch((e) => {
        // BACKEND ISSUES DONT GET RESPONSE ON ADD
        // This would be the correct way to deal with Server response
        // Add GroupMembership for Current User
        // const membership = new GroupMembershipBO();
        // membership.setGroupMember(this.state.user.id);
        // membership.setGroupMembership(group.id);
        // ShoppingAPI.getAPI()
        //   .addGroupMembership(membership)
        //   .catch((e) => {
        //     console.info(e);
        //   });

        // On success
        // this.state.data.push(group);
        // this.setState({ data: this.state.data });
        this.setState({ addGroup: '' });
        document.getElementById('addGroup').value = '';

        this.backendFix(group);
      });
  };

  // "FIXING" Backend issues with responding on add
  backendFix = (group) => {
    ShoppingAPI.getAPI()
      .searchGroupByName(group.name)
      .then((createdGroup) => {
        const membership = new GroupMembershipBO();
        membership.setGroupMember(this.state.user.id);
        membership.setGroupMembership(createdGroup[createdGroup.length - 1].id);
        ShoppingAPI.getAPI()
          .addGroupMembership(membership)
          .catch((e) => {
            this.fetchCurrentUser();
          });
      });
  };


  //@TODO FIX
  // Delete User from Group
  leaveGroup = (groupId) => {
    console.log(this.state.user)
    ShoppingAPI.getAPI()
      .deleteGroupMembership(groupId, this.state.user.id)
      .then(() => {
      this.checkForEmptyGroup(groupId);
    this.setState({
      data: this.state.data.filter((x) => x.id !== groupId),
    })});
  };

  //@TEST
  // Delete group if no users are found for group
  checkForEmptyGroup = (groupId) => {
    ShoppingAPI.getAPI()
      .searchMembersByGroup(groupId)
      .then((groupMemberships) => {
        if (groupMemberships.length === 0) {
          ShoppingAPI.getAPI().deleteGroup(groupId);
        }
      });
  };

  render() {
    const { data, errorGroup, rowIndex } = this.state;
    console.log('render');
    return (
      <React.Fragment>
        <Container maxWidth="md">
          <CssBaseline />

          {/* Add new User to Group */}
          <Typography id="add">
            <Input
              id="addGroup"
              type="text"
              placeholder="enter group name"
              label="Group Name"
              error={errorGroup}
              onChange={(e) => this.setState({ addGroup: e.target.value })}
            ></Input>
            <IconButton onClick={this.validateAddGroup}>
              <Add />
            </IconButton>
          </Typography>

          {/* All Groups of Group */}
          {data.map((row) => (
            <Typography id={row.id}>
              {/* Button to link to shoppinglist of group */}
              <Button
                component={Link}
                to={{
                  pathname: '/shoppingList',
                  state: {
                    groupId: row.id,
                  },
                }}
              >
                {row.name}
              </Button>

              {/* Manage selected group */}
              <IconButton onClick={this.toggleSelectedRow.bind(this,row)}>
                <Edit />
              </IconButton>
              {rowIndex === row.id && (
                <Typography id="selectedGroup">
                  <GroupManagement
                    groupId={row.id}
                    groupName={row.name}
                    leaveGroup={this.leaveGroup}
                  />
                </Typography>
              )}
            </Typography>
          ))}
        </Container>
      </React.Fragment>
    );
  }
}
