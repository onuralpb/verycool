import { loader } from "./loader";

export class Request {
  constructor() {
    this.url = "http://localhost:5555/todox";
    this.taskList = document.querySelector(".taskList");
  }
  get() {
    return new Promise((resolve, reject) => {
      loader(true, this.taskList);
      fetch(this.url)
        .then(response => response.json())
        .then(json => {
          setTimeout(() => {
            resolve(json);
            loader(false);
          }, 1000);
        })
        .catch(err => {
          reject(err);
          loader(false);
        });
    });
  }

  async post(data) {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responseData = await response.json();

    return responseData;
  }

  put(data) {
    return new Promise((resolve, reject) => {
      fetch(this.url + "/" + data.id, {
        method: "PUT",
        body: JSON.stringify({
          name: data.name,
          completed: data.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      fetch(this.url + "/" + id, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
  }
}
