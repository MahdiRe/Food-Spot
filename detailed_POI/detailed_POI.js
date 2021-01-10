var slideIndex = 1;

// var POI_Object =
//     {
//         productID: 1,
//         shop: "Nufail bun shop",
//         picture: ["bun.jpg", "cart.png", "cart2.png", "heart.png", "heart2.png", "Sample.mp4"],
//         name: "Chicken Submarine",
//         description: "Home made pasta with sun kissed milk sauce, chilli, olive oil and egg all mixed together Italian pasta....",
//         price: 200,
//         rating: 4,
//         isFavourite : false
//     }

$(document).ready(function () {

    ListOfPOI = JSON.parse(localStorage.POI_Object);
    console.log(ListOfPOI[0]);

    var slideShow = '';
    var slideDot = '<div class="dot-list">';
    $.each(ListOfPOI[0].picture, function (index, item) {
        slideShow += '<div class="mySlides fade">';
        slideShow += '<div class="numbertext">'+(index+1)+' / ' + ListOfPOI[0].picture.length + '</div>';
        slideShow += '<img src="../sub1.jpg" style="width:100%">';
        slideShow += '</div>';
        slideDot += '<span class="dot" onclick="currentSlide('+(index+1)+')"></span>';
    });
    slideDot += '</div>';
    $("#slide-show").html(slideShow);
    $("#slide-dot").html(slideDot);

    

    var setTitle = '<div class="title">'+ ListOfPOI[0].name +'</div>';
    var setShop = '<div class="shop">By <b>'+ ListOfPOI[0].shop+'</b></div>';
    var setDesc = '<div class="description">'+ListOfPOI[0].description+'</div>';
    var setItemPrice = '<div class="item-price">'+ListOfPOI[0].price+'</div>'
    $("#set-title").html(setTitle);
    $("#set-shop").html(setShop);
    $("#set-desc").html(setDesc);
    $("#set-item-price").html(setItemPrice);
    
    var starIds = '';
    var rating = ListOfPOI[0].rating;
    for(var i=0; i<rating; i++){
        if (i!=(rating-1)){
            starIds += '#s' + (i+1) + ',';
        }else{
            starIds += '#s' + (i+1);
        }
    }
    // console.log(starIds);
    $(starIds).css("color", "black");

    showSlides(slideIndex);

    /* Star rating */
    $("#s1").click(function () {
        $(".fa-star").css("color", "black");
        $("#s1").css("color", "yellow");
    });

    $("#s2").click(function () {
        $(".fa-star").css("color", "black");
        $("#s1,#s2").css("color", "yellow");
    });

    $("#s3").click(function () {
        $(".fa-star").css("color", "black");
        $("#s1,#s2,#s3").css("color", "yellow");
    });

    $("#s4").click(function () {
        $(".fa-star").css("color", "black");
        $("#s1,#s2,#s3,#s4").css("color", "yellow");
    });

    $("#s5").click(function () {
        $(".fa-star").css("color", "black");
        $(".fa-star").css("color", "yellow");
    });



    /* Quantity adjuster */
    // This button will increment the value
    $('[data-quantity="plus"]').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    // This button will decrement the value till 0
    $('[data-quantity="minus"]').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}