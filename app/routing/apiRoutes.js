var allFriends = require("../data/friends.js")


module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(allFriends)
    });

    var matchName = '';
    var matchImage = '';
    var totalDifference = 10000;

    app.post("/api/friends", function(req, res){
        var userInput = req.body;
        var userScores = req.body.scores;
        for (var i = 0; i < allFriends.length; i++) {
			var diff = 0;
			for (var j = 0; j < userScores.length; j++) {
				diff += Math.abs(allFriends[i].scores[j] - userScores[j]);
			}
			if (diff < totalDifference) {

				totalDifference = diff;
				matchName = allFriends[i].name;
				matchImage = allFriends[i].photo;
			}
		}
		allFriends.push(userInput);
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};