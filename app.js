const addItemForm = document.querySelector('.add-item-form');
const todoTasksList = document.querySelector('.todo-list');
const todoTitle = document.querySelector('.todo-title');
const todoFilters = document.querySelector('.todo-filtration');
const filterRadioBtns = document.querySelectorAll('.todo-filtration input[type="radio"]');

const taskReference = {
    text: 'Feed the cat',
    checked: false,
};

let todoTasks = JSON.parse(localStorage.getItem('todoTasks')) || [taskReference];

function update() {
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
    generateTask(filterTasks('All'), todoTasksList);
    filterRadioBtns.forEach(btn => btn.value != 'All' ? btn.checked = false : btn.checked = true);
    todoTitle.innerHTML = `Todo list (${todoTasks.length})`;
}

function addTask(event) {
    const taskText = event.target.textInput.value;

    if (taskText != '') {
        const itemTask = {
            text: taskText,
            checked: false,
        };
        todoTasks.push(itemTask);
        update();
    }
}

addItemForm.addEventListener('submit', event => {

    event.preventDefault();
    addTask(event);
    event.target.reset();

});

function generateTask(tasks, tasksList) {
    tasksList.innerHTML = tasks.map((task, index) => {
        return `
        <li>
            <label class='${task.checked ? 'li-checked' : ''}'>
                <input type="checkbox" data-index='${index}' ${task.checked ? 'checked' : ''}>
                ${task.text}
            </label>
            <i class="fa-solid fa-circle-xmark close-icon" data-index='${index}'></i>
        </li>
        `;
    }).join('');
}

todoTasksList.addEventListener('click', ({target}) => {
    
    if (target.tagName === 'INPUT') {
        const clickedTaskId = target.dataset.index;
        todoTasks[clickedTaskId].checked = !todoTasks[clickedTaskId].checked;
        update();
    }
    if (target.tagName === 'I') {
        const clickedTaskId = target.dataset.index;
        todoTasks.splice(clickedTaskId, 1);
        update();
    }

});

todoFilters.addEventListener('click', ({target}) => {
    if (target.tagName === 'INPUT') {
        const selectedFilter = target.value;
        generateTask(filterTasks(selectedFilter), todoTasksList);
    }
});

function filterTasks(filter) {
    const tasksCopy = [...todoTasks];

    switch(filter) {
        case 'All':
            return tasksCopy;
        case 'Unfinished':
            return tasksCopy.filter(task => task.checked == false);
        case 'Finished':
            return tasksCopy.filter(task => task.checked == true);
    }
}   

update();