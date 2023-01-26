/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
async function getTeamsForSearch()
{
	try{
		const response = await fetch('../teams');
		const names = await response.json();
		//console.log(names)
		//const names = JSON.parse(response)

		const teamDataList = document.getElementById('teamDataList');

		let list = '';
		for (const teamName of names) {
			list += `<option value='${teamName}'>\n`;
		}

		
		teamDataList.innerHTML = list;
		//console.log(teamDataList.innerHTML)
	}
	catch{
		console.log('Error');
		changeScene(9999);
	}
	

    
}