$(document).ready( function() {

  /* Fires fitVids plugin. */
    $(".delicious main").fitVids();
  /**/

  /* Get first post image and make it thumbnail. */
    function generateThumbs() {
      function createNewImgIndex(url, src, el) {
        $('<a href="' + url + '" style="background-image: url('+ src +');"></a>').prependTo(el);
      }

      $('.home-template .post, .archive-template .post').each( function() {
        var postURL = $(this).find('.post-title a').attr('href');
        var firstImg = $(this).find('img:first-of-type');
        var firstImgSrc = firstImg.attr('src');
        if (typeof firstImgSrc !== 'undefined') {
          createNewImgIndex(postURL, firstImgSrc, this);
          firstImg.parent().remove();
        }
      });

      $('.home-template .all-recipes .post > a').wrap('<div class="post-tag-icon" />');
    }
  /**/

  generateThumbs();

  /* Fires infinite scroll plugin. */
    var curPage = 1;
    var pageNumString = $('.pagination .page-number').text();
    var pageNumMarker = pageNumString.indexOf('of');
    var finalPageNumbers = pageNumString.substring(pageNumMarker + "of ".length), rest = pageNumString.substring(0, pageNumMarker);

    $('.delicious .all-recipes').infinitescroll({
      navSelector  : '.pagination',            
      nextSelector : '.older-posts',    
      itemSelector : '.all-recipes .post',
      loading      : {
        finishedMsg : '',
        img         : 'data:image/gif;base64,R0lGODlhEAAQAPQAAP///8XFxfz8/NHR0eLi4sbGxs3NzfX19erq6snJyd/f39vb2/j4+Ofn5/Hx8dXV1djY2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==',
        msgText     : ''
      }, 
      extraScrollPx: 250
        }, function() {

        curPage++;

        if(curPage == finalPageNumbers) {
            $(window).unbind('.infscr');
        }

       generateThumbs();
       tagDetector();
    });
  /**/

  /* Show only first 3 post in the newest post section & removes first 3 in the all recipes */
    $('.newest-recipes .post:gt(2)').remove();
    $('.all-recipes .post:lt(3)').remove();
  /**/

  /* Show excerpt in the featured post. */
    function trim(string, num) {
      var trimedString = string.substring(0, num);
      trimedString += '...';
      return trimedString;
    }

    var firstParagraphText = $('.newest-recipes .post:first-of-type').find('p:first-of-type').text();
    $('<p class="excerpt">' + trim(firstParagraphText, 100) + '</p>').insertBefore('.buttons');
  /**/

  /* Tag detector. */
  function tagDetector() {
    $('.index .post').each( function() {
      var postURL = $(this).find('.post-title a').attr('href');
      var tags = $(this).find('.post-tags');
      var tagsText = tags.text().toLowerCase();

      switch(tagsText) {
        case 'asian':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-asian'))
            $('<a href="' + postURL + '" class="foodicon-asian"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'bbq':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-bbq'))
            $('<a href="' + postURL + '" class="foodicon-bbq"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'beer':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-beer'))
            $('<a href="' + postURL + '" class="foodicon-beer"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'breakfast':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-breakfast'))
            $('<a href="' + postURL + '" class="foodicon-breakfast"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'cocktails':
        case 'cocktail':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-cocktails'))
            $('<a href="' + postURL + '" class="foodicon-cocktails"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'coffee':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-coffee'))
            $('<a href="' + postURL + '" class="foodicon-coffee"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'desserts':
        case 'dessert':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-desserts'))
            $('<a href="' + postURL + '" class="foodicon-desserts"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'drinks':
        case 'drink':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-drinks'))
            $('<a href="' + postURL + '" class="foodicon-drinks"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'fruits':
        case 'fruit':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-fruits'))
            $('<a href="' + postURL + '" class="foodicon-fruits"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'junk':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-junk'))
            $('<a href="' + postURL + '" class="foodicon-junk"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'main':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-main'))
            $('<a href="' + postURL + '" class="foodicon-main"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'meat':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-meat'))
            $('<a href="' + postURL + '" class="foodicon-meat"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'pasta':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-pasta'))
            $('<a href="' + postURL + '" class="foodicon-pasta"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'pizza':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-pizza'))
            $('<a href="' + postURL + '" class="foodicon-pizza"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'salads':
        case 'salad':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-salad'))
            $('<a href="' + postURL + '" class="foodicon-salad"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'seafood':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-seafood'))
            $('<a href="' + postURL + '" class="foodicon-seafood"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'snacks':
        case 'snack':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-snack'))
            $('<a href="' + postURL + '" class="foodicon-snack"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'soups':
        case 'soup':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-soups'))
            $('<a href="' + postURL + '" class="foodicon-soups"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'tea':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-tea'))
            $('<a href="' + postURL + '" class="foodicon-tea"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        case 'vegetarian':
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-vegetarian'))
            $('<a href="' + postURL + '" class="foodicon-vegetarian"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
        default:
          if (!$(this).find('.post-tag-icon > a').hasClass('foodicon-main'))
            $('<a href="' + postURL + '" class="foodicon-main"></a>').appendTo($(this).find('.post-tag-icon'));
          break;
      }
    });
  }

  tagDetector();
  /**/

  /* Make first unordered list in the post - recipe list. */
    var getFirstUnList = $('.post-template .post-content').find('ul:first-of-type:first');
    getFirstUnList.addClass('recipe-ingredients').attr('id', 'recipe-ingredients').appendTo('.post-content');
    getFirstUnList.find('li').on('click', function() {
      $(this).toggleClass('selected');
    });
  /**/
});