/**
 * @author Erik Lebedkin
 */

export default class ReportValuesBO {
  constructor(groupId, modificationDateFrom, modificationDateTo) {
    this.group_id = groupId;
    this.modification_date_from = modificationDateFrom;
    this.modification_date_to = modificationDateTo;
  }

  setGroupId(groupId) {
    this.group_id = groupId;
  }

  getGroupId() {
    return this.groupId;
  }

  setModificationDateFrom(modificationDateFrom) {
    this.modification_date_from = modificationDateFrom;
  }

  getModificationDateFrom() {
    return this.modification_date_from;
  }

  setModificationDateTo(modificationDateTo) {
    this.modification_date_to = modificationDateTo;
  }

  getModificationDateTo() {
    return this.modification_date_to;
  }

  // Returns an Array of CustomerBOs from a given JSON structure
  static fromJSON(reportValues) {
    let result = [];

    if (Array.isArray(reportValues)) {
      reportValues.forEach((c) => {
        Object.setPrototypeOf(c, ReportValuesBO.prototype);
        result.push(c);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = reportValues;
      Object.setPrototypeOf(c, ReportValuesBO.prototype);
      result.push(c);
    }

    return result;
  }
}
