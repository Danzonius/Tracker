$(document).ready(function() {

	const $header = $('.background');
	const $title = $('.title');
	const $main = $('main');
	const breakpoint = $header.height();

	$(window).on('scroll', function() {

		let pos = $(window).scrollTop();

		if (pos > breakpoint) {
			$header.addClass('scrolled');
			$title.addClass('scrolled');
			$main.addClass('scrolled');
		};

		if (pos < breakpoint) {
			$header.removeClass('scrolled');
			$title.removeClass('scrolled');
			$main.removeClass('scrolled');
		};
	});
});