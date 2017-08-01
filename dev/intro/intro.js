function introAnimation() {
	function videoFade() {
		var video = $("#confetti-video");
		var logoNav = $("#logo-nav");
		var headerPhone = $("#header-phone");
		var introText = $("#intro-text");
		var god = $("#god");
		tl = new TimelineLite();
		tl
			.set(logoNav, {x:25})
			.set(headerPhone, {x:-25})
			.set(introText, {y:12.5})
			.set(god, {y:12.5})
			.to(video, .5, {autoAlpha: 0, ease: Power1.easeOut}, '+=1.2' )
			.to(logoNav, .5, {autoAlpha: 1, x:0, ease: Power1.easeOut}, '-=.3' )
			.to(headerPhone, .5, {autoAlpha: 1, x:0, ease: Power1.easeOut}, '-=.3' )
			.to(introText, .4, {autoAlpha: 1, y:0, ease: Power1.easeOut}, '-=.35' )
			.to(god, .4, {autoAlpha: 1, y:0, ease: Power1.easeOut}, '-=.4' );
	}
	videoFade();
}
