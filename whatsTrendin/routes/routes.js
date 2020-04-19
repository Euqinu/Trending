const express= require('express');
const route=express.Router();
const request=require('request');

route.get('/',(req,res)=>{
    console.log('route is working');
    res.render('index')
})

route.get('/trendin-now',(req,res)=>{
    var options = {
      method: 'GET',
      url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php',
    json: true,
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': 'f0a1736293mshae09d584089553ep1d7565jsn258d8dd7f154'//paste ur key here
      }
    };
    var options2 = {
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php',
        qs: {country: 'Nepal'},
        headers: {
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'f0a1736293mshae09d584089553ep1d7565jsn258d8dd7f154'
        }
      };
      
    request(options2, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(typeof body);//outputs entire body
    // res.render('primary',{
    //    msg:'welcome',
    //     tc: body.total_cases,
    //     td: body.total_deaths,
    //     tr: body.total_recovered,
    //     tnc: body.new_cases,
    //     nd: body.new_deaths,
    //     sta:body.statistic_taken_at,
    //     ac:body.active_cases
    // });
    res.send(body)
    // res.send({
    // msg:'welcome',
    // tc: body.total_cases,
    // td: body.total_deaths,
    // tr: body.total_recovered,
    // tnc: body.new_cases,
    // nd: body.new_deaths,
    // sta:body.statistic_taken_at
    // })
    });
    })


module.exports=route;

