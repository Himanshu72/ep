const { getUser, getAccounts } = require("../store/store");

const URL = "https://epback.herokuapp.com";
module.exports = {
  async createUser(userobj) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(userobj);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(`${URL}/user/`, requestOptions);
    return JSON.parse(await response.text());
  },

  async login(username, password) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ username, password });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(`${URL}/user/login`, requestOptions);
    return JSON.parse(await response.text());
  },

  async createAccount(obj) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getUser().token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(obj);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(
      `${URL}/user/${getUser().username}/account`,
      requestOptions
    );
    let res = JSON.parse(await response.text());
    getAccounts().addAccount(res);
    console.log(getAccounts().accounts[0].account);
  },
  async loadAccount(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getUser().token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let all = [];
    ids.forEach(async (id) => {
      all.push(
        fetch(`${URL}/account/${id}/`, requestOptions)
          .then((res) => res.text())
          .then((res) => JSON.parse(res))
      );
    });

    let data = await Promise.all(all);

    getAccounts(data);
  },

  async addCatagory(cat) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getUser().token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ category: cat });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let ans = await fetch(
      `${URL}/account/${getAccounts().active}/category`,
      requestOptions
    ).then((response) => response.text());
    getAccounts().updateActive(JSON.parse(ans));
  },
  async deleteCat(cat) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", getUser().token);

    var raw = JSON.stringify({ category: cat });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const ans = await fetch(
      `${URL}/account/${getAccounts().active}/category`,
      requestOptions
    ).then((response) => response.text());
    getAccounts().updateActive(JSON.parse(ans));
  },
  async createExpenses(obj) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", getUser().token);

    var raw = JSON.stringify(obj);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const ans = await fetch(
      `${URL}/account/${getAccounts().active}/expenses`,
      requestOptions
    ).then((response) => response.text());
    console.log(ans);
    getAccounts().updateActive(JSON.parse(ans));
  },
  async deleteExp(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getUser().token);
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
      headers: myHeaders,
    };

    const ans = await fetch(
      `${URL}/account/${getAccounts().active}/expenses/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => result);
    getAccounts().updateActive(JSON.parse(ans));
  },
  async getExp(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getUser().token);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    let ans = await fetch(
      `${URL}/account/${getAccounts().active}/expenses/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => result);
    return JSON.parse(ans);
  },
};
