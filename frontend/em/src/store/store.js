import { types } from "mobx-state-tree";

const expense = types.model("expensemodel", {
  category: types.string,
  createAt: types.string,
  type: types.string,
  amount: types.number,
  name: types.string,
  _id: types.string,
});

//==========

const account = types.model("accountModel", {
  _id: types.string,
  category: types.optional(types.array(types.string), []),
  account: types.string,
  expenese: types.optional(types.array(expense), []),
});

const accounts = types
  .model("accountsModel", {
    accounts: types.optional(types.array(account), []),
    active: types.optional(types.string, ""),
  })
  .actions((self) => ({
    addAccount(obj) {
      self.accounts.push(obj);
    },
    setActive(obj) {
      self.active = obj;
    },
    updateActive(obj) {
      for (let a = 0; a < self.accounts.length; a++) {
        if (self.accounts[a]._id == self.active) self.accounts[a] = obj;
      }
    },
  }))
  .views((self) => ({
    getAccount() {
      for (let a = 0; a < self.accounts.length; a++) {
        if (self.accounts[a]._id == self.active) return self.accounts[a];
      }
    },
  }));

let _accountsStore;
export const getAccounts = (obj = []) => {
  if (!_accountsStore)
    _accountsStore = accounts.create({ accounts: obj, active: "" });
  return _accountsStore;
};

//------------
const user = types
  .model("userModel", {
    name: types.string,
    username: types.string,
    language: types.string,
    accounts: types.optional(types.array(types.string), []),
    referralBy: types.optional(types.string, "NONE"),
    token: types.optional(types.string, ""),
  })
  .actions((self) => ({
    getLang() {
      if (self.language === "hin") return "Hindi";
      else if (self.language === "guj") return "Gujrati";
      else if (self.language === "mar") return "Marathi";
      return "eng";
    },
  }));

let _userStore;

export const getUser = (data = {}) => {
  if (!_userStore) {
    _userStore = user.create(data);
  }
  return _userStore;
};

//------------------------
const userLogin = types
  .model("userLogin", {
    status: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setStatus(status) {
      self.status = status;
    },
  }));

let _userLogin = userLogin.create({ test: "tho" });
export const isUserLogin = () => {
  return _userLogin;
};
