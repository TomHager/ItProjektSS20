/**
 * @author Erik Lebedkin
 */

export default class GroupMembershipBO {
  constructor(member, groupMembership) {
    this.member = member;
    this.group_membership = groupMembership;
  }

  setGroupMember(member) {
    this.member = member;
  }

  getGroupMember() {
    return this.member;
  }

  setGroupMembership(groupMembership) {
    this.group_membership = groupMembership;
  }

  getGroupMembership() {
    return this.group_membership;
  }

  // Returns an Array of GroupMembershipBO from a given JSON structure
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
