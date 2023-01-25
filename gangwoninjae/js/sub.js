$(function() {

	// 기관정보보기 전체보기 버튼클릭 이벤트
	$("#orgAllSearchBtn").on('click', function() {
		$("#search-keyword").val('');
		$("#selectRegionCode").val('');
		$("#orgSortL").val('').prop("selected", true);
		$("#orgSortM").val('').prop("selected", true);
		$("#orgSortS").val('').prop("selected", true);
		$("#orgSearchBtn").trigger('click');
	})

	// 기관검색 행정구역 지도
	/*$(".selectRegionCode").on('click', function() {
		$(".selectRegionCode").removeClass("on");
		$(this).addClass("on");
		$("#selectRegionCode").val(this.dataset.code);
	})*/

	$('#content .share .open').on('click', function (e) {
		 e.preventDefault();
		$(this).next().fadeToggle(100);
	});

	$('#content .share ul a:last').on('focusout', function () {
		$('#content .share .open').focus();
	});

	$('.calendar01 td.possible > a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$(this).parents('tr').next('.schedule').fadeOut(300);
		} else {
			$('.calendar01 td').removeClass('active');
			$(this).parent().addClass('active');
			$('.calendar01 .schedule').fadeOut(300);
			$(this).parents('tr').next('.schedule').fadeIn(300);
		}
	});

	$('.event .slick_wrap .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('.event .slick_wrap .prev'),
        nextArrow: $('.event .slick_wrap .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
		swipeToSlide: true,
        pauseOnHover: false,
        speed: 1000,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToScroll: 1,
                variableWidth: true
            }
        },
         {
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        }]
    });

    $('.event .slick_wrap02 .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.event .slick_wrap02 .count').html('<em>' + i + '</em> <span>/ </span> <em class="sum">' + slick.slideCount + '</em>');
    });

    $('.event .slick_wrap02 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        accessibility: true,
        prevArrow: $('.event .slick_wrap02 .prev'),
        nextArrow: $('.event .slick_wrap02 .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
		swipeToSlide: true,
        pauseOnHover: false,
        speed: 1000,
        responsive: [{
            breakpoint: 761,
            settings: {
                adaptiveHeight: true
            }
        }]
    });

    $('.outcenter .otab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		var Position = $('.outbx > div').eq(idx).offset();

		var windowWidth = $(window).width();
		if (windowWidth < 481) {
			var Val = 80
		} else if (windowWidth > 480 && windowWidth < 1400) {
			var Val = 80
		} else {
			var Val = 110
		}
		$('html, body').animate({
			scrollTop : Position.top - Val
		}, 300);
    });

    $('.virtual .intro .skbtn').on('mouseover', function () {
		$('.rotate360').addClass('active');
    });

    $('.virtual .intro .skbtn').on('mouseout', function () {
		$('.rotate360').removeClass('active');
    });

    $('.virtual .mtab a').on('click', function (e) {
        e.preventDefault();
        var Position = $('.virtual .infobx .point').offset();
        var idx = $(this).index();
        var windowWidth = $(window).width();
		if (windowWidth < 481) {
			var Val = 80
        } else if (windowWidth > 480 && windowWidth < 992) {
			var Val = 190
		} else if (windowWidth > 991 && windowWidth < 1200) {
			var Val = 230
		} else {
			var Val = 300
        }

        $('iframe').each( function() {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        });

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.virtual .mlist').hide();
            $('.virtual .mlist .bx').hide();
        }else{
            $('.virtual .mtab a').removeClass('active');
            $(this).addClass('active');
            $('.virtual .mlist').show();
            $('.virtual .mlist .bx').fadeOut(300);
            $('.virtual .mlist .bx').eq(idx).fadeIn(300);
            $('html, body').animate({
                scrollTop : Position.top + Val
            }, 300);
        }
    });


    $('.touring .infobx a').on('click', function (e) {
        e.preventDefault();
        var idx = $(this).index();
        var Position = $('.touring .map').offset();
        var windowWidth = $(window).width();
		if (windowWidth < 1400) {
			var Val = 60
        } else {
			var Val = 90
        }

        $('.touring .infobx a').removeClass('active');
        $(this).addClass('active');
        $('.pinbx .pin').removeClass('active');
        $('.pinbx .pin').eq(idx - 1).addClass('active');
        $('.lnkbx a').removeClass('active');
        $('.lnkbx a').eq(idx - 1).addClass('active');

        if ($(this).hasClass('all')) {
            $('.lnkbx a').removeClass('active');
            $('.pinbx .pin').addClass('active');
        }

        $('html, body').animate({
            scrollTop : Position.top - Val
        }, 300);
    });

	// Lnb Menu
	lnbToggleMenu();
	// tab
	tab();
    totalSearchTab();
});

function lnbToggleMenu () {
	var $lnb_head = $('.depth_01>li>a'),
	    $lnb_body = $('.depth_01 li>.depth_02');

		$lnb_head.each(function(){
			if($(this).siblings(".depth_02").length === 0) {
				$(this).addClass("single");
			}
		});



	$lnb_head.on('click', function(e) {
		e.preventDefault();

		if (!($(this).hasClass('on'))){
			$lnb_body.slideUp('normal');
			$(this).next().stop(true,true).slideToggle('normal');
			$lnb_head.removeClass('on');
			$(this).addClass('on');
            if (($(this).hasClass('single'))){
                var url = $(this)[0].href;
                location.href = url;
            }
		} else {
			$lnb_head.removeClass('on');
			$lnb_body.slideUp(300);
		}
	});
}

function tab() {
    $(document).on("click", ".pageTab-tab", function (){
      var num = $(".pageTab li a").index($(this));

      if($(".pageTab-panel").length === 0) {return false}

      $(".pageTab li").removeClass("active");
      $(".pageTab-panel").removeClass("active");

      $(".pageTab li:eq("+ num +")").addClass("active");
      $(".pageTab-panel:eq("+ num +")").addClass("active");
    });
  }

$(document).on('click', '#lnb .depth_02 li a', function(e){
    e.preventDefault();
    $(this).addClass('on');
    $('#lnb .depth_02 li a').not($(this)).removeClass('on');
});

$(document).on('click', '#lnb .depth_02 li a', function(e){
    e.preventDefault();
    var url = $(this)[0].href;
    location.href = url;
});

// 221218 추가
function totalSearchTab () {
	$('.tab').each(function(){
		$(this).find('.tab-menu a').on('click', function (e) {
			e.preventDefault();

			var tabId = $(this).attr('data-id');

			$(this).closest('.tab').find('.tab-menu a').removeClass('is-active');
			$(this).closest('.tab').find('.tab-panel').removeClass('is-active');

			if(tabId === 'tab-total') {
				$(this).addClass('is-active');
				$('.tab-panel').addClass('is-active');
			} else {
				$(this).addClass('is-active');
				$('#' + tabId).addClass('is-active');
			}
		});
	});
}


	var userMode = '';
	$(document).ready(function () {
		$(".btn-password-form").click(function () {
			$(".modal").addClass('is-active');

			userMode = "read";
			$("form[name='confirmForm'] input[name='boardCode']").val($(this).data("board-code"));
			$("form[name='confirmForm'] input[name='articleSeq']").val($(this).data("seq"));
		});
	});

	// 221218 비밀번호 찾기 모달
	$(function(){
		$('.icoSecret').on('click',  function(){
			$(".modal").addClass('is-active');
		});
	});

	$(function(){
		$('.btn-close').on('click',  function(){
			$(".modal").removeClass('is-active');
			$('.modal-overlay').hide();
		});
	});

	function openModal(modalname){
		$("#" + modalname).addClass('is-active');
		modalScrolling(modalname);
	}

	function modalScrolling(selector) {
		var target = $("#" + selector);
		var modalH = target.children().outerHeight();

		function scrollClass () {
			var winH = $(window).height() - parseInt(target.css('padding-top')) * 2;
			if (winH < modalH) {
				target.addClass('is-scroll');
			} else {
				target.removeClass('is-scroll');
			}
		}

		scrollClass();

		$(window).resize(function () {
			scrollClass();
		});
	}