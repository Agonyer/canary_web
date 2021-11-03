var joinBannerswiper = new Swiper('.joinBanner .swiper-container', {

  autoplay: true,
  loop: true,
 
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
 

var tabsSwiper = new Swiper('#tabs-container', {
  speed: 500,
  on: {
      slideChangeTransitionStart: function() {
          $(".tabs .active").removeClass('active');
          $(".tabs a").eq(this.activeIndex).addClass('active');
      }
  }
})
$(".tabs a").on('click', function(e) {
  e.preventDefault()
  $(".tabs .active").removeClass('active')
  $(this).addClass('active')
  tabsSwiper.slideTo($(this).index())
})

