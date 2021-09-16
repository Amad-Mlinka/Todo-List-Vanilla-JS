document.addEventListener("DOMContentLoaded", function() {
    console.log("Loaded");
    const hamburger = document.getElementById("hamburger");
    console.log(hamburger)
    hamburger.addEventListener("click", function(){
        if(this.classList.contains("open")){
            this.classList.remove("open")
        }else{
            this.classList.add("open")
        }
        
    })
  });