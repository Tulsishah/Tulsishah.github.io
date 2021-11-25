var properties = [
	'HotelName',
	'Food',
	'SafetyandHygiene',
	'location',
	'valueformoney',
  'hospitality',
  'Ratings'
];

var hotelList = [];

$.each( properties, function( i, val ) {
	
	var orderClass = '';

	$("#" + val).click(function(e){
		e.preventDefault();
		$('.filter__link.filter__link--active').not(this).removeClass('filter__link--active');
  		$(this).toggleClass('filter__link--active');
   		$('.filter__link').removeClass('asc desc');

   		if(orderClass == 'desc' || orderClass == '') {
    			$(this).addClass('asc');
    			orderClass = 'asc';
       	} else {
       		$(this).addClass('desc');
       		orderClass = 'desc';
       	}

		var parent = $(this).closest('.header__item');
    		var index = $(".header__item").index(parent);
		var $table = $('#table-content');
		var rows = $table.find('.table-row').get();
		var isSelected = $(this).hasClass('filter__link--active');
		var isNumber = $(this).hasClass('filter__link--number');
			
		rows.sort(function(a, b){

			var x = $(a).find('.table-data').eq(index).text();
    			var y = $(b).find('.table-data').eq(index).text();
				
			if(isNumber == true) {
    					
				if(isSelected) {
					return x - y;
				} else {
					return y - x;
				}

			} else {
			
				if(isSelected) {		
					if(x < y) return -1;
					if(x > y) return 1;
					return 0;
				} else {
					if(x > y) return -1;
					if(x < y) return 1;
					return 0;
				}
			}
    		});

		$.each(rows, function(index,row) {
			$table.append(row);
		});

		return false;
	});

});




const disp = async (modelName) => {

	var myBody = {
		'modelName': modelName }


	const response = await fetch('http://127.0.0.1:5000/show', {
			method: 'POST',
			body: JSON.stringify(myBody),
			headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
			}

	});
	const myJson = await response.json(); //extract JSON from the http response
	hotelList = []
	hotelList = myJson['data'].slice(1);
	console.log(myJson['data']);

	display(hotelList);


	// do something with myJson
}

function rating(rat){

	let img = document.createElement('IMG')
 	
  if(rat<=1){
		img.src = "Rating1.png";
	}
	else if(rat<=2)
	{
		img.src = "Rating2.png";
	}
	else if(rat<=3)
	{
		img.src = "Rating3.png";
	}
	else if(rat<=4)
	{
		img.src = "Rating4.png";
	}
	else
	{
		img.src = "Rating5.png";
	}

	return img;
}

function display(data) {

	let tableContent = document.getElementById("table-content");

	while (tableContent.lastElementChild) {
    tableContent.removeChild(tableContent.lastElementChild);
  }


	for (let i = 0; i < data.length; i++) {
	
	    	var array = data[i][0].split(",");
	 		 
	
	 		let row = document.createElement('DIV')
	 		row.classList.add("table-row");
	 		for (let j = 0; j < 7 ; j++) {

	 				let col = document.createElement("DIV");
	 				col.classList.add("table-data");
	 				let text = document.createTextNode(array[j]);
					if(j==6)
					{
						
						col.classList.add("ratingCol")
						let div = document.createElement("DIV");
						let img = rating(array[j]);
						div.appendChild(img);
						col.appendChild(div);
					}
	 				col.appendChild(text);	
	 				row.appendChild(col);

	 				}
	
	 		tableContent.appendChild(row);
	 		}

	}



	function searchHotel()
	{	
		let searchText = document.getElementById("search").value.toLowerCase();
		
		 if(searchText.length==0)
		 {
			 display(hotelList);

		 }
		 tempList = []
     for(let i = 0;i<hotelList.length;i++)
		 {
			 let str = hotelList[i][0].toLowerCase();
			 let position = str.search(searchText);
			if(position!=-1)
			{
				tempList.push(hotelList[i]);
			}

		 }

		 display(tempList);

	}


function Model(modelName)
{
	var btn  = document.getElementById('dropbtnText');
	var text = btn.innerHTML.toString;
  if (modelName=='nb')
		btn.innerHTML ='Naive Bayes'
	// else if(modelName=='svm')
	// 	btn.innerHTML ='SVM'
	else if (modelName=='lgr')
		btn.innerHTML ='Logistic Regression'
	else
		btn.innerHTML ='k-Nearest Neighbors'
	
	console.log(btn.innerHTML)
	disp(modelName)
}