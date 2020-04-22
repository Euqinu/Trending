const express= require('express');
const route=express.Router();
const request=require('request');
const axios=require('axios');

route.get('/',(req,res)=>{
    console.log('route is working');
    res.render('index')
})

route.get("/test", (req, res, next) => {
  console.log("'/test' call");
  
const requestOne=  axios({
  "method":"GET",
  "url":"https://api.covid19api.com/summary",
  
    })
const requestTwo= axios({
  "method":"GET",
  "url":"https://covid19-data.p.rapidapi.com/",
  "headers":{
  "content-type":"application/octet-stream",
  "x-rapidapi-host":"covid19-data.p.rapidapi.com",
  "x-rapidapi-key":"f0a1736293mshae09d584089553ep1d7565jsn258d8dd7f154"
  },"params":{
  "country":"Nepal"
  }
  })
  /*
  axios({
    "method":"GET",
    "url":"https://covid19-data.p.rapidapi.com/",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid19-data.p.rapidapi.com",
    "x-rapidapi-key":"f0a1736293mshae09d584089553ep1d7565jsn258d8dd7f154"
    },"params":{
    "country":"Nepal"
    }
    })
    .then((response)=>{
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
    */
    axios.all([requestOne,requestTwo]).then(axios.spread((...responses)=>{
      const responseOne=responses[0];
      const responseTwo=responses[1];
      console.log(responseOne.data.Global)
     // console.log(responseTwo.data);
      res.render('primary',{
        npCases:responseTwo.data.confirmed,
        npDeaths:responseTwo.data.deaths,
        npRecovered:responseTwo.data.recovered,
        npActive:responseTwo.data.active,
        worldCases:responseOne.data.Global.TotalConfirmed,
        worldDeaths:responseOne.data.Global.TotalDeaths,
        worldRecovered:responseOne.data.Global.TotalRecovered,
        newCases:responseOne.data.Global.NewConfirmed

      })
    })).catch(error=>console.log(error))
})

/*
route.get('/trendin-now',async (req,res,next)=>{
    var options = {
      method: 'GET',
      url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php',
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
      var worldstat_url=axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php');
      var nepalstat_url='https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php';

      
      
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
       // console.log(typeof body);//outputs entire body
    res.render('primary',{
       msg:'welcome',
        tc: body.total_cases,
        td: body.total_deaths,
        tr: body.total_recovered,
        tnc: body.new_cases,
        nd: body.new_deaths,
        sta:body.statistic_taken_at,
        ac:body.active_cases
    });
    
    // });
  //   request(options2,function(error,response,body){
  //     if(error) throw new Error(error);
  //    var test=JSON.parse(body);
  //   console.log(typeof test);
  //   res.send(test)
  //   console.log(test)
  //   console.log( test.latest_stat_by_country[0].id)
  //   res.render('primary',{
  //     msg:'welcome',
  //      tc2: test.latest_stat_by_country[0].total_cases,
  //      td2: test.latest_stat_by_country[0].total_deaths,
  //      tr2: test.latest_stat_by_country[0].total_recovered,
  //      tt2: test.latest_stat_by_country[0].total_tests,
  //  })
  //   })
  
  });
});
  
 */
module.exports=route;
