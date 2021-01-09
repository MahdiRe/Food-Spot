var slideIndex = 1;

$(document).ready(function () {

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

    // $(".con").insertAfter($(".item"));



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