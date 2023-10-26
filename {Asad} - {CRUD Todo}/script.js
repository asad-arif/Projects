const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const inputBox = document.getElementById('input-box');
const olContent = document.getElementById('content-ol');
let dbReadValues = [];

//Load data from localstorage on startup
window.onload = function () {
  readFromDb();
  dbReadValues.forEach((value) => {
    createElement(value);
  });
};

//Add the task
function addTask() {
  let check = inputBox.value.trim();
  if (check !== '') {
    try {
      writeToDb(inputBox.value);
    } catch (err) {
      console.log('Sorry! Unable to add');
    }
  }
}

//Delete task from DOM and Local Storage
function deleteTask(taskDivElement) {
  taskDivElement.outerHTML = '';
  const innerLi = taskDivElement.querySelector('.myli');
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (localStorage.getItem(key) === innerLi.textContent) {
      localStorage.removeItem(key);
    }
  }
}

//Modify the task
function editTask(taskDivElement) {
  const innerLi = taskDivElement.querySelector('.myli');
  let oldText = innerLi.textContent;
  inputBox.value = oldText;
  addBtn.style.display = 'none';
  updateBtn.style.display = 'inline';

  updateBtn.addEventListener('click', () => {
    updateBtn.style.display = 'none';
    addBtn.style.display = 'inline';
    let newText = inputBox.value;
    innerLi.textContent = newText;
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (localStorage.getItem(key) === oldText) {
        localStorage.setItem(key, newText);
      }
    }
    clear();
  });
}

//Write data to Local Storage
function writeToDb(value) {
  let key = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  localStorage.setItem(key.toString(), value);
  createElement(value);
  readFromDb();
}

//Read data from Local Storage
function readFromDb() {
  let updatedArr = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    updatedArr.push(localStorage.getItem(key));
    dbReadValues = updatedArr;
  }
}

//Create Container and buttons
function createElement(elem) {
  const taskDivElement = document.createElement('div');
  const btnContainer = document.createElement('div');
  const completedBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const editBtn = document.createElement('button');
  const newLi = document.createElement('li');
  newLi.className = 'myli';
  newLi.textContent = elem;
  completedBtn.innerText = 'Completed';
  completedBtn.className = 'completed-btn';
  editBtn.innerText = 'Edit';
  editBtn.className = 'edit-btn';
  deleteBtn.innerText = 'Delete';
  deleteBtn.className = 'delete-btn';
  btnContainer.appendChild(completedBtn);
  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(deleteBtn);
  taskDivElement.appendChild(newLi);
  taskDivElement.append(btnContainer);
  taskDivElement.className = 'list-item';
  olContent.append(taskDivElement);
  completedBtn.addEventListener('click', () => {
    completed(newLi, taskDivElement);
  });
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskDivElement);
  });
  editBtn.addEventListener('click', () => {
    editTask(taskDivElement);
  });
  clear();
  taskDivElement.addEventListener('mouseover', () => {
    btnContainer.style.opacity = 1;
    btnContainer.style.transition = '0.1s ease-in-out';
  });
  taskDivElement.addEventListener('mouseout', () => {
    btnContainer.style.opacity = 0;
    btnContainer.style.transition = '0.1s ease-in-out';
  });
}

function reset() {
  let val = confirm('Are you sure to want reset the Todo-list?');
  if (val) olContent.innerHTML = '';
  localStorage.clear();
}
function clear() {
  inputBox.value = '';
}

function completed(liElement, taskDivElement) {
  taskDivElement.style.backgroundColor = '#ccf7ff';
  liElement.style.textDecoration = 'line-through';
}
