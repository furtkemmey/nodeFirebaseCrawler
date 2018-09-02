// firebase config
var config = {

};
firebase.initializeApp(config);

$(document).ready(()=>{
    function getData() {
        const database = firebase.database();
        database.ref('/movies/').once('value').then(function(snapshot){
            var snapshotObject = snapshot.val();
            // console.log('value ' + valArr)
            
            var compiled = _.template( $("#moban").html() ); // underscore 轉模板
            $("#allData").html(); // clean data
            for(var i = 0; i<snapshotObject.length; i++) {
                console.log(snapshotObject[i].Rank);
                var html = compiled(
                    {
                        rank: snapshotObject[i].Rank,
                        title: snapshotObject[i].title,
                        rating: snapshotObject[i].Rating,                    
                        year: snapshotObject[i].year,
                        href: snapshotObject[i].href,
                        img: snapshotObject[i].img
                    }
                );
                $('#allData').append($(html));
            }
        });
    }
    getData(); // get data at first time

    $('#Crawler').click( ()=>{
        $.get("/api/set", (result)=>{
            console.log('/api/set/ -> done');
           // getData();
        });
    });
}); //end ready()
