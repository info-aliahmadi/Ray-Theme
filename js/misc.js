(function($) {
  'use strict';
  $(function() {
    var body = $('body');
    var contentWrapper = $('.content-wrapper');
    var scroller = $('.container-scroller');
    var footer = $('.footer');
    var sidebar = $('.sidebar');

    //Add active class to nav-link based on url dynamically
    //Active class can be hard coded directly in html file also as required
    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.nav li a', sidebar).each(function() {
      var $this = $(this);
      if (current === "") {
        //for root url
        if ($this.attr('href').indexOf("index.html") !== -1) {
          $(this).parents('.nav-item').last().addClass('active');
          if ($(this).parents('.sub-menu').length) {
            $(this).closest('.collapse').addClass('show');
            $(this).addClass('active');
          }
        }
      } else {
        //for other url
        if ($this.attr('href').indexOf(current) !== -1) {
          $(this).parents('.nav-item').last().addClass('active');
          if ($(this).parents('.sub-menu').length) {
            $(this).closest('.collapse').addClass('show');
            $(this).addClass('active');
          }
        }
      }
    })

    //Close other submenu in sidebar on opening any

    sidebar.on('show.bs.collapse', '.collapse', function() {
      sidebar.find('.collapse.show').collapse('hide');
    });


      //Change sidebar and content-wrapper height
      applyStyles();
      function applyStyles() {
  
        //setting content wrapper height
        if(!(body.hasClass("horizontal-menu") && window.matchMedia('(min-width: 992px)').matches)) {
          setTimeout(function(){
            if(contentWrapper.outerHeight() < (sidebar.outerHeight() - footer.outerHeight())) {
              contentWrapper.css({
                'min-height':sidebar.outerHeight() - footer.outerHeight()
              });
            }
  
            if(sidebar.outerHeight() < (contentWrapper.outerHeight() + footer.outerHeight())) {
              sidebar.css({
                'min-height':contentWrapper.outerHeight() + footer.outerHeight()
              });
            }
  
          }, 1000);
        }
        else {
          contentWrapper.css({
            'min-height':'100vh'
          });
        }
  
        //Applying perfect scrollbar
        if(!body.hasClass("rtl")) {
          if($('.settings-panel .tab-content .tab-pane.scroll-wrapper, ul.chats, .table-responsive').length){
            const ps_scrollbar = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper, ul.chats, .table-responsive');
          }
          if(body.hasClass("sidebar-fixed")) {
            if($('#sidebar .nav').length){
              const sidebar_scrollbar = new PerfectScrollbar('#sidebar .nav');
            }
          }
        }
      }

    // $('.sidebar [data-toggle="collapse"]').on("click", function(event) {
    //   //Updating content wrapper height to sidebar height on expanding a menu in sidebar
    //   var clickedItem = $(this);
    //   console.log(clickedItem);
    //   if (clickedItem.attr('aria-expanded') === 'false') {
    //     var scrollTop = scroller.scrollTop() - 20;
    //   } else {
    //     var scrollTop = scroller.scrollTop() - 100;
    //   }
    //   setTimeout(function() {
    //     if (contentWrapper.outerHeight() + footer.outerHeight() !== sidebar.outerHeight()) {
    //       applyStyles();
    //       scroller.animate({
    //         scrollTop: scrollTop
    //       }, 350);
    //     }
    //   }, 400);
    // })



    $('.sidebar [data-toggle="collapse"]').on("click", function(event) {
      if(!(body.hasClass('sidebar-icon-only')||body.hasClass('horizontal-menu'))) {
        //Updating content wrapper height to sidebar height on expanding a menu in sidebar
        var clickedItem = $(this);
        console.log(clickedItem);
        if(clickedItem.attr('aria-expanded') === 'false') {
          var scrollTop = scroller.scrollTop() - 20;
        }
        else {
          var scrollTop = scroller.scrollTop() - 100;
        }
        setTimeout(function(){
            if(contentWrapper.outerHeight()+ footer.outerHeight()!== sidebar.outerHeight()) {
              applyStyles();
              scroller.animate({ scrollTop: scrollTop }, 350);
            }
        }, 400);
      }
      else {
        //Disable click on sidebar menu item when sidebar icon only mode or horizontal menu mode is in use
        //to avoid ambiguity of mixed hover and click on menu item
        return false;
      }
    })
    $('[data-toggle="minimize"]').on("click", function () {
      if((body.hasClass('sidebar-toggle-display'))||(body.hasClass('sidebar-absolute'))) {
        body.toggleClass('sidebar-hidden');
        applyStyles();
      }
      else {
        body.toggleClass('sidebar-icon-only');
        applyStyles();
      }
    });







    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
  });
})(jQuery);
