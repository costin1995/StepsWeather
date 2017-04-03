'use strict';

class StepsRouter{
	constructor(){
		this._initLinks = this._initLinks.bind(this);
		this._changeRoute = this._changeRoute.bind(this);
		this.currentView = document.querySelector('steps-view.visible');
		this.viewContainer = document.querySelector('main');
		this.sidebar = document.querySelector('steps-sidebar');
		console.log(this.sidebar);
		
		this.sidenavShowBtn = document.querySelector('.js-menu-show');
		this.sidenavHideBtn = document.querySelector('.js-menu-hide');
		
		this._showSidebar = this._showSidebar.bind(this);
		this._hideSidebar = this._hideSidebar.bind(this);
		
		this._initLinks();
		
		
		
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

	_initLinks(){
		let links = document.querySelectorAll('a[js-route]');
		
		for(let i=0;i<links.length;i++){
			links[i].addEventListener('click', this._changeRoute);
		}
		
		
		this.sidenavShowBtn.addEventListener('click', this._showSidebar);
		this.sidenavHideBtn.addEventListener('click', this._hideSidebar);
	}
	
	_changeRoute(evt){
		evt.stopPropagation();
		evt.preventDefault();
		const url = evt.target.getAttribute('href');
		window.history.pushState(null,null,url);
		document.querySelector('.navbar').classList.remove('-visible');
		
		let existingView = document.querySelector(`steps-view[route="${url}"]`);
		if(!existingView){
			return this._loadAjaxView(url)
			.then(data=>{
				this._changeCurrentView(data);
			})
			.catch(error=>{
				console.warn(error);
			});
			//
			
			
		}
		
		this._changeCurrentView(existingView);
		
	}
	
	_changeCurrentView(view){	
			this.currentView.out();
			view.in();
			this.currentView=view;
			//location.reload();


	}
	
	_loadAjaxView(url){
		//Promise(function(resolve,reject){code here})
		return new Promise((resolve,reject)=>{
		let newView = document.createElement('steps-view');//ne punem fiecare copil din stepsview in while
		const xhr = new XMLHttpRequest();
		
		xhr.onload = evt => {
			let doc = evt.target.response;
			let viewObject = doc.querySelector('steps-view');
			
			while(viewObject.firstChild){
				newView.appendChild(viewObject.firstChild);
			}
			newView.setAttribute('route',url);
			this.viewContainer.appendChild(newView);
			
			resolve(newView);//se duce la existingView
			
			};	

		xhr.responseType = 'document';
		xhr.open('GET',url);
		xhr.send();
		});
	}
	
	
	
	
	
	
	
	
	
	_showSidebar(evt){
		evt.preventDefault();
		
		this.sidebar.showSidenav();
	}
	
	_hideSidebar(evt){
		evt.preventDefault();		
		
		this.sidebar.hideSidenav();
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
		
	}
	
	update() {
		requestAnimationFrame(this.update);
		
		if(!this.target){
			return;
		}
		//console.log(this.dragging);
		if(this.dragging){
			this.screenX = this.currX-this.startX;
			if(this.screenX > 0)
			{
				this.screenX=0;
			}
		}
		else {
				if(Math.abs(this.screenX) > (this.targetBCR.width * 0.5)){
					
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
		const opacity = 1 - normalizedOpacity;
		this.target.style.opacity = opacity;
		if (this.screenX < -60){
			//this.target.parentNode.removeChild(this.target);
			
			this.sidebar.hideSidenav();
			this.target.style.transform = '';
			this.target.style.opacity = 1;
			this.target = null;
		} else
		{
		}
		
		
	}
	
	
	
	
}

new StepsRouter();