/************************
Cursor tile
*************************/
function tileHover(){
	
	Array.prototype.forEach.call(document.querySelectorAll(".tile"), function (
	  media
	) {
	  const circle = document.querySelector(
	    "." + media.getAttribute("data-circle")
	  );
	  TweenMax.set(circle, { scale: 0, xPercent: -50, yPercent: -50 });
	
	  media.addEventListener("pointerenter", function (e) {
	    TweenMax.to(circle, 0.3, { scale: 3, opacity: 1 });
	    positionCircle(e, media, circle);
	    
	  });
	
	  media.addEventListener("pointerleave", function (e) {
	    TweenMax.to(circle, 0.3, { scale: 0, opacity: 0 });
	    positionCircle(e, media, circle);
	  });
	
	  media.addEventListener("pointermove", function (e) {
	    positionCircle(e, media, circle);
	  });
	});
	
	function positionCircle(e, media, circle) {
	  var rect = media.getBoundingClientRect();
	  var relX = e.pageX - rect.left;
	  var relY = e.pageY - rect.top - window.scrollY;
	  TweenMax.to(circle, 0.15, { x: relX, y: relY });
	}
	
}
playHover();

function playHover(){
	
	Array.prototype.forEach.call(document.querySelectorAll(".video"), function (
	  media
	) {
	  const circle = document.querySelector(
	    "." + media.getAttribute("data-circle")
	  );
	  TweenMax.set(circle, { scale: 0, xPercent: -50, yPercent: -50 });
	
	  media.addEventListener("pointerenter", function (e) {
	    TweenMax.to(circle, 0.3, { scale: 3, opacity: 1 });
	    positionCircle(e, media, circle);
	    
	  });
	
	  media.addEventListener("pointerleave", function (e) {
	    TweenMax.to(circle, 0.3, { scale: 0, opacity: 0 });
	    positionCircle(e, media, circle);
	  });
	
	  media.addEventListener("pointermove", function (e) {
	    positionCircle(e, media, circle);
	  });
	});
	
	function positionCircle(e, media, circle) {
	  var rect = media.getBoundingClientRect();
	  var relX = e.pageX - rect.left;
	  var relY = e.pageY - rect.top - window.scrollY;
	  TweenMax.to(circle, 0.15, { x: relX, y: relY });
	}
	
}


/************************
Cursor follow	
*************************/


function cursorFollow(){
  var mouseX = 0, mouseY = 0;
  var xp = 0, yp = 0;
   
  $(document).mousemove(function(e){
    mouseX = e.pageX - 5;
    mouseY = e.pageY - 5; 
  }); 
    
  setInterval(function(){
    xp += ((mouseX - xp)/6);
    yp += ((mouseY - yp)/6);
    $("#cursor").css({left: xp +'px', top: yp +'px'});
  }, 20);
  
  
  	$('.tile').mouseenter(function(){
		$('#cursor').fadeOut();
	}).mouseleave(function(){
		$('#cursor').fadeIn();
	});
	
	$('.menu a, .btn, .projectpartie img').mouseenter(function(){
		$('#cursor').addClass('active');
	});
	$('.menu a, .btn, .projectpartie img').mouseleave(function(){
		$('#cursor').removeClass('active');
	});
}
cursorFollow();	
	
	$(window).scroll(function(){
  
	  let oppai = $(this).scrollTop(); 
	  
	  $('#content article').css({opacity:100/oppai,filter: 'blur('+oppai/100+'px)'});  
	    $('#content').css({opacity: 100/oppai}); 
	  
		if(oppai>190){
			if(!$('body').hasClass('active'))
				$('#header-main').addClass('arre'); 
		  }
		else{
		  $('#header-main').removeClass('arre');
		    }
		});
		

	$('#burger').on('click',function(e) {
  
	e.preventDefault();
  
	$('#nav-main, body, #burger').toggleClass('active');
  
	if($('#header-main').hasClass('arre'))
		{$('#header-main').removeClass('arre').addClass('arreno');}
	else if($('#header-main').hasClass('arreno'))
		{	$('#header-main').removeClass('arreno');
			setTimeout(()=>{$('#header-main').addClass('arre')},800);}

});












function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function changeColor(){
	
	$('.tile').mouseenter(function() {
		var color = $( this ).attr( "data-color" );
		$('.loading-screen').css('background-color',color);	
		console.log(color);
	}).mouseleave(function() {
		$('.loading-screen').css('background-color','#ECE96F');

	  });
}
changeColor();

// Function to add and remove the page transition screen
function pageTransition() {

  var tl = gsap.timeline();
  $('#nav-main, body, #burger').removeClass('active');
  tl.set('.loading-screen', { transformOrigin: "bottom left"});
  tl.to('.loading-screen', { duration: .5, scaleY: 1});
  tl.to('.loading-screen', { duration: .5, scaleY: 0, skewX: 0, transformOrigin: "top left", ease: "power1.out", delay: 0.5 });
  tl.to('.loading-screen', { backgroundColor:"#ECE96F"});	
  
}

// Function to animate the content of each page
function contentAnimation() {
	
	cursorFollow();
	ScrollReveal().reveal('.js-reveal', { reset: true, interval: 200, duration:1000, origin: 'bottom', distance: '80px' });
	changeColor();
	$(window).scrollTop(0);
	
	
	tileHover();
	var tl = gsap.timeline();
	
/*	mySplitText = new SplitText(".hero h1", {type:"words,chars"}),
	chars = mySplitText.chars; //an array of all the divs that wrap each character
	gsap.set(".hero h1, .hero-project h1", {perspective: 400});
	
	tl.from(chars, {duration: 1, opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:"back", stagger: 0.01});
	tl.from('.is-animated', { duration: 0.5, translateY: 30, opacity: 0, stagger: 0.1 });
	tl.from('.tile', { duration: 0.5, translateY: 30, opacity: 0, stagger: 0.1 }, "-=1");*/
}

$(function() {
  barba.init({
    sync: true,
    transitions: [{
      async leave(data) {
        const done = this.async();       
        pageTransition();
        await delay(1000);
        done();
      },
      async enter(data) {
        contentAnimation();
       
      },
      async once(data) {	      
        contentAnimation();
      }
    }]
  });
});


 
ScrollReveal().reveal('.js-reveal', { reset: true, interval: 200, duration:1000, origin: 'bottom', distance: '80px' });



/*
$('.tile').mouseenter(function() {
	var color = $( this ).attr( "data-color" );
	$('body').css('background-color',color);	
	$('body').addClass('black');
	
})
.mouseleave(function() {
	$('body').removeClass('black');
	$('body').css('background-color','#FFF');
  });
;
*/


 /*
 $(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if (scroll >= 600) {
        $("body").addClass('black');
    } else {
        $("body").removeClass('black');
    }
});
*/


