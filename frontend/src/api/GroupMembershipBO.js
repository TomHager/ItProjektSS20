import BusinessObject from './BusinessObject';
/**
 * @author Erik Lebedkin
 */

export default class GroupMembershipBO extends BusinessObject {
  constructor(member, membership) {
    super();
    this.member = member;
    this.membership = membership;
  }

  setGroupMember(member) {
    this.member = member;
  }

  getGroupMember() {
    return this.member;
  }

  setGroupMembership(membership) {
    this.membership = membership;
  }

  getGroupMembership() {
    return this.membership;
  }

  // Returns an Array of CustomerBOs from a given JSON structure
  static fromJSON(groupMemberships) {
    let result = [];

    if (Array.isArray(groupMemberships)) {
      groupMemberships.forEach((c) => {
        Object.setPrototypeOf(c, GroupMembershipBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = groupMemberships;
      Object.setPrototypeOf(c, GroupMembershipBO.prototype);
      result.push(c);
    }

    return result;
  }
}
