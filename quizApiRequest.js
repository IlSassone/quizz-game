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

    getQuestion(qNumber, qCategory, qDifficulty, qType ){
        return new Promise(function (resolve, reject) {
            var req = http.request(`https://opentdb.com/api.php?amount=${qNumber}&category=${qCategory}&difficulty=${qDifficulty}&type=${qType}`, function (res) {
                // reject on bad status
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error("statusCode=" + res.statusCode));
                }
                // cumulate data
                var data = "";
                res.on("data", function (chunk) {
                    data += chunk
                });
                // resolve on end
                res.on("end", function () {
                    let body = null;
                    try {
                        body = JSON.parse(data);
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

    formatQuestion(res){
        
        var arr = [];
        while (arr.length < 4) {
            var r = Math.floor(Math.random() * 4);
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        let answers = [];
        for (let i = 0; i<arr.length; i++){
            if(arr[i]==3) answers.push(res.results[0].correct_answer);
            else {
                answers.push(res.results[0].incorrect_answers[arr[i]]);
            }
        }

        
        return {
            "question": res.results[0].question,
            "answers": answers
        }
    }



}