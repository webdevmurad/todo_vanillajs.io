const todoInput = document.querySelector('.todo-input'),
    todoButton = document.querySelector('.todo-button'),
    todoList = document.querySelector('.todo-list'),
    filterOption = document.querySelector('.filter-todo');


// добавления заметок
todoButton.addEventListener('click', addTodo);
// удаление заметок
todoList.addEventListener('click', deleteCheck);
// распределение заметок в зависимости от выбора option
filterOption.addEventListener('click', filterTodo)

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
    const todos = todoList.childNodes;
}