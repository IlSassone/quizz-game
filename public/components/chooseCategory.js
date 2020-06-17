

class ChooseCategory {
    constructor(categories){
        
        this.all = categories.allCategories;
        this.choosen = categories.choosenCategories;


        this.isThere = false;
        this.choose = this.compose();
    }
    
    compose(){
        let buttons = [];
        for(let i = 0; i<this.choosen.length; i++){//compose buttons
            
            console.log(this.all[this.choosen[i] - 9]);
            
            buttons.push({
                elementName: "div",
                className: "row",
                child: {
                    elementName: "div",
                    className: "col s6 offset-s3 l2 offset-l4 ",
                    style: "text-align: center;",
                    child: {
                        elementName: "a",
                        id: "b"+i,
                        className: "waves-effect waves-light categoryButton btn blue darken-3",
                        style: "width: 20vw",
                        text: this.all[this.choosen[i] - 9].name.replace("Entertainment:", "").replace("Science:", ""),
                    },
                },
            });
        }
        //console.log(buttons);
        let x = {
            elementName: "div",
            className: "chooseCategory",
            children: buttons
        }
        return JSONtoHTML.transform(x);
        
    }

    show(){
        if (!this.isThere){
            console.log(this.choose);
            
            $(".container").append(this.choose);
            this.isThere = !this.isThere;
        }
    }
    



}