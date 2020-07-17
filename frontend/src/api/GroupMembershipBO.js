import BusinessObject from './BusinessObject';
/**
 * @author Erik Lebedkin
 *
 */

export default class GroupMembershipBO extends BusinessObject {
  constructor() {
    super();
    this.member = ""
    this.membership = ""

  }

  setGroupMember(member) {
    this.member = member
  }

  getGroupMember() {
    return this.member
  }

  setGroupMembership(membership) {
    this.membership = membership
  }

  getGroupMembership() {
    return this.membership
  }

  // Returns an Array of CustomerBOs from a given JSON structure
  static fromJSON(groups) {
    let result = [];

    if (Array.isArray(group)) {
      group.forEach((c) => {
        Object.setPrototypeOf(c, GroupMembershipBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = group;
      Object.setPrototypeOf(c, GroupMembershipBO.prototype);
      result.push(c);
    }

    return result;
  }
}