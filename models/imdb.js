
var request = require('request');
var cheerio = require('cheerio');

exports.crawler = function (callback) {
    var url = 'https://www.imdb.com/chart/top';
    var hrefURL = 'https://www.imdb.com';
    request(url, function(err, res, body){
        var $ = cheerio.load(body);
        var dataArray = [];
        for (var i = 1; i <= 100; i++){
            // td.posterColumn      
            var $Rank = $(".lister-list > tr:nth-child("+ i +") > td.posterColumn > span[name='rk']").attr('data-value');
            // console.log("Rank = " + $Rank); 

            var $Rating = $(".lister-list > tr:nth-child("+ i +") > td.posterColumn > span[name='ir']").attr('data-value');
            // console.log("Rating = " + $Rating);  
             
            var $img = $(".lister-list > tr:nth-child("+ i +") > td.posterColumn > a > img").attr('src');
            // console.log("img = " + $img);  

            // td.titleColumn
            var $Dir = $(".lister-list > tr:nth-child("+ i +") > td.titleColumn a").attr('title');
            // console.log("Dir = " + $Dir);

            var $title = $(".lister-list > tr:nth-child("+ i +") > td.titleColumn a").html();
            // console.log("title = " + $title);
    
            var $href = $(".lister-list > tr:nth-child("+ i +") > td.titleColumn a").attr('href');
            $href = hrefURL + $href;
            // console.log("href = " + $href);
            
            var $year = $(".lister-list > tr:nth-child("+ i +") > td.titleColumn > span").html();
            // console.log("year = " + $year);
            // console.log("------------------");
            
            dataArray.push(
                {
                    // "title": $title,
                    // "contain": {
                        "Rank": $Rank,
                        "title": $title,
                        "year": $year,
                        "Rating": $Rating,
                        "Dir": $Dir,
                        "img": $img,
                        "href": $href,
                        "createDate": new Date()
                    // }
                }
            );
        }      
        callback(err, dataArray);
    });
}