/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const endpointRoot = 'http://127.0.0.1:8080/';



async function listPlayers()
{
	try{
		const playerResponse = await fetch(endpointRoot + 'players');
		const playerNamesText = await playerResponse.text();
		const playerNames = JSON.parse(playerNamesText);
		const playerListElt = document.getElementById('playerList');
		let list = '';
		for (const playerName of playerNames) {
			list += `<li class='player_list_item'>${playerName}</li>`;
		}
		playerListElt.innerHTML = list;
		const listItems = document.querySelectorAll('.player_list_item');

		for (const listItem of listItems) {
			listItem.addEventListener('click', (event) => loadPlayer(event.target.textContent));
		}
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	
}

async function loadPlayer (playerName) {
	try{
		const playerResponse = await fetch(endpointRoot + `player/${playerName}`);
		const playerContent = await playerResponse.text();
		document.getElementById('player_results').innerHTML = 'Number: ' + playerContent;
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	
}

async function addPlayer(event)
{
	event.preventDefault();

	const form = document.getElementById('playerForm');
	const data = new FormData(form);

	const dataJSON = JSON.stringify(Object.fromEntries(data));

	/*const fname = document.getElementById('fname')
    const pos = document.getElementById('pos')
    const fileInput = document.getElementById('pic')

    data.append('fname', fname)
    data.append('pos', pos)
    data.append('pic', fileInput.files[0])

    const dataJSON = JSON.stringify(data)*/

	console.log(dataJSON);



        
	fetch(endpointRoot + 'player/new', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: dataJSON//JSON.stringify([key, value])
	})
		.then((response) => response.json())
		.then((dataJSON) => {
			console.log('success ', dataJSON);//[key, value])
			//listPlayers()
			getPlayersForSearch();
		})
		.catch((error) => {
			console.error('error ', error);
			
			changeScene(9999);
			
		});

        
    
    
	form.reset();
}



