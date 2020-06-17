$(document).ready(()=> {
    const loader = new Loader();
    let socket = io("");

    socket.on("connect", () => {
        console.log("you connected");
    });

    socket.on("disconnect", () => {
        console.log("you disconnected");
    });

    $(".startGame").on("click", () => {
        console.log("click");
        loader.show();
        socket.emit("gameStart");
    });

    socket.on("sendCategories", (res) => {
        loader.hide();
        $(".start").remove();
        let categoryManager = new ChooseCategory(res);
        console.log(res);
        categoryManager.show();
        
        $(".categoryButton").on("click", (a) => {
            let b = a.currentTarget.attributes[0].value;
            socket.emit("choosenCategory", categoryManager.all[categoryManager.choosen[b[1]]-9]);
            
        });


    });

    


    
});
