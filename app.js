const todoInput = document.querySelector('.todo-input'),
    todoButton = document.querySelector('.todo-button'),
    todoList = document.querySelector('.todo-list'),
    filterOption = document.querySelector('.filter-todo');


// добавления заметок
todoButton.addEventListener('click', addTodo);
// удаление заметок
todoList.addEventListener('click', deleteCheck);
// распределение заметок в зависимости от выбора option
filterOption.addEventListener('click', filterTodo);

document.addEventListener('DOMContentLoaded', getTodos);

function addTodo(event) {
    event.preventDefault();
    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Создаем li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Добавляем заметку в localstorage
    saveLocalStorage(todoInput.value);

    // Кнопка галочки
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Кнопка удаления
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Добавить в список
    todoList.appendChild(todoDiv);
    // Очистить value input
    todoInput.value = '';
    
}

function deleteCheck(e) {
    const item = e.target;
    // удаление todo

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLovalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    // Выбрать в выполненное

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = document.querySelectorAll('.todo');
    // i finr childrens with selector alll
    todos.forEach((todo) => {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
         // todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Создаем li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Кнопка галочки
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Кнопка удаления
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // Добавить в список
        todoList.appendChild(todoDiv);
    })
}

function removeLovalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}