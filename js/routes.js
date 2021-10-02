var express = require('express');
var session = require('express-session');
var path = require('path');
var mysql = require('mysql');
var cookieparser = require('cookie-parser');
const util = require('util');

const sendmail = require('./fphandler.js');
var route = express();

route.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')));
route.use('/image', express.static(path.join(__dirname, '..', 'public', 'image')));
route.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')));


route.use(session(
    {
        secret : 'utehss3eu7uh',
        resave : true,
        saveUninitialized : true,
        cookie : { maxAge : 1000 * 60 * 3 }
    }
));
route.use(express.urlencoded({ extended : true }));
route.use(express.json());
route.use(cookieparser());

var connection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : 'DartrixDDR4L',
        port : '3307'
    }
);

route.get('/',function(request, response)
    {
        if(request.session.loggedin)
        {
            response.redirect('/dashboard');
        }else
        {
            response.sendFile(path.join(__dirname, '..', 'public', 'html', 'signin.html'));
        }
    }
);

route.post('/auth',function(request, response)
    {
        var username = request.body.username;
        var password = request.body.password;
        if (username)
        {
            if ((typeof request.body.submit !== 'undefined') && password && (typeof request.body.forpass === 'undefined'))
            {
                var qry = 'select*from sakila.node_cred where Username = ? and Password = ?';
                connection.query(qry, [username, password], function(error, results, fields)
                {
                    if(error) throw error;
                    if(results.length > 0)
                    {
                        request.session.loggedin = true;
                        request.session.userid = results[0].ID;
                        console.log(request.session)
                        response.redirect('/dashboard');
                        response.end();
                    }else
                    {
                        response.send('Incorrect Username and/or Password!');
                        response.end();
                    }
                });
                
            }else if ((typeof request.body.forpass !== 'undefined') && (typeof request.body.submit === 'undefined'))
            {
                var qry = 'select*from sakila.node_cred where Username = ?';
                connection.query(qry, [username], function(error, results, fields)
                {

                    if(error) throw error;
                    if(results.length > 0)
                    {
                        emailaddress = results[0].Email;
                        pass = results[0].Password;
                        console.log(request.session)

                        sendmail(emailaddress, pass).then( (rs) => {
                            response.send('An email containing your password has been successfully.');
                            console.log('Email has been sent successfully ' + util.inspect(rs))
                            response.end();
                        })
                        .catch( (err) => {
                            throw err;
                        });

                    }else
                    {
                        response.send('Incorrect Username!');
                        response.end();
                    }
                });
            }else
            {
                response.send('Please enter your Password!');
                response.end();
            }
        }else
        {
            response.send('Please enter your Username!');
            response.end();
        }
    }
);

route.get('/dashboard', function(request, response)
    {
        if(request.session.loggedin)
        {
            response.send('Welcome, ID ' + request.session.userid
             + `\n<a href='/logout'>Click here to logout</a>`);
        }else
        {
            response.send('Please login to view this page!');
        }
        response.end();
    }
);

route.get('/logout', function(request, response)
    {
        request.session.destroy();
        response.redirect('/');
    }
);

module.exports = route;