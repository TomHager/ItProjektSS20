import BusinessObject from "./BusinessObject";

export default class GroupBO extends BusinessObject {
  constructor(name, user_id_list) {
    super();
    this.__name = name;
    this.__user_id_list = user_id_list;
  }

  get_name() {
    return self.__name;
  }

  set_name(name) {
    this.__name = name;
  }

  get_user_id_list() {
    return self.__user_id_list;
  }

  set_user_id_list(id) {
    self.__user_id_list = id;
  }

  static fromJSON(groups) {
    let result = [];

    if (Array.isArray(groups)) {
      groups.forEach((g) => {
        Object.setPrototypeOf(g, GroupBO.prototype);
        result.push(g);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let g = groups;
      Object.setPrototypeOf(g, GroupBO.prototype);
      result.push(g);
    }

    return result;
  }
}
