/*'use strict';

class Sidenav {
	constructor () {
		this.sidenavElement = document.querySelector('.navbar');
		
		this.onStart = this.onStart.bind(this);
		this.onMove = this.onMove.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.update = this.update.bind(this);
		
		
		this.startX = 0;
		this.currX = 0;
		this.screenX=0;
		this.dragging = null;
		this.targetBCR = null;
		
		this.target = null;
		
		this.attachEvents();
		
		requestAnimationFrame(this.update);
	}
	
	attachEvents(){
		
		document.addEventListener('touchstart', this.onStart);
		document.addEventListener('touchmove', this.onMove);
		document.addEventListener('touchend', this.onEnd);
		
	}

	
	onStart(evt) {
		//console.log(evt.target);
		if(!evt.target.classList.contains('navbar__container')){
			return;
		}
		
		//console.log(this.targetBCR);
		if (!this.sidenavElement.classList.contains('-visible'))
		{
			return;
		}
		
		this.target = evt.target;
		this.targetBCR = this.target.getBoundingClientRect();
		this.dragging = true;
		this.startX = evt.pageX || evt.touches[0].pageX;
		this.currX = this.startX;
		//console.log('start');
	}
	
	onMove(evt) {
		if(!this.target){
			return;
		}
		
		this.currX = evt.pageX || evt.touches[0].pageX;
	}
	
	onEnd(evt) {
		if(!this.target){
			return;
		}
		this.dragging= false;
		this.target = null;
		
	}
	
	update() {
		requestAnimationFrame(this.update);
		
		if(!this.target){
			return;
		}
		//console.log(this.dragging);
		if(this.dragging){
			this.screenX = this.currX-this.startX;
		}
		else {
			if(Math.abs(this.screenX) > (this.targetBCR.width * 0.5)){
				//console.log('stop');
				const whereTo = (this.screenX > 0) ? this.targetBCR.width : -this.targetBCR.width; 
				this.screenX += (whereTo - this.screenX) / 4;
			}
			else{
				this.screenX += (0 - this.screenX)/4;
			}
			
		}
		
		//this.screenX = this.currX - this.startX;
		
		this.target.style.transform = 'translateX(' + this.screenX + 'px)';
		const normalizedOpacity = (Math.abs(this.screenX))/this.targetBCR.width;
		console.log(this.screenX);
		const opacity = 1 - normalizedOpacity;
		this.target.style.opacity = opacity;
		if (this.screenX < -60){
			//this.target.parentNode.removeChild(this.target);
			
			this.hideSidenav();
			this.target.style.transform = '';
			this.target.style.opacity = 1;
			this.target = null;
		}
		
		
	}
	
}	

new Sidenav();*/