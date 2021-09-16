var getTodos = async () => {
    var res = await fetch("https://jsonplaceholder.typicode.com/todos");
    var todosFull = await res.json();
    var todos = todosFull.slice(0, 20);
    console.log("Todos loaded")
    return todos;
}
var todoList = {
    todos: [],
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos.
        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.todos.forEach(function (todo) {
            // Case 1: If everything’s true, make everything false.
            if (completedTodos === totalTodos) {
                todo.completed = false;
                // Case 2: Otherwise, make everything true.
            } else {
                todo.completed = true;
            }
        })
    }
};

$(()=>{
    const hamburger = document.getElementById("hamburger");
    hamburger.click(()=> {
        if (this.classList.contains("open")) {
            this.classList.remove("open")
        } else {
            this.classList.add("open")
        }
    })
    console.log("Hamburger loaded");
})

