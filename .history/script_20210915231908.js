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
const getTodos = async () => {
    var res = await fetch("https://jsonplaceholder.typicode.com/todos");
    var todosFull = await res.json();
    var todos = todosFull.slice(0, 20);
    localStorage.setItem('todoList', JSON.stringify(todos));
    console.log("Todos loaded")
    return todos;
}

const renderTodo = (todo, i) => {
    var list = $(".todoDatalist")
    var todoItem = $(`<div></div>`).addClass("todoItem").attr("id", i);
    var checkDescription = $("<div></div>").addClass("checkDescription")
    var todoCheck = $("<div></div>").addClass("todoCheck");
    var input = $("<input></input>").addClass("checkCircle").attr("type", "checkbox").attr("id", i)
    todo.completed ? input.attr("checked", "") : null;
    var todoDescription = $("<div></div>").addClass("todoDescription").text(todo.title)

    todoCheck.append(input)

    checkDescription.append(todoCheck).append(todoDescription)

    var todoDelete = $("<div></div>").addClass("todoDelete").attr("id", i)
    var deleteIcon = $("<img></img>").addClass("deleteIcon").attr("src", "/public/images/trash.png")

    todoDelete.append(deleteIcon)

    input.change(function () {
        todoList.toggleCompleted($(this).attr("id"))
    })

    todoDelete.click(function () {
        removeTodo($(this).attr("id"))

        $(this).parent().remove()
    })

    todoItem.append(checkDescription).append(todoDelete)
    list.append(todoItem)
}

const addTodo = (todo, i, makeNew) => {
    renderTodo(todo, i)
    if (makeNew) {
        var newResults = JSON.parse(localStorage.getItem("todoList"))
        newResults.push(todo);
        localStorage.setItem("todoList", JSON.stringify(newResults))
        console.log(JSON.parse(localStorage.getItem("todoList")))
    }
}

const removeTodo = (i) => {
    todoList.deleteTodo(i)
    var newResults = JSON.parse(localStorage.getItem("todoList"))
    newResults.splice($(this).attr("id"), 1)
    localStorage.setItem("todoList", JSON.stringify(newResults))
}

const resetStorage = () => {
    localStorage.removeItem("todoList")
}

$(async () => {

    const hamburger = $("#hamburger")
    hamburger.click(function () {
        $(this).hasClass("open") ? $(this).removeClass("open") : $(this).addClass("open")
        resetStorage()
    })
    console.log("Hamburger loaded");

    if (JSON.parse(localStorage.getItem("todoList")) == null) {
        var todos = await getTodos();
    } else {
        var todos = JSON.parse(localStorage.getItem("todoList"))
    }

    console.log(todos)
    todos.forEach(todo => todoList.addTodo(todo))
    console.log(todoList)


    todoList.todos.forEach((todo, i) => {
        addTodo(todo, i)
    })

    $(".addBtnContainer").click(function () {
        if (!$(".newTask").hasClass("open")) {
            $(".newTask").addClass("open");
            $(".addTaskBtn").html(" + Add task");
        } else {
            if ($(".newTaskInput").val() != "") {
                console.log($(".newTaskInput").val())
                var todo = {
                    userId: Math.random(),
                    id: Math.random(),
                    title: $(".newTaskInput").val(),
                    completed: false

                }
                todoList.addTodo(todo)
                addTodo(todo, todoList.todos.length, true)
                $(".newTaskInput").val("")
            }
        }

    })


})
