const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const inputBox = document.getElementById('input-box');
const olContent = document.getElementById('content-ol');
let serverData = [];
let dbReadValues = [];

// Load data from localstorage on startup
window.onload = function () {
  if (localStorage.length === 0) {
    flag = confirm('Do you want to load server data?');
    if (flag) {
      getServerData();
    }
  } else {
    // let flag = false;
    // flag = confirm('Do you want to load server data?');
    // if (flag) {
    //   getServerData();
    // } else {
    //   readFromDb();
    // }
    readFromDb();
  }
  dbReadValues.forEach((value) => {
    createElement(value.value, value.styleCheck);
  });
};
////////////////////////////////
//Get and Preprocess server data
async function getServerData() {
  let response = await fetch(
    'https://jsonplaceholder.typicode.com/users/1/todos'
  );
  let data = await response.json();
  serverData = [...data];
  serverData.forEach((Element) => {
    writeToDb(Element.title, Element.id, Element.completed);
  });
}

//////////////////////////////////
// send and store data to server()
// function sendToServer() {
//   fetch('https://jsonplaceholder.typicode.com/users/1/todos', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       id: 444,
//       title: 'Lorem Ipsum',
//       completed: false,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       writeToDb(data.title, data.id, data.completed);
//     });
// }
// sendToServer();

//Add the task
function addTask() {
  let taskValue = inputBox.value.trim();
  if (taskValue !== '') {
    try {
      writeToDb(taskValue, null, false);
    } catch (err) {
      console.log('Sorry! Unable to add');
    }
  }
}

// Delete task from DOM and Local Storage
function deleteTask(taskDivElement) {
  const innerLi = taskDivElement.querySelector('.myli');
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let val = JSON.parse(localStorage.getItem(key)).value;
    if (val === innerLi.textContent) {
      localStorage.removeItem(key);
    }
  }
  taskDivElement.remove();
}

//Modify the task
function editTask(taskDivElement) {
  const innerLi = taskDivElement.querySelector('.myli');
  var oldText = innerLi.textContent;
  inputBox.value = oldText;
  addBtn.style.display = 'none';
  updateBtn.style.display = 'inline';

  function updateTask() {
    updateBtn.style.display = 'none';
    addBtn.style.display = 'inline';
    var newText = inputBox.value;
    innerLi.textContent = newText;
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let content = JSON.parse(localStorage.getItem(key));
      if (content.value == oldText) {
        content.value = newText;
        const updatedStyle = JSON.stringify(content);
        localStorage.setItem(key, updatedStyle);
      }
    }
    clear();
    // Remove the click event listener to avoid multiple listeners
    updateBtn.removeEventListener('click', updateTask);
  }
  updateBtn.addEventListener('click', updateTask);
}

//Write data to Local Storage
function writeToDb(taskValue, mykey, completed) {
  let key = undefined;
  if (mykey == null) {
    key = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  } else {
    key = mykey;
  }
  localStorage.setItem(
    key.toString(),
    JSON.stringify({
      value: `${taskValue}`,
      styleCheck: completed,
    })
  );
  readFromDb();
  let readLocalV = JSON.parse(localStorage.getItem(key)).value;
  let readLocalS = JSON.parse(localStorage.getItem(key)).styleCheck;
  createElement(readLocalV, readLocalS);
}

//Read data from Local Storage and create array of object
function readFromDb() {
  let updatedArr = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let content = JSON.parse(localStorage.getItem(key));
    updatedArr.push({
      id: `${key}`,
      value: `${content.value}`,
      styleCheck: content.styleCheck,
    });
  }
  dbReadValues = updatedArr;
}

//Create Container and buttons
function createElement(readLocalV, styleCheck) {
  const taskDivElement = document.createElement('div');
  const btnContainer = document.createElement('div');
  const completedBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const editBtn = document.createElement('button');
  const newLi = document.createElement('li');
  newLi.className = 'myli';
  newLi.textContent = readLocalV;
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
  //for new element

  completedBtn.addEventListener('click', () => {
    completed(newLi, taskDivElement, true);
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let val = JSON.parse(localStorage.getItem(key));
      if (val.value == readLocalV) {
        val.styleCheck = true;
        const updatedStyle = JSON.stringify(val);
        localStorage.setItem(key, updatedStyle);
      }
      readFromDb();
    }
  });

  if (styleCheck) {
    completed(newLi, taskDivElement, styleCheck);
  }

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

function completed(liElement, taskDivElement, styleCheck) {
  if (styleCheck) {
    taskDivElement.style.backgroundColor = '#ccf7ff';
    liElement.style.textDecoration = 'line-through';
  }
}
