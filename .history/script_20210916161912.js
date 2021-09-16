var todoList = {/*Object with methods for adding,removing and toggling todos */
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
    editTodo: function (position, text) {
        var todo = this.todos[position];
        todo.title = text;
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
};
const getTodos = async () => {/* Function for populating the todo list with generated results and adding them to local storage */
    var res = await fetch("https://jsonplaceholder.typicode.com/todos");
    var todosFull = await res.json();
    var todos = todosFull.slice(0, 20);
    todos.each((todo)=>todoList.addTodo(todo))
    localStorage.setItem('todoList', JSON.stringify(todoList.todos));
    console.log("Todos loaded")
    return todos;
}


const updateLocalStorage = (option, todo) => {/*Function for adding and removing items from local storage: Option-Either add or delete(optional) / todo-Either index in case of deleting or a todo object in case of adding */
    if (option === "add") {
        var newResults = JSON.parse(localStorage.getItem("todoList"))
        newResults.push(todo);
        localStorage.setItem("todoList", JSON.stringify(newResults))

    } else if (option === "delete") {
        console.log(todo)
        var newResults = JSON.parse(localStorage.getItem("todoList"))
        newResults.splice(todo, 1)
        console.log(newResults)
        localStorage.setItem("todoList", JSON.stringify(newResults))
    }
}

const renderTodoItem = (todo, i) => {/*Function for populating the view with todos and assigning event listeners */
    var list = $(".todoDatalist")
    var todoItem = $(`<div></div>`).addClass("todoItem").attr("id", i);
    var checkDescription = $("<div></div>").addClass("checkDescription")
    var todoCheck = $("<div></div>").addClass("todoCheck");
    var input = $("<input></input>").addClass("checkCircle").attr("type", "checkbox").attr("id", i)
    todo.completed ? input.attr("checked", "") : null;
    var todoDescription = $("<input></input>").addClass("todoDescription").attr("placeholder", todo.title)

    todoCheck.append(input)



    checkDescription.append(todoCheck).append(todoDescription)

    var todoDelete = $("<div></div>").addClass("todoDelete").attr("id", i)
    var deleteIcon = $("<img></img>").addClass("deleteIcon").attr("src", "/public/images/trash.png")
    var deleteWarning = $("<div></div>").addClass("deleteWarning").text("Are you sure?")
    var decision = $("<div></div>").addClass("deleteWarningDecision")
    var yes = $("<span></span>").addClass("decision").addClass("decisionYes").text("Yes");
    var no = $("<span></span>").addClass("decision").addClass("decisionNo").text("No");
    decision.append(yes).append(no)
    deleteWarning.append(decision)

    todoDelete.append(deleteIcon).append(deleteWarning)

    input.change(function () {
        todoList.toggleCompleted($(this).attr("id"))
    })

    todoDescription.change(function () {
        console.log($(this).val())
        todoList.editTodo($(this).parent().parent().attr("id"), $(this).val())
    })

    todoDelete.click(function () {
        $(".todoItem").each(function () {
            if ($(this).find(".deleteWarning")) {
                $(this).find(".deleteWarning").hide()
            }
        })
        $(this).find(".deleteWarning").show();

        setInterval(() => {
            $(this).find(".deleteWarning").hide()
        }, 3000)


        $(this).find(".decisionYes").click(() => {
            deleteTodo($(this).attr("id"))
        })

        $(this).find(".decisionNo").click(() => {
            console.log($(this))
            $(this).find(".deleteWarning").hide()
        })

    })

    todoItem.append(checkDescription).append(todoDelete)
    list.append(todoItem)
}

const addTodo = (todo, i, makeNew) => {/*Function that adds todos to the list and storage */
    renderTodoItem(todo, i)
    if (makeNew) {
        todoList.addTodo(todo)
        updateLocalStorage("add", todo)
    }
}

const deleteTodo = (i) => {/*Function that removes todos to the list and storage */
    todoList.deleteTodo(i)
    updateLocalStorage("delete", i)
    $("#" + i).remove();
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

                addTodo(todo, todoList.todos.length, true)
                $(".newTaskInput").val("")
            }
        }

    })


})
