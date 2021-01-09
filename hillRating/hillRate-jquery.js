/* 
 * All rights reserved : Matteo Collina
 * Linkedin: https://it.linkedin.com/in/matteo-collina-98ab73ab
 */

$(document).ready(function () {


    (function ($) {

        var defaults = {
            stars: 3,
            imageStar: {"default": 'img/star-empty.png', "full": "img/star-full.png", "half": "img/star-half.png"},
            valuesStar: [0, 1, 2],
            nameInput: "rating",
            responsive: false,
            showSelectedValue: false,
            edit: true
        };


        var methods = {
            init: function (options) {
                console.log('Init hillRate');
                var ratings = $(this);
                console.dir(ratings);

                /* if rating has same class*/
                ratings.each(function(index){
                    
                    var rating = $(this);                    
                    
                    var settings = $.extend({}, defaults, options);
                    var numStar = settings.stars;

                    var imageStarDefault = settings.imageStar.default;
                    var imageStarFull = settings.imageStar.full;
                    var imageStarHalf = settings.imageStar.half;
                    var state_unselected = settings.imageStar.state_unselected ? settings.imageStar.state_unselected : 'full';

                    var imageStarOnIndex = settings.imageStarOnIndex;
                    var valuesStar = settings.valuesStar ? settings.valuesStar : methods.initialValues(numStar);
                    var nameInput = settings.nameInput;
                    var responsive = settings.responsive;
                    var showSelectedValue = settings.showSelectedValue;
                    var edit = settings.edit;
                    var initialValue = rating.data('value');

                    rating.html('');
                    var styleContent = responsive ? 'style="width:100%"' : '';
                    rating.append('<div ' + styleContent + '>');

                    for (var i = 0; i < numStar; i++) {

                        var img = imageStarDefault;
                        var imgFull = imageStarFull;
                        var imgHalf = imageStarHalf;
                        var stateUnselected = state_unselected;

                        var valStar = valuesStar[i];
                        var titleStar = settings.titleStar ? settings.titleStar[i] : "";

                        if (imageStarOnIndex) {
                            for (var j = 0; j < imageStarOnIndex.length; j++) {
                                var thisImageStarOnIndex = imageStarOnIndex[j];
                                if (thisImageStarOnIndex.index == i) {
                                    img = thisImageStarOnIndex.default;
                                    imgFull = thisImageStarOnIndex.full;
                                    imgHalf = thisImageStarOnIndex.half;
                                    stateUnselected = thisImageStarOnIndex.state_unselected ? thisImageStarOnIndex.state_unselected : "full";
                                }
                            }
                        }
                        var percentual = 100 / (numStar + (showSelectedValue ? 1 : 0));
                        var styleItem = responsive ? 'style="width:' + percentual + '%"' : '';
                        rating.append('<img data-id="' + i + '" class="item-rate" data-title="' + titleStar + '" data-value="[' + valStar + ']" data-half="' + imgHalf + '" data-full="' + imgFull + '" data-default="' + img + '" data-unselected="' + stateUnselected + '" src="' + img + '" ' + styleItem + '>');
                    }


                    /* bind click function to select star */
                    rating.children(".item-rate").unbind("click").bind("click", {item: $(this), options: settings}, methods.selectStar);
                    if (!edit) {
                        rating.children(".item-rate").css({"pointer-events": "none"});
                    }

                    /* selected value */
                    var percentual = 100 / (numStar + (showSelectedValue ? 1 : 0));
                    var styleItem = responsive ? 'style="width:' + percentual + '%;float: right;text-align:center;margin-top:10px;font-size:20px;"' : '';
                    rating.append(' <div class="selected_value" ' + styleItem + '></div>');

                    /* input  */
                    rating.append(' <input name="' + nameInput + '" type="hidden">');
                    if (settings.titleStar) {
                        rating.append(' <p style="width: 100%;text-align: center;"></p> ');
                    }

                    /* set initial selected value if exist*/
                    if (initialValue >= 0) {
                        if (methods.existInitValueOfStar(initialValue, settings.valuesStar)) {
                            methods.setInitialDataOfRating(rating, initialValue);
                        } else {
                            console.log("Init value not found on possible values");
                        }
                    }

                    rating.append('</div>');

                });


            },
            /* Initialize values of each star */
            initialValues: function (numStar) {
                var values = [];
                for (var i = 0; i < numStar; i++) {
                    values.push(i);
                }
                return values;
            },
            /* Prende il valore selezionato */
            getSelectedValue: function (star,x) {
                var val = star.data('value');                
                if(x){
                  return methods.getSelectedOnStar(star,val,x);   
                }
            },
            /* Prende il titolo selezionato */
            getSelectedTitle: function (star,x) {
                var val = star.data('title').split(",");               
                if(x){
                  return methods.getSelectedOnStar(star,val,x); 
                }
            },
            getSelectedOnStar: function(star,val,x){
              /* Se è specificato la X vuol dire che l'utente ha selezionato tramite click */
                  if (val.length == 2) {
                        var pWidth = star.innerWidth();
                        if (pWidth / 2 > x) {
                            return  val[0];
                        }
                        else {
                            return  val[1];
                        }
                    }else {
                        return val[0];
                    }  
            },
            /* set status of ther stars depend on selected star ID*/
            setStatusOtherStarForSelectedId: function(star){
                var id = star.data('id');
                var allStars = star.siblings('.item-rate');
                allStars.each(function () {
                    // full star colored 
                    if ($(this).data('id') < id) {
                        var state = $(this).data('unselected');
                        $(this).attr('src', $(this).data(state));
                    } else if ($(this).data('id') > id) {
                        // empty star because not selected 
                        $(this).attr('src', $(this).data('default'));
                    }
                });
            },
            setStatusThisStarForSelectedValue: function(star,selected){
                var val = star.data('value');

                if (val.length == 2) {
                    // if star is half selected 
                    if (val[0] == selected) {
                        star.attr('src', star.data('half'));
                    } else {
                        star.attr('src', star.data('full'));
                    }
                } else {
                    // this stars is full
                    star.attr('src', star.data('full'));
                }
            },
            setInput: function(star,selected){
                star.siblings('input').val(selected);
            },
            setTitle: function(star,title){
                if (title != "") {
                    star.siblings('p').text(title);
                }
            },
            setShowedValue: function(star,showSelectedValue,selected){
                if (showSelectedValue) {
                    star.siblings('.selected_value').text(selected);
                } 
            },
            /* Check if exist init value in array of possible values*/
            existInitValueOfStar: function(val,array){
                var found = false;
                for(var i=0; i<array.length;i++){
                    if(array[i] instanceof Array){
                        if($.inArray(val, array[i]) != -1 ){
                            found = true;
                        }
                    }else{
                        if(val == array[i]){
                            found = true;
                        }
                    }
                }
                return found;
            },
            getStarOfRatingWithValue: function(rating,val){
                /* cerco la stella che ha quel valore del rating */
                var items = rating.children('.item-rate');
                var currStar;
                items.each(function( index ) {
                    var star = $(this);
                    var valori = star.data('value');
                    
                    if(valori.length > 1){
                        if(valori[0] == val){
                            currStar= star;
                            return false;
                        }else if(valori[1] == val){
                            currStar= star;
                            return false;
                        }
                    }else{
                        if(valori[0] == val){
                            currStar= star;
                            return false;
                        }
                    }
                });
                return currStar;
            },
            /* cerco il titolo della stella che ha quel valore del rating */
            getTitleOfRatingWithValue: function(rating,val){
                var items = rating.children('.item-rate');
                var currTitle;
                items.each(function( index ) {
                    var star = $(this);
                    var valori = star.data('value');
                    var titles = star.data('title').split(",");    
                    
                    if(valori.length > 1){
                        if(valori[0] == val){
                            currTitle= titles[0];
                            return false;
                        }else if(valori[1] == val){
                            currTitle= titles[1];
                            return false;
                        }
                    }else{
                        if(valori[0] == val){
                            currTitle= titles[0];
                            return false;
                        }
                    }
                });
                return currTitle;
            },
            /* When user ONCLICK on Star*/
            selectStar: function (e) {
                var item = $(e.target); /* star selected */

                var pOffset = item.offset();
                var x = e.pageX - pOffset.left;
                
                var selected = methods.getSelectedValue(item,x);
                var title = methods.getSelectedTitle(item,x);
                
               methods.setStatusOtherStarForSelectedId(item);
               methods.setStatusThisStarForSelectedValue(item,selected);

               methods.setInput(item,selected);
               methods.setTitle(item,title);

               var showSelectedValue = e.data.options.showSelectedValue;
               methods.setShowedValue(item,showSelectedValue,selected);
            },
            setInitialDataOfRating: function (rating,initialValue) {
                var options = $.fn.hillRate.arguments[0];
                var settings = $.extend({}, defaults, options);
                
                var title = methods.getTitleOfRatingWithValue(rating,initialValue);
                
                var item = methods.getStarOfRatingWithValue(rating,initialValue); //star with curr value
                methods.setStatusOtherStarForSelectedId(item);
                methods.setStatusThisStarForSelectedValue(item,initialValue);
                
               methods.setInput(item,initialValue);
               methods.setTitle(item,title);
               
               methods.setShowedValue(item,settings.showSelectedValue,initialValue);
            }
        };


        $.fn.hillRate = function (methodOrOptions) {
            if (methods[methodOrOptions]) {
                return methods[ methodOrOptions ].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
                // Default to "init"
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + methodOrOptions + ' does not exist on jQuery.hillRate');
            }
        };

    })(jQuery);
    
    
    
    
});