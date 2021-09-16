document.addEventListener("DOMContentLoaded", function () {
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

    fetch('https://jsonplaceholder.typicode.com/todos').then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        let todos=data.slice(0,20)
        console.log(todos);
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
});