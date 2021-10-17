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
        cookie : { maxAge : 1000 * 60 * 6 }
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
                var qry = 'select*from sakila.node_users where Username = ? and Password = ?';
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
                var qry = 'select*from sakila.node_users where Username = ?';
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
            response.sendFile(path.join(__dirname, '..', 'public', 'html', 'dashboard.html'));
            // response.send('Welcome, ID ' + request.session.userid
            //  + `\n<a href='/logout'>Click here to logout</a>`);
        }else
        {
            response.send('Please login to view this page!');
            response.end();
        }
    }
);

route.post('/logout', function(request, response)
    {
        console.log(request.session)
        request.session.destroy(() => {
            response.redirect('/');
        });
    }
);

// route.get('/logout', function(request, response)
//     {
//         request.session.destroy(() => {
//             response.redirect('/');
//         });
//     }
// );

route.get('/analytics', function(request, response)
    {
        if(request.session.loggedin)
        {
            response.sendFile(path.join(__dirname, '..', 'public', 'html', 'analytics.html'));
            // response.send('Welcome, ID ' + request.session.userid
            //  + `\n<a href='/logout'>Click here to logout</a>`);
        }else
        {
            response.send('Please login to view this page!');
            response.end();
        }
    }
);


route.post('/infocont', function(request, response)
    {
        let rsrctype = request.body.resource;
        let infoperiod = request.body.period;
        var cc = -1;
        var tp = 1.0800;
        var td = 2.0400;
        var tc = 3.0050;

        // console.log(rsrctype);
        // console.log(infoperiod);
        // console.log(request.body);
        if(rsrctype == "Water")
        {
            var qry1 = "select count( distinct(id)) as tcc from sakila.node_users where User_type='C' and Water_service='Yes'";

            if(infoperiod == "This Month"){
                var qry2 = "select sum(paid_amount) as ttp from sakila.node_water_bill where month(payment_date)=month(now()) and year(payment_date)=year(now())";
                var qry3 = "select sum(water_due) as ttd from sakila.node_users where Water_service='Yes'";
                var qry4 = "select sum(used_amount) as ttc from sakila.node_usage_history where month(record_date)=month(now()) and year(record_date)=year(now()) and resource_type='Water'";
            }
            else if(infoperiod == "This Year")
            {
                var qry2 = "select sum(paid_amount) as ttp from sakila.node_water_bill where year(payment_date)=year(now())";
                var qry3 = "select sum(water_due) as ttd from sakila.node_users where Water_service='Yes'";
                var qry4 = "select sum(used_amount) as ttc from sakila.node_usage_history where year(record_date)=year(now()) and resource_type='Water'";
            }
            else if(infoperiod == "All Time")
            {
                var qry2 = "select sum(paid_amount) as ttp from sakila.node_water_bill";
                var qry3 = "select sum(water_due) as ttd from sakila.node_users where Water_service='Yes'";
                var qry4 = "select sum(used_amount) as ttc from sakila.node_usage_history where resource_type='Water'";
            }
        }
        else if(rsrctype == "Electricity")
        {
            var qry1 = "select count( distinct(id)) as tcc from sakila.node_users where User_type='C' and Elec_service='Yes'";

            if(infoperiod == "This Month"){
                var qry2 = "select sum(paid_amount) as ttp from sakila.node_electricity_bill where month(payment_date)=month(now()) and year(payment_date)=year(now())";
                var qry3 = "select sum(Elec_due) as ttd from sakila.node_users where Elec_service='Yes'";
                var qry4 = "select sum(used_amount) as ttc from sakila.node_usage_history where month(record_date)=month(now()) and year(record_date)=year(now()) and resource_type='Electricity'";
            }
            else if(infoperiod == "This Year")
            {
                var qry2 = "select sum(paid_amount) as ttp from sakila.node_electricity_bill where year(payment_date)=year(now())";
                var qry3 = "select sum(Elec_due) as ttd from sakila.node_users where Elec_service='Yes'";
                var qry4 = "select sum(used_amount) as ttc from sakila.node_usage_history where year(record_date)=year(now()) and resource_type='Electricity'";
            }
            else if(infoperiod == "All Time")
            {
                var qry2 = "select sum(paid_amount) as ttp from sakila.node_electricity_bill";
                var qry3 = "select sum(Elec_due) as ttd from sakila.node_users where Elec_service='Yes'";
                var qry4 = "select sum(used_amount) as ttc from sakila.node_usage_history where resource_type='Electricity'";
            }
        }
        connection.query(qry1, function(error1, result1, fields1)
        {
            if(error1) throw error1;
            if(result1.length > 0)
            {
                if(result1[0].tcc != 'null')
                {
                    cc = result1[0].tcc;
                }
                else
                {
                    cc = result1[0].tcc;
                }
                // console.log(result1);
                // call the other 3 connection.query() functions from here,
                // one inside the callback of the other. The response.setHeader,send,end
                // will go inside the innermost callback.
                connection.query(qry2, function(error2, result2, fields2) {
                    if(error2) throw error2;
                    if(result2.length > 0)
                    {
                        if(result2[0].ttp != 'null')
                        {
                            tp = result2[0].ttp;
                        }
                        else
                        {
                            tp = result2[0].ttp;
                        }

                        connection.query(qry3, function(error3, result3, fields3) {
                            if(error3) throw error3;
                            if(result3.length > 0)
                            {
                                if(result3[0].ttd != 'null')
                                {
                                    td = result3[0].ttd;
                                }
                                else
                                {
                                    td = 0.0;
                                }

                                connection.query(qry4, function(error4, result4, fields4) {
                                    if(error4) throw error4;
                                    if(result4.length > 0)
                                    {
                                        if(result4[0].ttc != 'null')
                                        {
                                            tc = result4[0].ttc;
                                        }
                                        else
                                        {
                                            tc = 0.0;
                                        }

                                        response.setHeader('Content-Type', 'application/json');
                                        response.send({curclients: cc, totalp: tp, totald: td, totalc: tc});
                                        response.end();
                                    }
                                    else
                                    {
                                        response.status(404).end('Error fetching tc!');
                                    }
                                });
                            }
                            else
                            {
                                response.status(404).end('Error fetching td!');
                            }
                        });
                    }
                    else
                    {
                        response.status(404).end('Error fetching tp!');
                    }
                });
            }
            else
            {
                response.status(404).end('Error fetching cc!');
            }
        });
    }
);

module.exports = route;