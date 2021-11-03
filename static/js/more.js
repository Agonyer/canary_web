

$(function() {
	
	wow = new WOW(
      {
        animateClass: 'animated',
		offset: 50,
		mobile: true,
		live: true
      }
    );
    wow.init();
	
	//erweima
	$(".code-div a.a2").click(function() {
		timeObj.start();
	})
	var timeObj = {
	    flag:0,
	    t:null,
	    start:function(){
	        var that = this;
	        if(that.flag==0){
	            that.show();
	            t = setTimeout(function () {
        	   		that.hide();
        	  	}, 3000);
	        }else{
	            that.end();
	        }
	    },
	    show:function(){
	        $(".erweima").show();this.flag=1;
	    },
	    hide:function(){
	        $(".erweima").hide();this.flag=0;
	    },
	    end:function(){
	        clearTimeout(this.t);this.flag=0;
	    }
	}
	
	
	
				
	// banner切换
	var swiper1 = new Swiper('#banner', {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		speed: 500,
		effect: 'fade',
		loop: true, //必须
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	$('.bar-btn').click(function() {
		$(this).toggleClass('on');
		$('.mobile-nav').toggleClass('on');
	})
	$('.mobile-nav li').click(function() {
		$(this).toggleClass('on').siblings().removeClass('on')
		$(this).find('.m-subnav').slideToggle().end().siblings().find('.m-subnav').slideUp();
	})
	
	$('.index-sec3 .tab-hd li').hover(function() {
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on')
		$('.index-sec3 .tab-bd .tab-pal').eq(index).addClass('on').siblings().removeClass('on');
	})
	
	// 关于我们团队
	var swiper = new Swiper('.about-team', {
		slidesPerView: 3,
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			//当宽度大于等于320
			1200: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			600: {
				slidesPerView: 2,
				spaceBetween: 0
			},
		}
	});
	
	// 关于我们时间轴
	var swiper = new Swiper('.about-time', {
		slidesPerView: 3,
		centeredSlidesBounds: true,
		paginationClickable: true,
		spaceBetween: 0,
		navigation: {
			nextEl: '.swiper-button-next1',
			prevEl: '.swiper-button-prev1',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			//当宽度大于等于320
			1200: {
				slidesPerView: 3,
				spaceBetween: 0
			},
			700: {
				slidesPerView: 2,
				spaceBetween: 0,
				centeredSlides: false,
			},
			520: {
				slidesPerView:1,
				spaceBetween: 0,
				centeredSlides: false,
			},
		}
	});
	// 加入我们图片滚动
	window.onload = function() {
		var swiper = new Swiper('.join-box1tu', {
			autoplay: 3000,
			speed: 1000,
			autoplayDisableOnInteraction: false,
			loop: true,
			centeredSlides: true,
			slidesPerView: 2,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			onInit: function(swiper) {
				swiper.slides[2].className = "swiper-slide swiper-slide-active"; //第一次打开不要动画
			},
			breakpoints: {
				668: {
					slidesPerView: 1,
				}
			}
		});
	}
	$('.share-btn').click(function() {
		$('.share-div').stop().fadeToggle();
	})
	$('.weixin1').click(function() {
		$('.code-div1').stop().fadeToggle();
	})
	
	
	
});
