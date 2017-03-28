'use strict';

class StepsView extends HTMLElement{
	
	createdCallback(){
			this._view = null;
	}
	
	in(){
		this.classList.add('visible');
	}
	
	out(){
		this.classList.remove('visible');
	}
	
}

document.registerElement('steps-view',StepsView);