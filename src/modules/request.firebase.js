import firebase from "firebase";
import { firebaseConfig } from "./databaseConfig.firebase";
import { loader } from "./loader";

export class Request {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.ref = firebase.database().ref("/todox");
    this.taskList = document.querySelector(".taskList");
    this.state = {
      todos: [],
    };
  }

  get() {
    return new Promise((resolve, reject) => {
      loader(true, this.taskList);
      const { todos } = this.state;
      this.ref.once("value").then(snapshot => {
        snapshot.forEach(todo => {
          const item = {
            id: todo.key,
            name: todo.val().name,
            completed: todo.val().completed,
          };
          todos.push(item);
        });
        if (snapshot.exists()) {
          resolve(todos);
        } else {
          reject("Veri yok!!");
        }
        loader(false);
        console.log("get state.todos", this.state.todos);
      });
    });
  }

  async post(data) {
    this.ref
      .push(data)
      .endAt()
      .once("value", snap => {
        data.id = snap.key;
        this.state.todos.push(data);
      });
    console.log("post state.todos", this.state.todos);
  }

  async put(data) {
    this.state.todos.forEach(todo => {
      if (todo.id == data.id) {
        todo.completed = data.completed;
        const subRef = firebase.database().ref("/todox/" + todo.id);
        subRef.update({ completed: data.completed });
      }
    });
    console.log("put state.todos", this.state.todos);
  }

  async delete(id) {
    const { todos } = this.state;
    todos.forEach(todo => {
      if (todo.id == id) {
        todos.splice(todos.indexOf(todo), 1);
        const subRef = firebase.database().ref("/todox/" + todo.id);
        subRef.remove();
      }
    });
    console.log("delete state.todos", this.state.todos);
  }
}
