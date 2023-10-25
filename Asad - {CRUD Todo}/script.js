const addBtn = document.getElementById('add-btn');
const inputBox = document.getElementById('input-box');
const olContent = document.getElementById('content-ol');

function addTask() {
  if (inputBox.value !== '') {
    try {
      const liContainer = document.createElement('div');
      const btnContainer = document.createElement('div');
      const completedBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');
      const newLi = document.createElement('li');
      completedBtn.innerText = 'Completed';
      completedBtn.className = 'completed-btn';
      deleteBtn.innerText = 'Delete';
      deleteBtn.className = 'delete-btn';
      newLi.innerText = inputBox.value;

      btnContainer.appendChild(completedBtn);
      btnContainer.appendChild(deleteBtn);
      liContainer.appendChild(newLi);
      liContainer.append(btnContainer);
      liContainer.className = 'list-item';
      olContent.append(liContainer);
      var btns = document.querySelectorAll('.list-item')[0].children[1];

      // Save the task list to localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(inputBox.value);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      completedBtn.addEventListener('click', () => {
        completed(newLi, liContainer);
      });
      deleteBtn.addEventListener('dblclick', () => {
        deleteContainer(liContainer);
      });
      clear();
      liContainer.addEventListener('mouseover', () => {
        btnContainer.style.opacity = 1;
        btnContainer.style.transition = '0.1s ease-in-out';
      });
      liContainer.addEventListener('mouseout', () => {
        btnContainer.style.opacity = 0;
        btnContainer.style.transition = '0.1s ease-in-out';
      });
    } catch (err) {
      console.log('Sorry! Unable to add');
    }
  }
}
function reset() {
  let val = confirm('Are you sure to want reset the Todo-list?');
  if (val) olContent.innerHTML = '';
}
function clear() {
  inputBox.value = '';
}

function completed(liElement, liContainer) {
  liContainer.style.backgroundColor = '#ccf7ff';
  liElement.style.textDecoration = 'line-through';
}
function deleteContainer(liContainer) {
  liContainer.outerHTML = '';
}
