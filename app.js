var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var cookieparser = require('cookie-parser');
var path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const Client_Id = '303128577902-l890bun9s67um4qdik7sa75ccbu0e05k.apps.googleusercontent.com';
const Client_Secret = 'idq2b-HUR_gc0OyUP_CyAPv6';
const Redirect_Uri = 'https://developers.google.com/oauthplayground';
const Refresh_Token = '1//049nTtM7HDKTVCgYIARAAGAQSNwF-L9Ir1SQmPt8aEDPSa47sf4OqRwoByBaGOGHK5Ih392BRWJIczKEKb0xMuA31RupTzoveOzE';

var app = express();

app.use(session(
    {
        secret : 'utehss3eu7uh',
        resave : true,
        saveUninitialized : true,
        cookie : { maxAge : 1000 * 60 * 3 }
    }
));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieparser());

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/image', express.static(__dirname + '/public/image'));

var connection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : 'DartrixDDR4L'
    }
);

app.get('/',function(request, response)
    {
        if(request.session.loggedin)
        {
            response.redirect('/dashboard');
        }else
        {
            response.sendFile(__dirname + '/public/html/signin.html');
        }
    }
);

const oauth2client = new google.auth.OAuth2(Client_Id, Client_Secret, Redirect_Uri);
oauth2client.setCredentials({ refresh_token : Refresh_Token });

async function sendmail(emailaddress, pass)
{
    try{

        const Access_Token = await oauth2client.getAccessToken();

        const transporter = nodemailer.createTransport(
            {
                service : 'gmail',
                auth : {
                    type : 'OAuth2',
                    user : 'ddrtestingapp@gmail.com',
                    clientId : Client_Id,
                    clientSecret : Client_Secret,
                    refreshToken : Refresh_Token,
                    accessToken : Access_Token
                }
            }
        );
        const mail_info = {
            from : 'UtilityTracker✨ <ddrtestingapp@gmail.com>',
            to : emailaddress,
            subject : 'Your Request For Password',
            text : `Here's your password: ${pass}. Use this to login`,
            html : `Here's your password: <h3>${pass}</h3>Use this to login`
        };
        console.log('Wait....')
        const rs = await transporter.sendMail(mail_info);
        return rs;
    } catch(error) {
        return error;
    }
}

app.post('/auth',function(request, response)
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
                            console.log('Email has been sent successfully ' + rs)
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

app.get('/dashboard', function(request, response)
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

app.get('/logout', function(request, response)
    {
        request.session.destroy();
        response.redirect('/');
    }
);

// app.use(express.static('image'));
// app.use(express.static('html'));

app.listen(3000, () => { console.log('Server running at port 3000') });