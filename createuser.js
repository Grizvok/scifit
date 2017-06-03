exports.createUser = function(req, res) {
	var userId = req.body.user;
    var pw = req.body.password;
    var gender = req.body.gender;
	    Promise.try(function() {
        return scrypt.hash(pw);
    }).then(function(hash) {
        var myHash = hash;


        pg.connect(conString, function(err, client, done) {
            var queryText = 'INSERT INTO clients.users (user_id, password, gender) VALUES ($1, $2, $3)';
            if (err) {
                console.log('error fetching client from pool', err);
            }
            client.query(queryText, [userId, myHash, gender], function(err, result) {
                if (err) {
                    console.log('There was an error performing query', err);
                }
            });
        });
    });
}