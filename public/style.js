

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#del").addEventListener("click", ()=>{
        
        console.log("clicked");
        console.log(document.querySelector("#del").classList);
        document.querySelector("#del").classList.add("hidden")
        document.querySelector("body").classList.add("bg");
        setTimeout(() => {
            document.querySelector("body").classList.remove("bg");

            document.querySelector("#del").classList.remove("hidden")
        }, 1000);
    });
});
