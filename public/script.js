let socket = io();


socket.on("connect", ()=>{
    console.log("you are connected to the magical server")
});


socket.on("disconnect", () => {
    console.log("you disconected. shame on you");
});

