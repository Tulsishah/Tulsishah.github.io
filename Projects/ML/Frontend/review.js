headers = ['Model Name','Food','SAFETY AND HYGIENE','LOCATION',
'VALUE FOR MONEY',
'HOSPITALITY',
'RATINGS']

modelName = ['Naive Bayes','K-Nearest Neighbours','Logistic Regression']
const review = async () => {

	var text = document.getElementById('text').value;


	var myBody = {
		'text': text }

	const response = await fetch('http://127.0.0.1:3000/reviewAnalysis', {
			method: 'POST',
			body: JSON.stringify(myBody),
			headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
			}

	});
	const myJson = await response.json(); //extract JSON from the http response
	console.log(myJson['data']);
	display(myJson['data']);


	// do something with myJson
}
function display(data)
{
	  document.getElementById('tableReview').style.display = 'block';
		let tableContent = document.getElementById("table-content");

		while (tableContent.lastElementChild) {
			tableContent.removeChild(tableContent.lastElementChild);
		}
	
	
		for (let i = 0; i < data.length; i++) {
		
					
				 let row = document.createElement('DIV')
				 row.classList.add("table-row");
				 let col = document.createElement("DIV");
				 col.classList.add("table-data");
				 let text = document.createTextNode(modelName[i]);
				 col.appendChild(text);	
				 row.appendChild(col);
				 


				 for (let j = 1; j < 7 ; j++) {
	
						 let col = document.createElement("DIV");
						 col.classList.add("table-data");
						 console.log(data[i][j]);
						 let text = document.createTextNode(data[i][0][j]);
						 col.appendChild(text);	
						 row.appendChild(col);
	
						 }
		
				 tableContent.appendChild(row);
				 }
	


}