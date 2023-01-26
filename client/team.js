/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function listTeams()
{
	try{
		const teamResponse = await fetch(endpointRoot + 'teams');
		const teamNamesText = await teamResponse.text();
		const teamNames = JSON.parse(teamNamesText);
		const teamListElt = document.getElementById('teamList');
		let list = '';
		for (const teamName of teamNames) {
			list += `<li class='team_list_item'>${teamName}</li>`;
		}
		teamListElt.innerHTML = list;
		const listItems = document.querySelectorAll('.team_list_item');
		for (const listItem of listItems) {
			listItem.addEventListener('click', (event) => loadTeam(event.target.textContent));
		}
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	
}

async function loadTeam (teamName) {
	try{
		const teamResponse = await fetch(endpointRoot + `team/${teamName}`);
		const teamContent = await teamResponse.text();
		document.getElementById('team_results').innerHTML = 'Home Town: ' + teamContent;
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	
}





async function addTeam(event)
{
	try{
		event.preventDefault();

		const form = document.getElementById('teamForm');
		const data = new FormData(form);

		const dataJSON = JSON.stringify(Object.fromEntries(data));

		console.log(dataJSON);



			
		fetch(endpointRoot + 'team/new', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: dataJSON
		})
			.then((response) => response.json())
			.then((dataJSON) => {
				console.log('success ', dataJSON);
				//listTeams()
				getTeamsForSearch();
			})
			.catch((error) => {
				console.error('error ', error);
			});

			
		
		
		form.reset();
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	
}

