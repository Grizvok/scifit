var pg = require('pg');
var scrypt = require('scrypt-for-humans');
var conString = 'postgres://postgres:grizvok5@localhost:5432/scifit';
var Promise = require('bluebird');
var session = require('express-session');



exports.userLogin = function(req, res) {
    var userId = req.body.user;
    var pw = req.body.password;

    pg.connect(conString, function(err, client, done) {
        var query = client.query('SELECT user_id, password FROM clients.users where user_id=$1', [userId], function(err, result) {
            if (result.rowCount === 0) {
                res.send('That username does not exist!');
            } else if (result.rowCount === 1) {
                let user_id = result.rows[0].user_id;
                let hash = result.rows[0].password;

                Promise.try(function() {
                    return scrypt.verifyHash(pw, hash);
                }).then(function() {
                    req.session.user = user_id;
                    console.log(req.session);
                    res.redirect('/dashboard');
                }).catch(scrypt.PasswordError, function(err) {
                    res.send('Error logging in');
                });
            }
        });
    });
}    