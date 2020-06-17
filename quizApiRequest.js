const http = require("https");
const fetch = require("node-fetch")

module.exports = class QuizApi{
    constructor(){
        this.host = "opentdb.com";
    }

    randomCategory(){
        
        return new Promise(function (resolve, reject) {
            var req = http.request("https://opentdb.com/api_category.php", function (res) {
            // reject on bad status
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error("statusCode=" + res.statusCode));
                }
                // cumulate data
                var data = "";
                res.on("data", function (chunk) {
                    data+=chunk
                });
                // resolve on end
                res.on("end", function () {
                    let body = null;
                    try {
                        body = JSON.parse(data);
                        var arr = [];
                        while (arr.length < 5) {
                            var r = Math.floor(Math.random() * 24) + 9;
                            if (arr.indexOf(r) === -1) arr.push(r);
                        }
                        body = {
                            allCategories: body.trivia_categories,
                            choosenCategories: arr
                        }
                    } catch (e) {
                        reject(e);
                    }
                    resolve(body);
                });
            });
          // reject on request error
            req.on("error", function (err) {
            // This is not a "Second reject", just a different sort of failure
                reject(err);
            });
            
          // IMPORTANT
            req.end();
        });
    }




}