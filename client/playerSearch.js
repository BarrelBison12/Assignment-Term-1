/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
async function getPlayersForSearch()
{
	try{
		const response = await fetch('/players');
		const names = await response.json();
		//console.log(names)

		const playerDataList = document.getElementById('playerDataList');

		let list = '';
		for (const playerName of names) {
			list += `<option value='${playerName}'>\n`;
		}

		
		playerDataList.innerHTML = list;
		//console.log(playerDataList.innerHTML)
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	

    
}

