var spooksData = require("../data/friend");
 


module.exports = function (app) {

    app.get("/api/friend", function (req, res) {
        res.json(spooksData);
    });

    app.post("/api/friend", function (req, res) {

        var newSpook = req.body;
        var diffArr= [];
        for (var i = 0; i < spooksData.length; i++) {
            var sum = 0;
            for (var j = 0; j < spooksData[i].scores.length; j++) {
                sum += Math.abs(parseInt(newSpook.scores[j]) - parseInt(spooksData[i].scores[j]));
            }
            diffArr.push(sum);
        }

        var spookSelected = 0;
        var spookValue= parseInt(diffArr[0]);
        for (var k = 1; k < diffArr.length; k++) {
            if (parseInt(diffArr[k]) < spookValue) {
                spookSelected = k;
                spookValue=parseInt(diffArr[k]);
            }
        }

       spooksData.push(newSpook);
        res.send(spooksData[spookSelected]);
    });

};