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
const test = (i) => {
    console.log(i)
}

const addTodo = (todo,i) => {
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
        todoList.deleteTodo($(this).attr("id"))
        console.log($(this).attr("id"))
        console.log(todoList.todos)
        $(this).parent().remove()
    })

    todoItem.append(checkDescription).append(todoDelete)
    list.append(todoItem)

}

$(async () => {
    const hamburger = $("#hamburger")
    hamburger.click(function () {
        $(this).hasClass("open") ? $(this).removeClass("open") : $(this).addClass("open")
    })
    console.log("Hamburger loaded");

    const todos = await getTodos();
    todos.forEach(todo => todoList.addTodo(todo))
    console.log(todoList)
    

    todoList.todos.forEach((todo, i) => {
        addTodo(todo,i)
    })

    $(".addBtnContainer").click(function () {
        if (!$(".newTask").hasClass("open")) {
            $(".newTask").addClass("open");   
             $(".addTaskBtn").html(" + Add task") ;         
        }else{
            if($(".newTaskInput").val()!=undefined)
            var todo={
                userId:Math.random(),
                id:Math.random(),
                title:$(".newTaskInput").val(),
                completed:false

            }
            todoList.addTodo(todo)
            addTodo(todo,todoList.todos.length)
        }

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