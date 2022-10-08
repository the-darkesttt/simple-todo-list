const addItemForm = document.querySelector('.add-item-form');
const todoTasksList = document.querySelector('.todo-list');

const taskReference = {
    text: 'Feed the cat',
    checked: false,
};
const todoTasks = JSON.parse(localStorage.getItem('todoTasks')) || [taskReference];

addItemForm.addEventListener('submit', event => {

    event.preventDefault();
    const taskText = event.target.textInput.value;

    if (taskText != '') {
        const itemTask = {
            text: taskText,
            checked: false,
        };
        todoTasks.push(itemTask);
        localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
        generateTask(todoTasks, todoTasksList);
    
        console.log(itemTask)
        console.log(todoTasks)
    }
    
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
        </li>
        `;
    }).join('');
}

todoTasksList.addEventListener('click', ({target}) => {
    
    if (target.tagName != 'LABEL') {
        const clickedTaskId = target.dataset.index;
        todoTasks[clickedTaskId].checked = !todoTasks[clickedTaskId].checked;
        localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
        generateTask(todoTasks, todoTasksList);
    }
});

function displayTasks() {
    generateTask(todoTasks, todoTasksList);
}

displayTasks();