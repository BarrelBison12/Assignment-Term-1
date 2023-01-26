/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function listPlayersTS(team_name)
{
	try{
		const playerResponse = await fetch(endpointRoot + 'psandts');
		const playerNamesText = await playerResponse.text();
		//console.log(playerNamesText)
		const playerNames = JSON.parse(playerNamesText);
		//console.log(playerNames)

		const playerTeamResponse = await fetch(endpointRoot + 'psandts2');
		const playerTeamsText = await playerTeamResponse.text();
		//console.log(playerTeamsText)
		const playerTeams = JSON.parse(playerTeamsText);
		//console.log(playerTeams)

		const playerListElt = document.getElementById('playerListTS');
		let list = '';



		for (const playerName of playerNames){
			for(const teamName of playerTeams) {
				//console.log(playerName, teamName)
				//console.log(team_name)
				if (teamName == team_name)
				{
					list += `<li class='ts_player_list_item'>${playerName}</li>`;
					playerTeams.shift();
					//console.log(playerTeams)
					break;
				}
				else{
					playerTeams.shift();
					break;
				}
				
				
		
			}
		}
		
		playerListElt.innerHTML = list;
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	
   
}





async function addPlayerTS(event)
{
	event.preventDefault();

	const form = document.getElementById('teamSheetSelectTeam');
	const data = new FormData(form);

	const dataJSON = JSON.stringify(Object.fromEntries(data));

    

	const team_name = dataJSON.slice(15,-2);

	//console.log(team_name)

	listPlayersTS(team_name);
	form.reset();
	const playersForTeam = document.getElementById('playerListTS2');
	playersForTeam.innerHTML = '';
}

async function playersForPos(mapClicked)
{
	try {
		const playersOnTeam = document.querySelectorAll('.ts_player_list_item');
		//console.log(playersOnTeam[0].innerHTML);


		const allPlayerNamesResponse = await fetch(endpointRoot + 'players');
		const allPlayerNamesText = await allPlayerNamesResponse.text();
		const allPlayerNames = JSON.parse(allPlayerNamesText);
		
		let listTS = '';
		let playerListEltTS = document.getElementById('playerListTS2');

		for(const playerName of allPlayerNames)
		{
			//console.log('playerName', playerName);
			let nameFound = false;

			const playerPosResponse = await fetch(endpointRoot + `player/${playerName}`);
			//console.log(playerPosResponse);
			const playerPosText = await playerPosResponse.text();
			//console.log(playerPosText);
			const playerPos = JSON.parse(playerPosText);
			//console.log('playerPos', playerPos);

			for(let i = 0; i <  playersOnTeam.length; i++)
			{
				

				if(nameFound)
				{
					//console.log('nameFound break');
					break;
				}
				//console.log('playerOnTeam.inn',playersOnTeam[i].innerHTML);

				nameFound = false;

				

				if(playerName == playersOnTeam[i].innerHTML)
				{
					if(nameFound)
					{
						//console.log('nameFound break inner');
						break;
					}

					//console.log('playerName == playerOnTeam.inn');
					//console.log('map',mapClicked);
					if(mapClicked == playerPos)
					{
						//console.log('mapC == playerPos');
						listTS += `<li class='player_list_item'>${playerName}</li>`;
						//allPlayerNames.shift();
						//console.log('nameFround');
						nameFound = true;
					}
					else
					{
						//console.log('map else');
						nameFound = true;
						
					}
				}
				else
				{
					//console.log('playerName and playersOnTeam.inn else');
				}
				
				
				
			}
		}

		//console.log('everything ended');

		playerListEltTS.innerHTML = listTS;

		const listItemsTS = document.querySelectorAll('.player_list_item');

		for (const listItem of listItemsTS) {
			listItem.addEventListener('click', (event) => addPlayerToTS(event.target.textContent, mapClicked));
		}
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	



	
}

async function addPlayerToTS(playerName, mapClicked)
{
	const playerOnTS = document.getElementById(mapClicked);

	playerOnTS.innerHTML = playerName;
}