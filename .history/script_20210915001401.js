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

    fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
        // The API call was successful!
        console.log('success!', response.json());
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
});