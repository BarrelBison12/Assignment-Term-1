/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let currentScene = 999;
let template;
let nav; 
let theP = document.getElementById('pInBody');


function changeScene(sceneNum){

	nav = document.getElementById(111).content.cloneNode(true);

	template = document.getElementById(sceneNum).content.cloneNode(true);
    
    
	if (currentScene != sceneNum){
		if(currentScene == 999){
			theP.appendChild(template);
			currentScene = sceneNum;
			changeScene(0);
		}
		else if(currentScene == 111){
			theP.appendChild(template);
			currentScene = sceneNum;
		}
		else{
			theP.innerHTML = '';
			theP.appendChild(nav);
			theP.appendChild(template);
			currentScene = sceneNum;
		}
        
        
	}

	getPlayersForSearch();
	getTeamsForSearch();

}






