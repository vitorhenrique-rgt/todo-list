//Data base localStorage
const getData = () => JSON.parse(localStorage.getItem("toDo")) ?? [];
const setData = (dataBase) =>
  localStorage.setItem("toDo", JSON.stringify(dataBase));

//Add new task
const addTask = (event) => {
  if (event.target.value.length > 0 && event.key === "Enter") {
    let newTask = event.target.value;
    let dateTask = new Date();
    const dataBase = getData();
    console.log(dataBase.length)
    let id = dataBase.length > 0 ? dataBase[dataBase.length -1].id + 1 : 1;
    dataBase.push({
      id: id,
      task: newTask,
      status: "",
      date: dateTask,
    });
    setData(dataBase);
    event.target.value = "";
    listTask();
    displayTask(dataBase.length - 1);
  }
};

//Delete task
const deleteTask = (id) => {
  const dataBase = getData();
  dataBase.splice(index, 1);
  setData(dataBase);
  listTask();
  displayTask();
};

//Check task
const checkedTask = (index) => {
  setTimeout(() => {
    const dataBase = getData();
    dataBase[index].status = "checked";
    setData(dataBase);
    listTask();
    displayTask();
  }, 500);
};

//Update task
const updateTask = (index, task) => {
  const dataBase = getData();
  dataBase[index].task;
  setData(dataBase);
  listTask();
  displayTask(index);
};

const updateText = (event) => {
  console.log(event.target.value);
};

//List tasks
function listTask() {
  let bodyTaskList = document.querySelector(".list-task-body");
  const dataBase = getData();
  let bodyTaskListResult = dataBase
    .filter((dataBase) => dataBase.status === "")
    .map((dataBase) => {
      return (
        /*html*/
        `
      <div class="task">
        <input class="checkbox" type="checkbox" ${dataBase.status} data-id=${dataBase.id} onClick="checkedTask(${indexedDB})">
        <div class="task-content" data-id=${dataBase.id}  contenteditable ="true" onClick="displayTask(${indexedDB})">${dataBase.task}</div>
        <div class="delete"><i class="bi bi-trash" id="delete" for="delete" onClick="deleteTask(${dataBase.id})"></i></div>
      </div>
    `
      );
    });
  bodyTaskList.innerHTML = bodyTaskListResult.join("");
  console.log(bodyTaskListResult.length);
}

//Shows task details on the side of the page
const displayTask = (index) => {
  let bodyTaskDetails = document.querySelector(".task-details");
  if (index >= 0) {
    let dataBase = getData();
    let date = new Date(dataBase[index].date);
    let dateOptions = { day: "numeric", month: "long" };
    bodyTaskDetails.innerHTML =
      /*html*/
      `
  <div class="task-info">
  <div>
    <input type="checkbox" onClick="checkedTask(${index})">
    <span class="date"><i class="bi bi-calendar-event"></i>${date.toLocaleString(
      "pt-BR",
      dateOptions
    )}</span>
  </div>
  <div>
    <span class="priority"><i class="bi bi-flag"></i></span>
  </div>
</div>
<div class="task-text">${dataBase[index].task}</div>
  `;
  } else {
    bodyTaskDetails.innerHTML = "";
  }
};

listTask();
document.querySelector("#new-task").addEventListener("keypress", addTask);
