document.addEventListener('DOMContentLoaded', loadTodos);
document.getElementById('todo-form').addEventListener('submit', addTodo);

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo));
}

function addTodoToDOM(todoText) {
    const todoList = document.getElementById('todo-list');

    const li = document.createElement('li');
    li.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function () {
        todoList.removeChild(li);
        removeTodoFromLocalStorage(todoText);
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

function addTodoToLocalStorage(todoText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodoFromLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(e) {
    e.preventDefault();

    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText === '') return;

    addTodoToDOM(todoText);
    addTodoToLocalStorage(todoText);

    todoInput.value = '';
}