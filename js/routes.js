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
route.use('/chart', express.static(path.join(__dirname, '..', 'node_modules', 'chart.js', 'dist')));


route.use(session(
    {
        secret : 'utehss3eu7uh',
        resave : true,
        saveUninitialized : true,
        cookie : { maxAge : 1000 * 60 * 10 }
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
        }
        // else if(request.session.loggedin && request.session.usertype=="C")
        // {
        //     response.redirect('/detail');
        // }
        else
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
                        request.session.usertype=results[0].User_type;
                        console.log(request.session);
                        if(results[0]["User_type"]=="A")
                        {
                            response.redirect('/dashboard');
                            response.end();
                        }
                        else if(results[0]["User_type"]=="C")
                        {
                            response.redirect('/dashboard');
                            response.end();
                        }
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
                            response.send('An email containing your password has been sent successfully.');
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
            }
            else
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
            if(request.session.usertype=="A")
            {
                
            response.sendFile(path.join(__dirname, '..', 'public', 'html', 'dashboard.html'));
            // response.send('Welcome, ID ' + request.session.userid
            //  + `\n<a href='/logout'>Click here to logout</a>`);
            }
            else if(request.session.usertype=="C")
            {
                response.sendFile(path.join(__dirname, '..', 'public', 'html', 'userdetail.html'));
            }
        }
        else
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
        if(request.session.loggedin && request.session.usertype=="C")
        {
            response.sendFile(path.join(__dirname, '..', 'public', 'html', 'analytics.html'));
        }
        else if(request.session.loggedin && request.session.usertype=="A")
        {
            response.sendFile(path.join(__dirname, '..', 'public', 'html', 'adminAnalytics.html'));
        }
        else
        {
            response.end('Please login to view this page!');
        }
    }
);

// route.get('/layout', function(request, response)
//     {
//         if(request.session.loggedin)
//         {
//             response.sendFile(path.join(__dirname, '..', 'public', 'html', 'layout.html'));
//         }
//         else
//         {
//             response.end('Please login to view this page!');
//         }
//     }
// );


route.post('/infocont', function(request, response)
    {
        let rsrctype = request.body.resource;
        let infoperiod = request.body.period;
        var cc = -1;
        var tp = 1.0800;
        var td = 2.0400;
        var tc = 3.0050;

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
                if(result1[0].tcc != null)
                {
                    cc = result1[0].tcc;
                }
                else
                {
                    cc = 0;
                }
                // console.log(result1);
                connection.query(qry2, function(error2, result2, fields2) {
                    if(error2) throw error2;
                    if(result2.length > 0)
                    {
                        if(result2[0].ttp != null)
                        {
                            tp = result2[0].ttp;
                        }
                        else
                        {
                            tp = 0;
                        }

                        connection.query(qry3, function(error3, result3, fields3) {
                            if(error3) throw error3;
                            if(result3.length > 0)
                            {
                                if(result3[0].ttd != null)
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
                                        if(result4[0].ttc != null)
                                        {
                                            tc = result4[0].ttc;
                                        }
                                        else
                                        {
                                            tc = 0.0;
                                        }

                                        response.setHeader('Content-Type', 'application/json');
                                        response.send({curclients: cc, totalp: tp, totald: td, totalc: tc});
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
                response.status(404).send('Error fetching cc!');
            }
        });
    }
);

route.post('/avyearinfo', function(request, response) {
    let infotype = request.body.info;
    let rsctype = request.body.resource;

    let qry1;
    if(infotype == "Bills")
    {
        if(rsctype == "Water")
        {
            qry1 = "select distinct(year(idate)) Year from (select bill_id, date_sub(issue_date, interval 1 month) idate from sakila.node_water_bill where user_id=?) as real_list order by year(idate) desc";
        }
        else if(rsctype == "Electricity")
        {
            qry1 = "select distinct(year(idate)) Year from (select bill_id, date_sub(issue_date, interval 1 month) idate from sakila.node_electricity_bill where user_id=?) as real_list order by year(idate) desc";
        }
    }
    else if(infotype == "Usage")
    {
        if(rsctype == "Water")
        {
            qry1 = "select distinct(year(record_date)) Year from sakila.node_usage_history where user_id=? and resource_type='Water' order by year(record_date) desc";
        }
        else if(rsctype == "Electricity")
        {
            qry1 = "select distinct(year(record_date)) Year from sakila.node_usage_history where user_id=? and resource_type='Electricity' order by year(record_date) desc";
        }
    }
    connection.query(qry1, [request.session.userid], function(error1, result1, fields1) {
        if(error1) throw error1;
        if(result1.length > 0)
        {
            console.log(JSON.stringify({year: result1}));
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({year: result1}));
        }
        else
        {   
            response.status(404).send("Error retrieving year data! Resultset length is zero!");
        }
    });
});

route.post('/adminavyearinfo', function(request, response) {
    let infotype = request.body.info;
    let rsctype = request.body.resource;

    let qry1;
    if(infotype == "Earned")
    {
        if(rsctype == "Water")
        {
            qry1 = "select distinct(year(idate)) Year from (select bill_id, date_sub(issue_date, interval 1 month) idate from sakila.node_water_bill) as real_list order by year(idate) desc";
        }
        else if(rsctype == "Electricity")
        {
            qry1 = "select distinct(year(idate)) Year from (select bill_id, date_sub(issue_date, interval 1 month) idate from sakila.node_electricity_bill) as real_list order by year(idate) desc";
        }
    }
    else if(infotype == "Usage")
    {
        if(rsctype == "Water")
        {
            qry1 = "select distinct(year(record_date)) Year from sakila.node_usage_history where resource_type='Water' order by year(record_date) desc";
        }
        else if(rsctype == "Electricity")
        {
            qry1 = "select distinct(year(record_date)) Year from sakila.node_usage_history where resource_type='Electricity' order by year(record_date) desc";
        }
    }
    connection.query(qry1, function(error1, result1, fields1) {
        if(error1) throw error1;
        if(result1.length > 0)
        {
            console.log(JSON.stringify({year: result1}));
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({year: result1}));
        }
        else
        {   
            response.status(404).send("Error retrieving year data! Resultset length is zero!");
        }
    });
});

route.post('/clientchartinfo', function(request, response) {
    let infotype = request.body.info;
    let rsctype = request.body.resource;
    let periodval = request.body.period;
    let ytq = request.body.yr;

    let qry1;
    if(infotype == "Bills")
    {
        if(rsctype == "Water")
        {
            if(periodval == "All Time")
            {
                qry1 = "select year(subdate(issue_date, interval 1 month)) Year, sum(total_payable) Total_bill from sakila.node_water_bill where user_id= ?  group by year(subdate(issue_date, interval 1 month)) order by year(subdate(issue_date, interval 1 month))";
            }
            else if(periodval == "Yearly")
            {
                qry1 = `select month(idate) Month, total_payable Monthly_Bill from (select bill_id, date_sub(issue_date, interval 1 month) idate, total_payable from sakila.node_water_bill where user_id=?) as real_list where year(idate)=${ytq}`;
            }
        }
        else if(rsctype == "Electricity")
        {
            if(periodval == "All Time")
            {
                qry1 = "select year(subdate(issue_date, interval 1 month)) Year, sum(total_payable) Total_bill from sakila.node_electricity_bill where user_id= ? group by year(subdate(issue_date, interval 1 month)) order by year(subdate(issue_date, interval 1 month))";
            }
            else if(periodval == "Yearly")
            {
                qry1 = `select month(idate) Month, total_payable Monthly_Bill from (select bill_id, date_sub(issue_date, interval 1 month) idate, total_payable from sakila.node_electricity_bill where user_id=?) as real_list where year(idate)=${ytq}`;
            }
        }
    }
    else if(infotype == "Usage")
    {
        if(rsctype == "Water")
        {
            if(periodval == "All Time")
            {
                qry1 = "select year(record_date) Year, sum(used_amount) Used from sakila.node_usage_history where user_id= ? and resource_type='Water' group by year(record_date) order by year(record_date) asc";
            }
            else if(periodval == "Yearly")
            {
                qry1 = `select month(record_date) Month, used_amount Used from sakila.node_usage_history where user_id= ? and resource_type='Water' and year(record_date)=${ytq} order by month(record_date) asc`;
            }
        }
        else if(rsctype == "Electricity")
        {
            if(periodval == "All Time")
            {
                qry1 = "select year(record_date) Year, sum(used_amount) Used from sakila.node_usage_history where user_id= ? and resource_type='Electricity' group by year(record_date) order by year(record_date) asc";
            }
            else if(periodval == "Yearly")
            {
                qry1 = `select month(record_date) Month, used_amount Used from sakila.node_usage_history where user_id= ? and resource_type='Electricity' and year(record_date)=${ytq} order by month(record_date) asc`;
            }
        }
    }
    connection.query(qry1, [request.session.userid], function(error1, result1, fields1) {
        if(error1) throw error1;
        if(result1.length > 0)
        {
            console.log(JSON.stringify({dat: result1}));
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({dat: result1}));
        }
        else
        {   
            response.status(404).send("Error retrieving chart data! Resultset length is zero!");
        }
    });
});

route.post('/adminchartinfo', function(request, response) {
    let infotype = request.body.info;
    let rsctype = request.body.resource;
    let periodval = request.body.period;
    let ytq = request.body.yr;

    let qry1;
    if(infotype == "Earned")
    {
        if(rsctype == "Water")
        {
            if(periodval == "All Time")
            {
                qry1 = "select year(subdate(issue_date, interval 1 month)) Year, sum(paid_amount) Total_earned from sakila.node_water_bill group by year(subdate(issue_date, interval 1 month)) order by year(subdate(issue_date, interval 1 month))";
            }
            else if(periodval == "Yearly")
            {
                qry1 = `select month(idate) Month, sum(paid_amount) Monthly_Earned from (select bill_id, date_sub(issue_date, interval 1 month) idate, paid_amount from sakila.node_water_bill) as real_list where year(idate)=${ytq} group by month(idate)`;
            }
        }
        else if(rsctype == "Electricity")
        {
            if(periodval == "All Time")
            {
                qry1 = "select year(subdate(issue_date, interval 1 month)) Year, sum(paid_amount) Total_earned from sakila.node_electricity_bill group by year(subdate(issue_date, interval 1 month)) order by year(subdate(issue_date, interval 1 month))";
            }
            else if(periodval == "Yearly")
            {
                qry1 = `select month(idate) Month, sum(paid_amount) Monthly_Earned from (select bill_id, date_sub(issue_date, interval 1 month) idate, paid_amount from sakila.node_electricity_bill) as real_list where year(idate)=${ytq} group by month(idate)`;
            }
        }
    }
    else if(infotype == "Usage")
    {
        if(rsctype == "Water")
        {
            if(periodval == "All Time")
            {
                qry1 = "select year(record_date) Year, sum(used_amount) Used from sakila.node_usage_history where resource_type='Water' group by year(record_date) order by year(record_date) asc";
            }
            else if(periodval == "Yearly")
            {
                qry1 = `select month(record_date) Month, sum(used_amount) Used from sakila.node_usage_history where resource_type='Water' and year(record_date)=${ytq} group by month(record_date) order by month(record_date) asc`;
            }
        }
        else if(rsctype == "Electricity")
        {
            if(periodval == "All Time")
            {
                qry1 = "select year(record_date) Year, sum(used_amount) Used from sakila.node_usage_history where resource_type='Electricity' group by year(record_date) order by year(record_date) asc";
            }
            else if(periodval == "Yearly")
            {
                qry1 = `select month(record_date) Month, sum(used_amount) Used from sakila.node_usage_history where resource_type='Electricity' and year(record_date)=${ytq} group by month(record_date) order by month(record_date) asc`;
            }
        }
    }
    connection.query(qry1, function(error1, result1, fields1) {
        if(error1) throw error1;
        if(result1.length > 0)
        {
            console.log(JSON.stringify({dat: result1}));
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({dat: result1}));
        }
        else
        {   
            response.status(404).send("Error retrieving chart data! Resultset length is zero!");
        }
    });
});

route.post('/userdetail_data',function(request,response)
{
    var user_id=request.session.userid;
    var client_id=Number.parseInt(request.body.id);
    //console.log(id);
    if(client_id)
    {
        id=client_id;
    }
    else
    {
        id=user_id;
    }
    connection.query("select * from sakila.node_users where id=?",[id],function(err,r)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            //console.log(r);
            var json=JSON.stringify(r);
            response.send(json);
        }
    });
});


route.get('/detail',function(request,response)
{
    var id=Number.parseInt(request.query.u_id);
    console.log(id);
    if(request.session.loggedin && request.session.usertype=="C")
    {
        response.sendFile(path.join(__dirname,"..","public","html","userdetail.html"));
    }
    else if(request.session.loggedin && request.session.usertype=="A" && Number.isNaN(id))
    {
        response.end("Please select which client to view first!");
    }
    else if(request.session.loggedin && request.session.usertype=="A" && id!=null)
    {
        response.sendFile(path.join(__dirname,"..","public","html","userdetail.html"));
    }
    else
    {
        response.end('Please login to view this page!');
    }
});

// route.get('/issued_bill',function(request,response)
// {
//     response.sendFile(path.join(__dirname,"..","public","html","issue.html"));
// });

route.post('/get_issue_date',function(req,res)
{
    var resource=req.body.resource;
    console.log("Resource : "+resource);
    if(resource=="Water")
    {
        connection.query("select DISTINCT(YEAR(idate)) from (select date_sub(issue_date, interval 1 month) idate from sakila.node_water_bill where user_id=?) as real_table",[parseInt(`${req.body.id}`)],function(err,result)
        {
            var data=JSON.stringify(result);
            
            res.send(data);
        });
    }
    else if(resource=="Electricity")
    {
        connection.query("select DISTINCT(YEAR(idate)) issue_year from (select date_sub(issue_date, interval 1 month) idate from sakila.node_electricity_bill where user_id=?) as real_table",[parseInt(`${req.body.id}`)],function(err,result)
        {
           var data=JSON.stringify(result);
           res.send(data);
        });
    }
});

route.post('/get_bill_data',function(req,res)
{
    var year=req.body.year;
    var resource=req.body.resource;
    var user_id=req.session.userid;
    var client_id=Number.parseInt(req.body.id);
    //console.log(id);
    if(client_id)
    {
        id=client_id;
    }
    else
    {
        id=user_id;
    }
    if(resource=="Water")
    {
        var query="select bill_id, issue_date, payment_date, used_resource, usage_cost, total_payable, paid_amount, due_amount from sakila.node_water_bill where YEAR(date_sub(issue_date, interval 1 month))=? and user_id=? order by issue_date desc";
        connection.query(query,[year,id],function(err,result)
        {
            //console.log(result);
            var data=JSON.stringify(result);
            res.send(data);
        });
    }
    else if(resource=="Electricity")
    {
        var query="select bill_id,issue_date, payment_date,used_resource,usage_cost,total_payable,paid_amount,due_amount from sakila.node_electricity_bill where YEAR(date_sub(issue_date, interval 1 month))=? and user_id=? order by issue_date desc";
        connection.query(query,[year,id],function(err,result)
        {
            var data=JSON.stringify(result);
            res.send(data);
        });
    }
});

route.get('/userlist',function(req,res)
{
    if(req.session.loggedin && req.session.usertype == "A")
    {
        res.sendFile(path.join(__dirname,"..","public","html","userlist.html"));
    }
    else if(req.session.loggedin && req.session.usertype == "C")
    {
        res.redirect('/dashboard');
    }
    else
    {
        res.send("You are not logged in!");
    }
});


route.get('/get-filter-menu',function(req,res)
{
    var query="select * from sakila.node_users";
    connection.query(query,function(err,result)
    {
        //console.log(result);
        var data=JSON.stringify(result);
        res.send(data);
    });
});


route.post('/get-filter-data',function(req,res)
{
    var column=req.body.column;
    var value=req.body.value;
    if(column=="Location")
    {
        var query="select * from sakila.node_users where location=? and User_type='C'";
        connection.query(query,[value],function(err,result)
        {
            //console.log(result);
            var data=JSON.stringify(result);
            res.send(data);
        });
    }

    else if(column=="Sub Type")
    {
        var query="select * from sakila.node_users where sub_type=? and User_type='C'";
        connection.query(query,[value],function(err,result)
        {
            //console.log(result);
            var data=JSON.stringify(result);
            res.send(data);
        });
    }

    else if(column=="Service")
    {
        if(value=="Water")
        {
            var query="select * from sakila.node_users where water_service='yes' and User_type='C'";
            connection.query(query,[value],function(err,result)
            {
                //console.log(result);
                var data=JSON.stringify(result);
                res.send(data);
            });
        }
        else if(value=="Electricity")
        {
            var query="select * from sakila.node_users where elec_service='yes' and User_type='C'";
            connection.query(query,[value],function(err,result)
            {
                //console.log(result);
                var data=JSON.stringify(result);
                res.send(data);
            });
        }
    }
});

route.post('/get-user-type',function(req,res)
{
    var id=req.session.usertype;
    if(req.session.loggedin)
    {
        res.send(
        {
            type:id
        });
    }
    else
    {
        res.end("You are not logged in");
    }
});

route.post('/add_user', function(request, response)
    {
        console.log(request.body);
        var qry = "insert into sakila.node_users (`Username`,`Password`,`Email`,`User_type`,`Location`,`Sub_type`,`Elec_service`,`Elec_due`,`Water_service`,`Water_due`) values('"+ request.body.username +"', '"+ request.body.password +"', '"+ request.body.email +"', '"+ request.body.user_type +"', '"+ request.body.location +"', '"+ request.body.sub_type +"', '"+ request.body.elec_service +"', '"+ 0.00 +"', '"+ request.body.water_service +"', '"+ 0.00 +"')";
        connection.query(qry, function(err){
            if(err) throw err;
            response.send('Data Inserted Successfully');
        });
    }
);

route.get('/user_manager', function(request, response)
    {
        if(request.session.loggedin && request.session.usertype == "A")
        {
            response.sendFile(path.join(__dirname, '..', 'public', 'html', 'add_user.html'));
            // response.send('Welcome, ID ' + request.session.userid
            //  + `\n<a href='/logout'>Click here to logout</a>`);
        }
        else if(request.session.loggedin && request.session.usertype == "C")
        {
            response.send("The page you are looking for does not exist!");
        }
        else
        {
            response.send('Please login to view this page!');
        }
    }
);

module.exports = route;


