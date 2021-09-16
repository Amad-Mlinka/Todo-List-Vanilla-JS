var getTodos= async () =>{
    var res=await fetch("https://jsonplaceholder.typicode.com/todos");
    var todos=await res.json();
    return todos;
}

document.addEventListener("DOMContentLoaded", async function () {    
    todos = await getTodos()
    })
    console.log("Loaded");
    const hamburger = document.getElementById("hamburger");
    console.log(hamburger)
    hamburger.addEventListener("click", function () {
        if (this.classList.contains("open")) {
            this.classList.remove("open")
            console.log(todos)
        } else {
            this.classList.add("open")
        }

    })
    

});