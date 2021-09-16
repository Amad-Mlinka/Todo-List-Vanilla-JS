var getTodos= async () =>{
    var res=await fetch("https://jsonplaceholder.typicode.com/todos");
    var todos=await res.json();
    return todos;
}


document.addEventListener("DOMContentLoaded", function () {
    var todos;
    getTodos().then((data)=>{
        todos=data;
        console.log(data)
    })
    console.log(todos)
    console.log("Loaded");
    const hamburger = document.getElementById("hamburger");
    console.log(hamburger)
    hamburger.addEventListener("click", function () {
        if (this.classList.contains("open")) {
            this.classList.remove("open")
        } else {
            this.classList.add("open")
        }

    })

});