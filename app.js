const menuBar = document.querySelector("header");
const formelement = document.querySelector(".search-form")

let mode = "open";


menuBar.addEventListener("click", (e)=>{
    let target = e.target;

    const menuContent = menuBar.querySelector(".nav")

    if(target.id == 'menu-btn' && mode === "open"){
        menuContent.classList.add("visible")
        menuContent.classList.remove("element-hidden")
        formelement.classList.add("element-hidden")
        
        menuBar.style.alignItems = "start"
        menuBar.style.position = "absolute"
        menuBar.style.width = "100vw"
        menuBar.style.height = "100vh"

        mode = "close"
        return
    }
    
    if(target.id == 'menu-btn' && mode === "close"){
        menuContent.classList.remove("visible")
        menuContent.classList.add("element-hidden")
        formelement.classList.remove("element-hidden")
        // menuContent.querySelector(".menu-content").style.display = "none"
        
        menuBar.style.position = ""
        menuBar.style.width = ""
        menuBar.style.height = ""
        menuBar.style.backgroundColor = "var(--color-white--smoke)"
       mode = "open"
        return
    }

    if(target.classList.contains("nav__item") && mode == "close"){
        menuContent.classList.remove("visible")
        menuContent.classList.add("element-hidden")
        formelement.classList.remove("element-hidden")
        // menuContent.querySelector(".menu-content").style.display = "none"
        menuBar.style.position = ""
        menuBar.style.width = ""
        menuBar.style.height = ""
        mode = "open"
        return
    }
});
