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
            categoryManager.hide();
            loader.show();
            
        });


    });


    socket.on("sendQuestions", obj =>{
        loader.hide();
        console.log(obj);
        
        let answerManager = new ChooseAnswer(obj);
        answerManager.show();
        $(".risp").on("click", (a) => {

            let b = a.currentTarget.attributes[0].value;
            console.log(a.currentTarget.id);
            $(`#${a.currentTarget.id}`).css({
                "border": "2px solid yellow"
            });
            socket.emit("answer", answerManager.answers[b[1]]);

            setTimeout(()=>{
                answerManager.hide();
                loader.show();
            }, 500);
            
            //socket.emit("choosenCategory", categoryManager.all[categoryManager.choosen[b[1]] - 9]);
            //answerManager.hide();
            //loader.show();

        });
    });

    


    
});

