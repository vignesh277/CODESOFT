const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', addTask);
function addTask() {
    const task = taskInput.value.trim();
    if (!task) {
        alert('Please enter a task');
        return;
    }

    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
    taskInput.value = '';
    taskInput.focus(); 
    saveTasks();
}

function createTaskItem(task) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', deleteTask);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('editButton'); 
    editButton.addEventListener('click', editTask);

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    li.appendChild(span); 
    li.appendChild(buttonGroup); 
    return li;
}

function deleteTask(event) {
    const taskItem = event.target.closest('li'); 
    taskItem.remove();
    saveTasks();
}

function editTask(event) {
    const taskItem = event.target.closest('li');
    const taskSpan = taskItem.querySelector('span');
    const taskText = taskSpan.textContent;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskText;

    taskItem.replaceChild(editInput, taskSpan);
    editInput.focus();

    editInput.addEventListener('blur', () => saveEdit(editInput)); 
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit(editInput);
        }
    });
}

function saveEdit(editInput) {
    const taskItem = editInput.closest('li');
    const newTaskText = editInput.value.trim();

    if (newTaskText !== '') {
        const span = document.createElement('span');
        span.textContent = newTaskText;

        taskItem.replaceChild(span, editInput); 
        saveTasks(taskItem);
    } else {
        alert('Please enter a task');
    }
}

function saveTasks(editedTaskItem = null) {
    let tasks = localStorage.getItem('tasks'); 
    if (tasks) {
        tasks = JSON.parse(tasks);
    } else { 
        tasks = [];
    }

    if (editedTaskItem) {
        const taskIndex = tasks.findIndex(task => 
               task === editedTaskItem.querySelector('span').textContent);

        if (taskIndex !== -1) { 
            tasks[taskIndex] = editedTaskItem.querySelector('span').textContent;  
        }
    } 

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        JSON.parse(storedTasks).forEach(task => {
            const taskItem = createTaskItem(task);
            taskList.appendChild(taskItem);

            taskItem.querySelector('.editButton').addEventListener('click', editTask);
            taskItem.querySelector('.deleteButton').addEventListener('click', deleteTask);
        }); 
    }
}

loadTasks(); 
