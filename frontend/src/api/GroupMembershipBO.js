/**
 * @author Erik Lebedkin
 */

export default class GroupMembershipBO {
  constructor(member, group_membership) {
    this.member = member;
    this.group_membership = group_membership;
  }

  setGroupMember(member) {
    this.member = member;
  }

  getGroupMember() {
    return this.member;
  }

  setGroupMembership(group_membership) {
    this.group_membership = group_membership;
  }

  getGroupMembership() {
    return this.group_membership;
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
