'use strict';

(function () {

  // СОЗДАНИЕ СПИСКА ДЕЛ
  function createTodoList() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // СОЗДАНИЕ ЗАГОЛОВКА ДЛЯ СПИСКА ДЕЛ
  function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // СОЗДАНИЕ ЭЛЕМЕНТОВ ФОРМЫ ДЛЯ ДОБАВЛЕНИЯ ДЕЛ
  function createTodoItemForm() {

    const form = document.createElement('form'),
      inp = document.createElement('input'),
      btn = document.createElement('button'),
      btnWrap = document.createElement('div');

    form.classList.add('input-group', 'mb-3');
    inp.classList.add('form-control');
    inp.placeholder = 'Введите название нового дела';
    btnWrap.classList.add('input-group-append');
    btn.classList.add('btn', 'btn-primary');
    btn.textContent = 'Добавить дело';

    btnWrap.append(btn);
    form.append(inp);
    form.append(btnWrap);

    btn.disabled = true;

    return {
      form,
      inp,
      btn,
    };

  }

  // СОЗДАНИЕ НОВОГО ДЕЛА
  function createTodoItem(name = 'dsaads') {
    const item = document.createElement('li'),
      btnGroup = document.createElement('div'),
      doneBtn = document.createElement('button'),
      delBtn = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    btnGroup.classList.add('btn-group', 'btn-group-sm');
    doneBtn.classList.add('btn', 'btn-success');
    doneBtn.textContent = 'Готово';
    delBtn.classList.add('btn', 'btn-danger');
    delBtn.textContent = 'Удалить';

    btnGroup.append(doneBtn);
    btnGroup.append(delBtn);
    item.append(btnGroup);

    return {
      item,
      doneBtn,
      delBtn,
    };
  }

  // // ЗАПОЛНЕНИЕ СПИСКА ДЕЛ ПРИ ЗАГРУЗКЕ СТР. ИЗ ЛОК. ХРАН.
  function fillListFromStorage(titleInner, list) {

    // ПРОВЕРКА, ЕСТЬ ЛИ ЧТО-НИБУДЬ В ХРАН.
    if (localStorage.getItem(titleInner)) {
      if (titleInner === 'Мои дела') {
        list.innerHTML = localStorage.getItem(titleInner);
      }
      else if (titleInner === 'Дела папы') {
        list.innerHTML = localStorage.getItem(titleInner);
      }
      else if (titleInner === 'Дела мамы') {
        list.innerHTML = localStorage.getItem(titleInner);
      }
    }

    // НАВЕШИВАНИЕ СОБЫТИЙ НА КНОПКИ
    document.querySelectorAll('.btn-success').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.parentElement.parentElement.classList.toggle('list-group-item-success');
        setTimeout(fillStorage, 500, titleInner, list);
      });
    });
    document.querySelectorAll('.btn-danger').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Вы уверены?')) {
          btn.parentElement.parentElement.remove();
        }
        setTimeout(fillStorage, 500, titleInner, list);
      });
    });

  }

  // ЗАПОЛНЕНИЕ ХРАНИЛИЩА СОДЕРЖИМЫМ СПИСКА
  function fillStorage(titleInner, list) {

    if (typeof list === 'object') {
      const todoListInner = list.innerHTML;
      if (titleInner === 'Мои дела') {
        localStorage.setItem(titleInner, todoListInner);
      }
      else if (titleInner === 'Дела папы') {
        localStorage.setItem(titleInner, todoListInner);
      }
      else if (titleInner === 'Дела мамы') {
        localStorage.setItem(titleInner, todoListInner);
      }
    }

    else {
      if (titleInner === 'Мои дела') {
        localStorage.setItem(titleInner, list);
      }
      else if (titleInner === 'Дела папы') {
        localStorage.setItem(titleInner, list);
      }
      else if (titleInner === 'Дела мамы') {
        localStorage.setItem(titleInner, list);
      }
    }

  }

  // МОМЕНТ ЗАГРУЗКИ СТРАНИЦЫ
  function createTodoApp(container, title = 'Список дел', todoListArr = null) {

    const body = document.body,
      todoAppTitle = createAppTitle(title),
      todoItemForm = createTodoItemForm(),
      todoList = createTodoList();

    body.style.background = 'rgb(156, 150, 150)';
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // ДОБАВЛЕНИЕ ДЕЛ ПО УМОЛЧАНИЮ, ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
    if (todoListArr !== null) {
      let todoItemOuter =
        localStorage.getItem(todoAppTitle.innerHTML) ? localStorage.getItem(todoAppTitle.innerHTML) : '',

        secondTodoItemOuter = '';
      for (const obj of todoListArr) {
        const todoItem = createTodoItem(obj.name);
        if (obj.done) {
          todoItem.item.classList.add('list-group-item-success');
        }
        todoItemOuter += todoItem.item.outerHTML;
        secondTodoItemOuter += todoItem.item.outerHTML;

        todoItem.doneBtn.addEventListener('click', () => {
          todoItem.item.classList.toggle('list-group-item-success');
        });

        todoItem.delBtn.addEventListener('click', () => {
          if (confirm('Вы уверены?')) {
            todoItem.item.remove();
          }
        });
      }
      if (secondTodoItemOuter === todoItemOuter) {
        fillStorage(todoAppTitle.innerHTML, todoItemOuter);
      }
    }

    fillListFromStorage(todoAppTitle.innerHTML, todoList);

    // СОБЫТИЕ ДОБАВЛЕНИЯ НОВОГО ДЕЛА
    todoItemForm.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const todoItem = createTodoItem(todoItemForm.inp.value);

      setTimeout(fillStorage, 500, todoAppTitle.innerHTML, todoList);

      if (!todoItemForm.inp.value) {
        return;
      }

      todoItemForm.btn.disabled = true;

      // СОБЫТИЕ НАЖАТИЯ НА "ГОТОВО"
      todoItem.doneBtn.addEventListener('click', () => {
        todoItem.item.classList.toggle('list-group-item-success');
        setTimeout(fillStorage, 500, todoAppTitle.innerHTML, todoList);
      });

      // СОБЫТИЕ НАЖАТИЯ НА "УДАЛИТЬ"
      todoItem.delBtn.addEventListener('click', () => {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
        }
        setTimeout(fillStorage, 500, todoAppTitle.innerHTML, todoList);
      });

      todoList.append(todoItem.item);
      todoItemForm.inp.value = '';
    });

    // СОБЫТИЕ ВВОДА ТЕКСТА В ИНПУТ (ПРИ ПУСТОМ ПОЛЕ КНОПКА БЛОКИРУЕТСЯ)
    todoItemForm.inp.addEventListener('input', () => {
      if (todoItemForm.inp.value) {
        todoItemForm.btn.disabled = false;
      } else {
        todoItemForm.btn.disabled = true;
      }
    });
  }

  window.createTodoApp = createTodoApp;
})();
