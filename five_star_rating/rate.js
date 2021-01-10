$(document).ready(function () {

    var starIds = '';
    var rating = 3; // Example 3 stars
    for (var i = 0; i < rating; i++) {
        if (i != (rating - 1)) {
            starIds += '#s' + (i + 1) + ',';
        } else {
            starIds += '#s' + (i + 1);
        }
    }
    // console.log(starIds);
    $(starIds).css("color", "black");

    /* Star rating */
    $("#e1").click(function () {
        $(".fa-star").css("color", "grey");
        $("#e1").css("color", "black");
    });

    $("#e2").click(function () {
        $(".fa-star").css("color", "grey");
        $("#e1,#e2").css("color", "black");
    });

    $("#e3").click(function () {
        $(".fa-star").css("color", "grey");
        $("#e1,#e2,#e3").css("color", "black");
    });

    $("#e4").click(function () {
        $(".fa-star").css("color", "grey");
        $("#e1,#e2,#e3,#e4").css("color", "black");
    });

    $("#e5").click(function () {
        $(".fa-star").css("color", "grey");
        $("#e1,#e2,#e3,#e4,#e5").css("color", "black");
    });

});