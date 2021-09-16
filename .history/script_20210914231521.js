document.addEventListener("DOMContentLoaded", function() {
    console.log("Loaded");
    const hamburger = document.getElementById("hamburger");
    console.log(hamburger)
    hamburger.addEventListener("click", function(e){
        console.log(e)
    })
  });