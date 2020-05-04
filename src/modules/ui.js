import { addAnimate } from "./animate";

export class UI {
  constructor() {
    this.state = {
      totalTask: 0,
      completedTask: 0,
    };
    this.taskList = document.querySelector(".taskList");
    this.createdTaskCount = document.querySelector(".createdTaskCount");
    this.completedTaskCount = document.querySelector(".completedTaskCount");
  }

  addAllTasksToPage(data) {
    data.map(todo => this.addTaskToPage(todo));
    this.state = {
      totalTask: data.length,
      completedTask: data.filter(todo => todo.completed === true).length,
    };
    this.updateTotalTaskCount();
    this.updateCompletedTaskCount();
  }

  addNewTaskToPage(data) {
    this.addTaskToPage(data);
    this.updateTotalTaskCount();
  }

  addTaskToPage(todo) {
    const newTaskHtml = `
        <li>
            <div class="${
              this.state.totalTask > 1 ? "class='animated bounceIn faster'" : ""
            } custom-control custom-checkbox">
                <input type="checkbox" name="checkbox" class="custom-control-input" id="${
                  todo.id
                }" ${todo.completed ? "checked" : ""}>
                <label class="custom-control-label" for="${todo.id}">${
      todo.name
    }</label>
                <a href="javascript:void(0)" class="btn btnDelete" >
                    <i class="fas fa-trash-alt" title="Sil"></i>
                </a>
            </div>
        </li>
    `;
    this.taskList.insertAdjacentHTML("afterbegin", newTaskHtml);
  }

  updateTotalTaskCount() {
    this.createdTaskCount.textContent = this.state.totalTask;
    addAnimate(this.createdTaskCount, "bounceIn", "faster");
  }
  updateCompletedTaskCount() {
    this.completedTaskCount.textContent = this.state.completedTask;
    addAnimate(this.completedTaskCount, "bounceIn", "faster");
  }

  deleteTaskFromPage(todo) {
    todo.remove();
  }

  clearInput(input) {
    input.value = "";
  }
}
