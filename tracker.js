/**
 *  The Tracker object
 *
 *  Requires a parent element of what to track and
 *  a range of options that can be set to true or false. 
 *
 *  @var 		jQuery parent element
 *
 *	@author 	Tycho Atsma <tycho.atsma@gmail.com>
 */
var Tracker = function($parent) {

	// Hold all the data containers in one place
	var infoboxes = [];

	// See if tracker is currently tracking
	var tracking = false;

	// Initialize the date for timer
	var startTime = new Date();

	var location = {
		'latitude': 0,
		'longitude': 0
	};

	var language = window.navigator.language || 'Could not find the language';

	// Activities
	var activities = [];

	// Append static info to the parent
	$('<li>').text('Your browsers language is: ' + language).appendTo($('.activity'));

	/** 
	 *  Request the user's location.
	 *
	 *  @var 	callback(position)
	 */
	navigator.geolocation.getCurrentPosition(function(position) {  

	    // Get latitude and longitude  
	    var lat = position.coords.latitude;
	    var long = position.coords.longitude;
	    
	    // Set variables
	    location.latitude = lat;
	    location.longitude = long;

	    // Let the user know
	    $('<li>').text('Your location is: ' + location.latitude + ', ' + location.longitude).appendTo($('.activity'));
	});

	/**
	 *  Function that tracks the clicks of the
	 *  given parent element.
	 */
	var trackClicks = function() {

		// Track the clicking
		$parent.on('click', function(e) {

			// The element that has been clicked
			var targetEl = {
				'element': e.target,
				'id': e.target.id,
			};

			// Notify user
			showActivity('click', targetEl.id);
		});
	};

	/**
	 *  Function that tracks the hover of the
	 *  given parent.
	 */
	var trackHover = function() {

		// Track scrolling events (not very efficient)
		$.each($('main').children().children(), function(i, v) {

			$(v).on('mouseenter', function(e) {
				
				// Increment hover amount
				showActivity('hover', e.currentTarget.id);
			});
		});
	};

	/**
	 *  Function that tracks the selection of text 
	 *  of the given parent.
	 */
	var trackSelection = function() {

		// Check if something has been selected
	    var txt = '';

	    // Retrieve selected text
		if (window.getSelection) txt = window.getSelection();
		else if (document.getSelection) txt = document.getSelection();
		else if (document.selection) txt = document.selection.createRange().text;
		else return;
	    
	    // Tracking selection events
	    $parent.on('mouseup keyup', function(e) {

	    	// Display to the user
			if (txt != '') showActivity('select', txt.toString());
	    });
	};

	/**
	 *  Function that creates an element with a constructed message
	 *  representing an activity.
	 *
	 *  @var 	type (click, hover, select)
	 *  @var 	activity (what element has been activated)
	 */
	var showActivity = function(type, activity) {

		/**
		 *  The target element where the activities will be shown.
		 *  For this page, this element is always the same.
		 *
		 *  @var 	jQuery
		 */
		$target = $('.activity');

		/**
		 *  The element representing the activity.
		 *
		 *  @var 	jQuery
		 */
		var $element = $('<li class="element ' + type + '">').appendTo($target);

		// Show the appropriate constructed message
		$element.text('You ' + type + 'ed: ' + activity);

		// Keep track of the activities
		activities.push($element);

		// Maximum of three activities should be visisble
		if (activities.length > 3) {

			// Remove from DOM and list
			activities[0].remove();
			activities.shift();
		};
	};

	/**
	 *  Function that will calculate the difference between
	 *  the starting time and the current time.
	 *
	 *  @parameter 	Date
	 */
	this.time = function() {

		// Get the current time
		var current = new Date();

		// Calculate the difference
		var difference = (current - startTime) / 1000;

		// Let the user know
		var $time = $('.time').length ? $('.time') : $('<li class="time">').appendTo('.activity');

		$time.text('Current time spend on this page: ' + difference + ' seconds.');
	};

	/**
	 *  Function that will initiate the tracker
	 *  to start tracking.
	 */
	this.start = function() {

		// Is tracking
		tracking = true;

		// Track clicks
		trackClicks();
		trackHover();
		trackSelection();
	};

	/**
	 *  Function that will stop the tracking
	 */
	this.stop = function() {

		// Unbind the event listeners
		$parent.unbind('click');
	};
}