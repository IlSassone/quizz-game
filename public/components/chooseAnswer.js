
class ChooseAnswer{
    constructor(obj){
        this.question = obj.question;
        this.answers = obj.answers;
        this.isThere = false;
        this.class = "chooseAnswer";
        this.choose = this.compose();
        
    }

    compose(){
        let pippux = [];

        for(let i = 0; i<this.answers.length; i++){
            pippux.push({
                elementName: "div",
                id: "a"+i,
                className: "col s12 l6 risp",
                child: {
                    elementName: "span",
                    className: "testoRisp",
                    text: this.answers[i],
                }
            });
        }
        let x = {
            elementName: "div",
            className: `row ${this.class} `,
            child: {
                elementName: "div",
                className: "col s12",
                style: "text-align: center;",
                children: [
                    {
                        elementName: "div",
                        className: "title",
                        text: this.question,
                    },
                    {
                        elementName: "div",
                        className: "row",
                        children: pippux
                    }
                ]
            }

        }

        return JSONtoHTML.transform(x);
    }
    show() {
        if (!this.isThere) {
            console.log(this.choose);

            $(".container").append(this.choose);
            this.isThere = !this.isThere;
        }
    }
    hide() {
        if (this.isThere) {
            $("."+this.class).fadeOut();
            setTimeout(() => {
                $("."+this.class).remove()
            }, 500);

            this.isThere = !this.isThere;
        }
    }

}