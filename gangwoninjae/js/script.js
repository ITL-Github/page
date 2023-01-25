$(function() {

    var navOffset = $('#header').offset();

	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 30) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

	// 230101 수정
	// var highestBox = 0;
	// 	$('#gnb_pc .depth_02').each(function(){
	// 		if($(this).height() > highestBox){
	// 		highestBox = $(this).height() + 80;
	// 	}
	// });

	$('#gnb_pc .depth_01 li').on('mouseover focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('#gnb_pc .depth_02, .mask_pc').show();
		$('.bg_pc').show().css('height'); // 230101 수정

		var offset = $(this).position().left + ($(this).width() / 2 - 16);
		$('#gnb_pc .cycle').stop().animate({'left':offset}, 600,'easeOutCubic');

	});

	$('#gnb_pc .depth_01 li').on('mouseout', function () {
		$(this).children('h2').removeClass('active');
	});

	$('#header').on('mouseleave', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('#gnb_pc .depth_02, .bg_pc, .mask_pc').hide();
		$(".btn_sitemap").removeClass('active');
	});

	$('#gnb_pc h2 a').on('focusin', function () {
		$('#header').addClass('active');
		$('#gnb_pc h2').removeClass('active');
		$(this).parent().addClass('active');
		$('#gnb_pc .depth_02, .mask_pc').show();
		$('.bg_pc').show().css('height',highestBox);
	});

	$('#gnb_pc a:last').on('focusout', function () {
		$('#header').removeClass('active');
		$('#gnb_pc h2').removeClass('active');
		$('#gnb_pc .depth_02, .bg_pc, .mask_pc').hide();
	});

	$('#header .btn_sitemap').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');

		if ($(this).hasClass('active')) {
			$('body').addClass('fixed');
			$("#gnb_pc .depth_02, .bg_pc, .mask_pc").show();
		} else{
			$('body').removeClass('fixed');
			$("#gnb_pc .depth_02, .bg_pc, .mask_pc").hide();
		}
	});


	$('#header .mopen').on('click', function (e) {
		e.preventDefault();
	    $(this).toggleClass('active');
		$('#gnb_mobile').toggleClass('active');
		$('.mask_mobile').fadeToggle(200);
		if ($(this).hasClass('active')) {
			$('body').addClass('fixed');
		} else{
			$('body').removeClass('fixed');
		}
	});

	$('.mask_mobile').on('click', function (e) {
		e.preventDefault();
		$('#gnb_mobile').removeClass('active');
		$('#header .mopen').removeClass('active');
		$('.mask_mobile').fadeOut(200);
		$('body').removeClass('fixed');
	});

	$('#gnb_mobile').swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
			if( direction == "right"){
				if(distance > 150){
					$('.mask_mobile').hide();
					$('#gnb_mobile').removeClass('active');
					$('#gnb_mobile').removeAttr('style');
					$('body').removeClass('fixed');
					$('#header .mopen').removeClass('active');
				}else{
					if (phase=="move"){
						$('#gnb_mobile').css('right',-distance).css('transition','none');
					}
					if (phase=="end"){
						$('#gnb_mobile').removeAttr('style');
					}
				}
			}
        },
		allowPageScroll:"vertical",
        threshold:0,
		excludedElements: "a, label, button, input, select, textarea, .slick"
    });





	$('#gnb_mobile .depth_01 h2.active').next('.depth_02').show();
    $('#gnb_mobile .depth_02 h3.active').next('.depth_03').show();

	$('#gnb_mobile h2 a').on('click', function (e) {
        e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_02').slideUp(300);
		} else{
            $('#gnb_mobile h2').removeClass('active');
            $('#gnb_mobile .depth_02').slideUp(300);
            $(this).parent().addClass('active');
            $(this).parent().next('.depth_02').slideDown(300);
		}
	});


	$('#gnb_mobile .depth_03').prev('h3').addClass('has_depth');

    $('#gnb_mobile .depth_02 h3.has_depth a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parent().next('.depth_03').slideUp(300);
		} else{
			$('#gnb_mobile h3').removeClass('active');
			$('#gnb_mobile .depth_03').slideUp(300);
			$(this).parent().addClass('active');
			$(this).parent().next('.depth_03').slideDown(300);
		}
	});

	$('#btn_top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
	});

	var currentPosition = parseInt($("#btn_top").css("top"));
	$(window).on('scroll', function () {
		var posY = $(window).scrollTop();
		$("#btn_top").stop().animate({"top":posY+currentPosition+"px"},500);
		if ( posY > 100 ){
			$("#btn_top").css('opacity','1');
		} else if(posY < 100) {
			$("#btn_top").css('opacity','0');
		};
	});

	// 221204 추가
	var currentPosition2 = parseInt($(".btn-top").css("top"));
	$(window).on('scroll', function () {
		var posY = $(window).scrollTop();
		console.log(posY)
		$(".btn-top").stop().animate({"top":posY+currentPosition2+"px"},500);
		if ( posY > 100 ){
			$(".btn-top").css('opacity','1');
		} else if(posY < 100) {
			$(".btn-top").css('opacity','0');
		};
	});



	$('#footer .open').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else{
			$('#footer .open').removeClass('active');
			$(this).addClass('active');
		}
	});


	$('#footer .view a:last-child').on('focusout', function () {
		$('#footer .open').removeClass('active');
		$(this).parent('.view').prev('.open').focus();
	});

	$('#footer .family').on('mouseleave', function () {
		$('#footer .open').removeClass('active');
	});



	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});

// 메인
    $('#visual .slick-visual').slick({
		autoplay: true,
        arrows: false,
        dots: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        accessibility: false,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        speed: 800,
        swipeToSlide: true,
        autoplaySpeed: 12000,
		responsive: [
			{
				breakpoint: 428,
				settings: {
					speed: 800,
					slidesToShow: 1,
					variableWidth: true,

				}
			},
			{
            breakpoint: 761,
            settings: {
                speed: 800,
                slidesToShow: 1,
                variableWidth: true,

            }
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 1,
                variableWidth: true,
            }
        }]
    });


	// $('#visual').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
	// 		$('.visual-area').removeClass('active');
	// 	});

	// $('#visual').on('afterChange', function(event, slick, currentSlide, nextSlide) {
	// 	var imagUrl = `./imgs/main/bg_visual_0${currentSlide + 1}.png`;

	// 	$('.visual-area').addClass('active');
	// 	if($('.visual-area').addClass('active')) {
	// 		$(".visual-area").css("background-image", "url(" + imagUrl + ")")
	// 	}
	// });


	$('#visual .playToggle').click( function() {
		if ($(this).html() == '정지' && $(this).hasClass('pause')){
				$(this).removeClass('pause');
				$('.slick-visual').slick('slickPause');
				$(this).html('재생');
				$(this).addClass('play');
			} else {
				$(this).removeClass('play');
				$('.slick-visual').slick('slickPlay');
				$(this).html('정지');
				$(this).addClass('pause');
			}
	});

	$('#visual .slick-slide').each(function(){
		if ($("#visual .slick-slide").length === 1) {
			$('#visual .playToggle').css("display", "none")
		}
	});


    $('#info-list .slick').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        accessibility: false,
        slidesToScroll: 1,
        pauseOnHover: false,
        focusOnSelect: true,
        speed: 800,
        swipeToSlide: true,
        autoplaySpeed: 12000,
		responsive: [
			{
				breakpoint: 428,
				settings: {
					speed: 800,
					slidesToShow: 1,
					variableWidth: true,
					centerMode:true,
					centerPadding:'30px',
				}
			},
			{
            breakpoint: 768,
            settings: {
                speed: 800,
                slidesToShow: 1,
                variableWidth: true,
				centerMode:true,
				centerPadding:'30px',
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                variableWidth: true,
				centerMode:true,
				centerPadding:'30px',
            }
        }]
    });

	$('#info-list .playToggle').click( function() {
		if ($(this).html() == '정지' && $(this).hasClass('pause')){
				$(this).removeClass('pause');
				$('.slick-visual').slick('slickPause');
				$(this).html('재생');
				$(this).addClass('play');
			} else {
				$(this).removeClass('play');
				$('.slick-visual').slick('slickPlay');
				$(this).html('정지');
				$(this).addClass('pause');
			}
	});

	// tab common
	$('.tab').each(function(){
		$(this).find('.tab-menu a').on('click', function (e) {
			var tabId = $(this).attr('data-id');

			e.preventDefault();
			$(this).closest('.tab').find('.tab-menu a').removeClass('is-active');
			$(this).closest('.tab').find('.tab-panel').removeClass('is-active');

			$(this).addClass('is-active');
			$('#' + tabId).addClass('is-active');

			$('#info-list .slick').slick('setPosition');
		});
	});

// $(window).on('load resize', function () {
// 	$('#visual .slick').slick('resize');
// 	$('#info-list .slick').slick('resize');
// });

});

$(document).ready(function(){
	$('#header .btn_sitemap').click(function(){
		$('#sitemap').css("display", "block")
	});
});

$(document).ready(function(){
	$('#sitemap .btn-close').click(function(){
		$('#sitemap').css("display", "none")
	});
});

