/* jshint esversion:9  */

class JSONtoHTML{
    static transform(jsonData){
        let x = document.createElement(jsonData.elementName);
        
        for (const property in jsonData) {

            if (property != "elementName" && property != "child" && property != "children" && property != "text") {
                try {
                    eval(`x.${property}="${jsonData[property]}"`);
                } catch (error) {
                    console.error(` Cannot set property: ${property} because it's not a property`);
                }
                

            }
            if (property == "text"){
                let text = document.createTextNode(jsonData[property]);
                x.appendChild(text);
            }
            if(property == "child"){
                x.appendChild(JSONtoHTML.transform(jsonData.child));
            }
            if (property == "children") {
                for(let i = 0; i<jsonData.children.length; i++){
                    x.appendChild(JSONtoHTML.transform(jsonData.children[i]));
                }
            }
            //console.log(`${property}: ${jsonData[property]}`);
        }

        return x;
    }
}   



