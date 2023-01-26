/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function assignPlayer(event)
{
	try{
		event.preventDefault();

		const form = document.getElementById('assignPlayerForm');
		const data = new FormData(form);

		const dataJSON = JSON.stringify(Object.fromEntries(data));

		console.log(dataJSON);



			
		fetch(endpointRoot + 'assignPlayer/new', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: dataJSON
		})
			.then((response) => response.json())
			.then((dataJSON) => {
				console.log('success ', dataJSON);
			
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