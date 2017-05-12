$(document).ready(function() {

	// Set all variables
	const $activityBox = $('.infobox');
	const breakpoint = $activityBox.offset().top - 48;

	$(window).scroll(function(e) {

		// Find the current window pos
		let pos = $(window).scrollTop();

		// Toggle class if the breakpoint has been reached
		if (pos > breakpoint) $activityBox.addClass('scroll'); 
		if (pos < breakpoint) $activityBox.removeClass('scroll');
	});
});