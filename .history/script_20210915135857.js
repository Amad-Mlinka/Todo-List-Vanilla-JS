var getTodos = async () => {
    var res = await fetch("https://jsonplaceholder.typicode.com/todos");
    var todosFull = await res.json();
    var todos = todosFull.slice(0, 20);
    console.log("Todos loaded")
    return todos;
}
var todoList = {
    todos: [],
    addTodo: function ({userId,id,title,completed}) {
        this.todos.push({
            userId:userId,
            id:id,
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

$(async ()=>{
    const hamburger = $("#hamburger")
    hamburger.click(function () {
       $(this).hasClass("open") ? $(this).removeClass("open") : $(this).addClass("open")
    })
    console.log("Hamburger loaded");

    const todos= await getTodos();
    todos.forEach(todo=>todoList.addTodo(todo))
    console.log(todoList)
    var todoItem=$("")
})

