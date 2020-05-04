import "./modules/libs";
import logo from "./assets/svg/todox_logo.svg";
import { addAnimate } from "./modules/animate";
import { Request } from "./modules/request.firebase";
import { UI } from "./modules/ui";

const inputTask = document.getElementById("input-task");
const addButton = document.querySelector(".btnAdd");
const logoContainer = document.getElementById("logo");

const request = new Request();
const ui = new UI();

eventListener();

function eventListener() {
  logoContainer.src = logo;
  document.addEventListener("DOMContentLoaded", getTask);
  addButton.addEventListener("click", addTask);
  inputTask.addEventListener("keyup", valueControl);
}

function getTask() {
  request
    .get()
    .then(data => ui.addAllTasksToPage(data))
    .then(() => {
      checkboxControl();
      deleteTask();
    });
}

function addTask(e) {
  const inputValue = inputTask.value.trim();
  if (inputValue) {
    const newTaskData = {
      name: inputTask.value.trim(),
      completed: false,
    };
    request
      .post(newTaskData)
      .then(() => {
        ui.state.totalTask++;
        ui.addNewTaskToPage(newTaskData);
        ui.clearInput(inputTask);
      })
      .then(() => {
        const checkedButton =
          ui.taskList.firstElementChild.children[0].firstElementChild;
        checkboxControlAfterAddTask(checkedButton);
      })
      .catch(err => console.log(err));
  } else {
    valueControl(e);
  }

  e.preventDefault();
}

function valueControl(e) {
  if (e.keyCode == 13) {
    return false;
  }
  if (e.target.value) {
    if (inputTask.classList.contains("invalid-input-value")) {
      inputTask.classList.remove("invalid-input-value");
      document.querySelector(".invalid-feedback").style.display = "none";
    }
  } else {
    inputTask.classList.add("invalid-input-value");
    document.querySelector(".invalid-feedback").style.display = "block";
  }
  e.preventDefault();
}

function checkboxControlAfterAddTask(checkedButton) {
  checkedButton.addEventListener("change", e => {
    const updateInfo = {
      id: e.target.id,
      name: e.target.nextElementSibling.textContent,
    };
    changeTaskStatus(e, updateInfo);
  });
}

function checkboxControl() {
  const inputCheckbox = document.querySelectorAll("input[name=checkbox]");

  inputCheckbox.forEach(check => {
    check.addEventListener("change", e => {
      const updateInfo = {
        id: e.target.id,
        name: e.target.nextElementSibling.textContent,
      };
      changeTaskStatus(e, updateInfo);
    });
  });
}

function changeTaskStatus(e, updateInfo) {
  if (e.target.checked) {
    e.target.checked = true;
    addAnimate(e.target.nextElementSibling, "pulse", "faster");
    updateInfo.completed = true;
    ui.state.completedTask++;
    request.put(updateInfo).then(() => ui.updateCompletedTaskCount());
  } else {
    e.target.checked = false;
    addAnimate(e.target.nextElementSibling, "pulse", "faster");
    updateInfo.completed = false;
    ui.state.completedTask--;
    request.put(updateInfo).then(() => ui.updateCompletedTaskCount());
  }
}

function deleteTask() {
  $(document).on("click", ".btnDelete", e => {
    let inputInfo = e.target.parentElement.firstElementChild;
    let allRow = e.target.parentElement.parentElement;
    bootbox.confirm({
      size: "small",
      message: "Silmek istediğinize emin misiniz?",
      closeButton: false,
      centerVertical: false,
      buttons: {
        cancel: {
          label: "Vazgeç",
          className: "btn-outline-default",
        },
        confirm: {
          label: "SİL",
          className: "btn-danger",
        },
      },
      callback: result => {
        if (result) {
          request.delete(inputInfo.id).then(() => {
            ui.state.totalTask--;
            if (inputInfo.checked) {
              ui.state.completedTask--;
              ui.updateCompletedTaskCount();
            }
            ui.updateTotalTaskCount();
            ui.deleteTaskFromPage(allRow);
          });
        }
      },
    });
  });
}
