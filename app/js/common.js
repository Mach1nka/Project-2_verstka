;(function ($,undefined) {
  var $grid=$('.post-list').imagesLoaded( function() {
    $grid.masonry({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.post-item',
      // use element for option
      columnWidth: '.post-item-sizer',
      percentPosition: true
    });
  });
})(jQuery);
