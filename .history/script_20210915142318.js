var getTodos = async () => {
    var res = await fetch("https://jsonplaceholder.typicode.com/todos");
    var todosFull = await res.json();
    var todos = todosFull.slice(0, 20);
    console.log("Todos loaded")
    return todos;
}
var todoList = {
    todos: [],
    addTodo: function ({ userId, id, title, completed }) {
        this.todos.push({
            userId: userId,
            id: id,
            title: title,
            completed: completed,
        });
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
};

$(async () => {
    const hamburger = $("#hamburger")
    hamburger.click(function () {
        $(this).hasClass("open") ? $(this).removeClass("open") : $(this).addClass("open")
    })
    console.log("Hamburger loaded");

    const todos = await getTodos();
    todos.forEach(todo => todoList.addTodo(todo))
    console.log(todoList)
    var list=$(".todoData")

    todoList.todos.forEach((todo, i) => {
        console.log(todo)
        var todoItem = $(`<div class="todoItem">
            <div class="checkDescription">
                <div class="todoCheck"><input  type="checkbox" checked="${todo.completed}" class="checkCircle"></input></div>
                <div class="todoDescription">
                    <span class="todoText">${todo.title}</span>
                </div>
            </div>

            <div class="todoDelete">
                <img
                    class="deleteIcon"
                    src="/public/images/trash.png"
                    alt=""
                />
                <div class="deleteTooltip"></div>
            </div>
        </div>`);
        list.append(todoItem)


    })


})

/*
 <div class="todoItem">
              <div class="checkDescription">
                <div class="todoCheck"><input type="checkbox" defaultchecked="false" class="checkCircle"></input></div>
                <div class="todoDescription">
                  <span class="todoText">Some kind of todo</span>
                </div>
              </div>

              <div class="todoDelete">
                  <img
                    class="deleteIcon"
                    src="/public/images/trash.png"
                    alt=""
                  />
                <div class="deleteTooltip"></div>
              </div>
            </div>
*/