'use strict';

export default (function App(window, document, $){
	console.log('run');

	var maxHeight = 650;
	var maxWidth = 1020;

	var isMobile = (function() { 
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
			return true;
		} else {
			return false;
		}
	})();

	function scrollMeTo(){

		
		const $header = $('#header');
		
		$('.js-goto').on('click', function(e){
			const paddingTop = $(window).width() > maxWidth ? $header.outerHeight() : 0;
			const $target = $(this.href.replace( /^.*\#/, '#' ) );
			
			if ($target.length === 1) {
				e.preventDefault();

				$('body,html').animate({ 
					scrollTop: $target.offset().top - paddingTop,
					easing: 'ease-in'
				}, 500);
			};
		});

	};

	function header(){
		const $header = $('header');


		function fix(){
			const scrollTop = $(window).scrollTop();
			const showPosition = 200;

			if ( scrollTop > 0 && scrollTop <= showPosition ){
				$header.addClass('header--hidden');
				$header.removeClass('header--scrolled');
			}else if ( scrollTop > showPosition ){
				$header.addClass('header--scrolled');
				$header.removeClass('header--hidden');
			}else{
				$header.removeClass('header--scrolled');
				$header.removeClass('header--hidden');
			}
		}
		fix();

		$(document).on('scroll', fix);
	}


	function menu(){
		var $menuHrefs = $('.menu__href');
		var $sections = $('.section');

		var winHeight = ( window.innerHeight || document.documentElement.clientHeight );

		function setActive(){						
			$sections.each(function(index, section){				
				var sectionId = $(this).attr('id');
				var rect = this.getBoundingClientRect();
				var rectTop = Math.round(rect.top);
				var rectBottom = Math.round(rect.bottom);

				if (rectTop <= 50 && rectBottom / 2 <= winHeight ){
					$menuHrefs.removeClass('active');
					$menuHrefs.filter('[href="#' + sectionId + '"]').addClass('active');
				}
			});
		}
		setActive();

		$(window).on('scroll', function(e){
			setActive();
		});

		$(window).on('resize', function(e){
			winHeight = ( window.innerHeight || document.documentElement.clientHeight );			
			setActive();
		});

	}

	function init(){

		if (!isMobile){
			header();
		}

		scrollMeTo();
		menu();
	}

	return {
		init 
	}

})(window, document, jQuery, undefined);
