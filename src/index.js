import './scss/main.scss';
const $ = window.jQuery;

$(function() {
	setStepsLine();
	checkOS();
	$(window).on('resize', function() {
		setStepsLine();
	});
});

function setStepsLine() {
	$('.steps').each(function() {
		var top = $(this).find('.steps__item').eq(0).find('.steps__wrap').height() / 2;
		var height = $(this).height() - $(this).find('.steps__item').last().height();
		$(this).find('.steps__line').css({
			'top': top + 'px',
			'height': height + 'px'
		});
	});
}

function checkOS() {
  if (/Android/i.test(navigator.userAgent)) {
      $("html").addClass("android-device");
  }
}