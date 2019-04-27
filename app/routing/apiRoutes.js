 
var spookList = require('../data/friend.js');

module.exports = function(app){
 
  app.get('/api/friend', function(req,res){
    res.json(spookList);
  });

  app.post('/api/friend', function(req,res){
    
    var newSpookScores = req.body.scores;
    var scoresArray = [];
    var bestMatch = 0;

   
    for(var i=0; i<spookList.length; i++){
      var scoresDiff = 0;
       
      for(var j=0; j<newSpookScores.length; j++){
        scoresDiff += (Math.abs(parseInt(spookList[i].scores[j]) - parseInt(newSpookScores[j])));
      }
 
      scoresArray.push(scoresDiff);
    }

     
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

     
    var bestSpook = spookList[bestMatch];
    res.json(bestSpook);

     
    spookList.push(req.body);
  });
};