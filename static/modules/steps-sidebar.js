'use strict';

class StepsSidebar extends HTMLElement{
	
	createdCallback(){
			this._sidebar = null;
	}
	
  showSidenav() {
    this.classList.add('-visible');
  }

  hideSidenav() {
    this.classList.remove('-visible');
  }
	
}

document.registerElement('steps-sidebar',StepsSidebar);