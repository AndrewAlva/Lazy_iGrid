// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Do something
    console.log("🔥 Designed and developed from scratch by Mandelbrot Studio.")
    console.log("🔥 https://www.instagram.com/mandelbrotstudio/")
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    // console.log("Page fully loaded.");
    // console.log("Initialize.js");

    var bLazy = new Blazy({ 
        selector: 'img' // all images
        // container: '.grid-wrapper'
    });

    // Start the requestAnimationFrame
    animate();

}

/*
	var targets = document.getElementsByClassName("thumbnail-container"),
	lastPos = null,
	timer = 0,
	newPos;

	function clear() {
		lastPos = null;
		// targets.removeAttribute('style');
		for (var i = targets.length - 1; i >= 0; i--) {
			targets[i].removeAttribute('style');
		}
	};

	window.onscroll = checkScrollSpeed;

	function checkScrollSpeed(){
		newPos = window.scrollY;
		if ( lastPos != null ){ // && newPos < maxScroll 
			var delta = Math.abs(newPos -  lastPos);

			// min/max values
			if( delta > 50 ) delta = 50;

			delta = 1 + (delta / 100);

			for (var i = targets.length - 1; i >= 0; i--) {
				targets[i].style.cssText = '-webkit-transform:scale(1,' + delta + '); transform:scale(1,' + delta + ')';
			}
			// console.log(delta)
			var test = document.getElementById('grid');
			console.log(test.offsetHeight)
		}
		lastPos = newPos;
		timer && clearTimeout(timer);
		timer = setTimeout(clear, 30);
	}; 

*/

	function animate(){
		requestAnimationFrame(animate);
		render();
	}

	function render(){
		distortionFX.update();
	}


	var scrollAccel = 0;
	var is_scrolling = false;
	var distortionFX = {
		objs: document.getElementsByClassName('thumbnail-container'),
		scale: {
			min: 1,
			max: 1.2
		},
		cof: 0.1,
		cod: 1,
		scroll: {
			pos: {
				last: 0,
				new: 0
			},
			distance: {
				last: 0,
				new: 0
			}
		},

		update: function(){
			this.scroll.pos.new = window.scrollY;
			if (this.scroll.pos.new != this.scroll.pos.last) {
				is_scrolling = true;
				
				this.scroll.distance.new = Math.abs(this.scroll.pos.new - this.scroll.pos.last);
				// if (this.scroll.distance.new >= 300) this.scroll.distance.new = 300;

				if (this.scroll.distance.new > this.scroll.distance.last) {
					// Scroll is accelerating
					this.cod += (this.cod + this.cof) * this.cof;
					if (this.cod >= this.scale.max) this.cod = this.scale.max;
				} else if (this.scroll.distance.new < this.scroll.distance.last) {
					// Scroll is slowing down
					this.cod -= (this.cod - this.cof) * this.cof;
					if (this.cod <= this.scale.min) this.cod = this.scale.min;
				}
				// console.log('scroll.distance.last: ' + this.scroll.distance.last + '. scroll.distance.new: ' + this.scroll.distance.new);

				
				// console.log('scroll Distance: ' + (this.scroll.distance.new - this.scroll.distance.last));

				if (this.scroll.pos.new != Math.round(this.scroll.pos.last) ) {
					this.scroll.pos.last += (this.scroll.pos.new - this.scroll.pos.last) * this.cof;
					this.scroll.distance.last += (this.scroll.distance.new - this.scroll.distance.last) * this.cof;

				} else {
					this.scroll.pos.last = this.scroll.pos.new;
					this.scroll.distance.last = this.scroll.distance.new;
				}
				// console.log('scroll.pos.last: ' + this.scroll.pos.last + '. scroll.pos.new: ' + this.scroll.pos.new);


				// console.log('is_scrolling: ' + is_scrolling);
				// console.log('this.cod: ' + this.cod);
			
			} else {
				is_scrolling = false
			}


			for (var i = this.objs.length - 1; i >= 0; i--) {
				this.objs[i].style.cssText = '-webkit-transform:scale(1,' + this.cod + '); transform:scale(1,' + this.cod + ')';
			}
			
		}
	}


