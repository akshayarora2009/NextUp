


$(function () {





    var time = [];
    var sub = [];
    var room = [];

    var newtime = [];
    var newsub = [];
    var newroom = [];
    var where = 0;
    var next = false;
    var tempwhere = 0;


    var flag = -1;

    $('#logout').click(function (event) {

        localStorage.clear();
        window.location.href = "index.html";

    });




    var d = new Date();

    var hours = d.getHours();
    var day = d.getDay();


    var yearCode = localStorage.yearCode;
    var branchCode = localStorage.branchCode;
    var groupCode = localStorage.groupCode;




    if (day === 0 || day === 6) {

        // Weekend

        var link = 'AJAX/' + yearCode + '/' + branchCode + '/' + groupCode + '/1.json';








        $.getJSON(link, function (data) {

            $.each(data, function (key, val) {

                time.push(key);
                sub.push(val[0].subject);
                room.push(val[0].room);


            });


            // By this point, we have our arrays filled and ready!


            //alert('transfer successful');
            console.log(time);
            console.log(sub);
            console.log(room);

            $("#current").text("No Class currently going on.");

            $("#upcoming1").text(sub[0]);
            $("#upcoming1").append(" - " + room[0]);
            $("#upcoming1T").text('Monday, ' + time[0] + ":00");

            $("#upcoming2").text(sub[1]);
            $("#upcoming2").append(" - " + room[1]);

            $("#upcoming2T").text('Monday, ' + time[1] + ":00");

        });


    }


        // **********************************************
    else {

        // weekday detected

        var link = 'AJAX/' + yearCode + '/' + branchCode + '/' + groupCode + '/' + day + '.json';


        $.getJSON(link, function (data) {

            $.each(data, function (key, val) {

                time.push(key);
                sub.push(val[0].subject);
                room.push(val[0].room);


            });
            // By this point, we have our arrays filled and ready!


            //alert('transfer successful');

            var returned = findHour(hours);


            if (typeof returned === "number") {
                $("#current").text(sub[returned]);
                $("#current").append(" - " + room[returned]);
                $("#currentT").text("Today, " + time[returned] + ":00");

            }
            else {
                $("#current").text("No Class currently going on.");

            }






            var returned2 = findHour(hours + 1);

            if (typeof returned2 === "number") {
                $("#upcoming1").text(sub[returned2]);
                $("#upcoming1").append(" - " + room[returned2]);
                $("#upcoming1T").text("Today, " + time[returned2] + ":00");
                where = time[returned2];
                //alert(where);
            }

            else {
                returned2 = findClassOnSameDay(hours + 1);
                //alert(returned2);
                if (typeof returned2 === "number") {
                    $("#upcoming1").text(sub[returned2]);
                    $("#upcoming1").append(" - " + room[returned2]);
                    $("#upcoming1T").text("Today, " + time[returned2] + ":00");
                    where = time[returned2];


                }


                else {
                    if (day === 5)
                        day = 1;
                    else
                        day = day + 1;


                    flag = 0;
                    next = true;

                    var name = findADay(day);


                    var newlink = 'AJAX/' + yearCode + '/' + branchCode + '/' + groupCode + '/' + day + '.json';


                    $.getJSON(newlink, function (data) {



                        $.each(data, function (key, val) {

                            newtime.push(key);
                            newsub.push(val[0].subject);
                            newroom.push(val[0].room);


                        });




                        $("#upcoming1").text(newsub[0]);
                        $("#upcoming1").append(" - " + newroom[0]);
                        $("#upcoming1T").text(name + ", " + newtime[0] + ":00");


                    });










                }








            }
            //**************************************************************************************
            //var returned3 = findHour(hours + 2);
            // alert(where);

            if (next === true) {
                tempwhere = 20;
            }
            else {
                tempwhere = where;
            }
            var returned3 = findClassOnSameDay(tempwhere);
            //alert(newsub[1]);
            //alert('returned: ' + returned3);
            //alert('flag: ' + flag);
            console.log(time);

            if (typeof returned3 === "number") {
                $("#upcoming2").text(sub[returned3]);
                $("#upcoming2").append(" - " + room[returned3]);
                $("#upcoming2T").text("Today, " + time[returned3] + ":00");
            }

            else {
                if (flag === 0) {

                    /*alert('here');
                    // Next day
                    $("#upcoming2").text(newsub[1]);
                    $("#upcoming2").append(" - " + newroom[1]);
                    $("#upcoming2T").text(name + ", " + newtime[1] + ":00");*/



                    var newlink = 'AJAX/' + yearCode + '/' + branchCode + '/' + groupCode + '/' + day + '.json';


                    $.getJSON(newlink, function (data) {



                        $.each(data, function (key, val) {

                            newtime.push(key);
                            newsub.push(val[0].subject);
                            newroom.push(val[0].room);


                        });




                        $("#upcoming2").text(newsub[1]);
                        $("#upcoming2").append(" - " + newroom[1]);
                        $("#upcoming2T").text(name + ", " + newtime[1] + ":00");


                    });

                }

                else {
                    // only this class is on the next day
                    if (day === 5)
                        day = 1;
                    else
                        day = day + 1;



                    var name = findADay(day);

                    //alert(name);

                    var newlink = 'AJAX/' + yearCode + '/' + branchCode + '/' + groupCode + '/' + day + '.json';


                    $.getJSON(newlink, function (data) {

                        $.each(data, function (key, val) {

                            newtime.push(key);
                            newsub.push(val[0].subject);
                            newroom.push(val[0].room);


                        });


                        //alert('refilled');

                        $("#upcoming2").text(newsub[0]);
                        $("#upcoming2").append(" - " + newroom[0]);
                        $("#upcoming2T").text(name + ", " + newtime[0] + ":00");


                    });

                }








            }


        });





    }

var message=findYear(localStorage.yearCode) + ' year ' + findABranch(localStorage.branchCode) + ' G:' + localStorage.groupCode + ' Touch to change';
$('#logout').attr("value",message);

function findYear(no)
{
var ch=Number(no);
switch(ch)
{
case 1: return "I";
break;
case 2: return "II";
break;
case 4: return "IV";
break;



}




}



    // ************************************************************************************************************

    function findHour(hour) {
        for (var i = 0; i < time.length; i++) {
            if (hour === Number(time[i]))
                return i;

        }


    }

    function findClassOnSameDay(hours) {
        var starting = Number(hours) + 1;
        //alert(starting);
        var status = false;
        for (; starting < 19; starting++)
            for (var i = 0; i < time.length; i++) {
                if (Number(time[i]) === starting) {
                    status = true;
                    return i;
                }
            }





    }


    function findOtherClass(hour) {

        for (var i = 0; i < newtime.length; i++) {
            if (hour === Number(newtime[i]))
                return i;

        }





    }

    function findADay(day) {
        var ch = day;
        var tobe;
        switch (ch) {
            case 1: return "Monday";
                break;
            case 2: return "Tuesday";
                break;
            case 3: return "Wednesday";
                break;
            case 4: return "Thursday";
                break;
            case 5: return "Friday";

        }


    }

function findABranch(no){

var ch=Number(no);

switch(ch)
{
case 1: return "Aero";
break;

case 2: return "Civil";
break;

case 3: return "CSE";
break;

case 4: return "Electrical";
break;

case 5: return "ECE";
break;

case 6: return "Mechanical";
break;

case 7: return "Meta";
break;

case 8: return "Production";
break;

case 9: return "IT";
break;





}

}



    $('#refresh').click(function (event) {
        window.location.reload();
    });


});