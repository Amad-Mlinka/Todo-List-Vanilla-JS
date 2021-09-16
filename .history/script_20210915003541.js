var getTodos = async () => {
    var res = await fetch("https://jsonplaceholder.typicode.com/todos");
    var todosFull = await res.json();
    var todos=todosFull.slice(0, 20);
    console.log("Todos loaded")
    return todos;
}

document.addEventListener("DOMContentLoaded", async function () {
    const hamburger = document.getElementById("hamburger");
    hamburger.addEventListener("click", function () {
        if (this.classList.contains("open")) {
            this.classList.remove("open")
        } else {
            this.classList.add("open")
        }

    })
    console.log("Hamburger loaded");
    todos = await getTodos();
    console.log(todos)

    



});