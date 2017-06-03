var express = require('express');
var router = express.Router();
var pg = require('pg');
var scrypt = require('scrypt-for-humans');
var session = require('express-session');
var conString = 'postgres://postgres:grizvok5@localhost:5432/scifit';
var Promise = require('bluebird');
var knex = require('./knex');
var createUser = require('./createuser');


router.get('/', function(req, res) {
    res.render('signup', {
        user: req.session.user,
        title: 'Sci-Fit Sign up',
        styles: '<link rel="stylesheet" type="text/css" href="/register.css">',
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
});

router.post('/', function(req, res) {

    function repeatedUser() {
        req.body.uniqueUser = false;
        req.check('uniqueUser', 'That username already exists').equals(false);
        var errors = req.validationErrors();
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/register');
        return;
    }

    function infoValidator(err, result) {
        req.check('user', 'Invalid user name').isLength({
        min: 5
    });
        req.check('password', 'Password is invalid').isLength({min: 5});
        req.check('password', 'Passwords do not match').equals(req.body.confirmPassword);
        req.check('gender', 'Please choose a gender').isLength({
        min: 1
     });

    }


    function doesUserExist(user, callback) {
        pg.connect(conString, function(err, client, done) {
            client.query('SELECT user_id FROM clients.users where user_id=$1', [req.body.user], function(err, result) {
                if (err) {
                    callback(err, null);
                    console.log('error fetching client from pool', err);
                    return;
                } else if (result.rowCount === 1) {
                    callback(null, false);
                    repeatedUser();
                    return;
                }
                infoValidator();
            });
        });

       function infoValidator(err, result) {
        req.check('user', 'Invalid user name').isLength({
        min: 5
    });
        req.check('password', 'Password is invalid').isLength({min: 5});
        req.check('password', 'Passwords do not match').equals(req.body.confirmPassword);
        req.check('gender', 'Please choose a gender').isLength({
        min: 1
     });
     

        var errors = req.validationErrors();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/register');
        } else {
            req.session.success = true;
            var userId = req.body.user;
            var pw = req.body.password;
            var gender = req.body.gender;
            callback(null, true);


        }
    }
};

doesUserExist(req.body.user, function(err, result) {
    if (err) {
        console.log('An error occurred', err);
    } else if (result === false) {
        repeatedUser();
        console.log('false');
    } else if (result === true) {
        infoValidator();
        console.log('true');
    }
});




/*req.check('user', 'Invalid user name').isLength({
    min: 5
});
req.check('password', 'Password is invalid').isLength({
    min: 5
}).equals(req.body.confirmPassword);
req.check('gender', 'Please choose a gender').isLength({
    min: 1
});
    


var errors = req.validationErrors();
if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.redirect('/register');
} else {
    req.session.success = true;
    
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

*/
});

module.exports = router;