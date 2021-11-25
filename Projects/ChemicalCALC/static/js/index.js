let screen = document.getElementById("screen");
buttons = document.querySelectorAll("button");
let screenValue = "";
screen.value = ""
for (item of buttons) {

    item.addEventListener('click', (e) => {
        buttontxt = e.target.innerText;
        

        if (buttontxt == 'X') {
            buttontxt = '*';
            screenValue += buttontxt;
            screen.value = screenValue;
        }
        else if (buttontxt == 'C') {
            screenValue = ""
            screen.value = screenValue;
            removeElementsByClass("styled-table");
            removeElementsByClass("styled-table-reactions");
            

        }
        else if (buttontxt == '=') {

            screen.value = eval(screenValue);
            ChemicalCALC();
        }
        
        else if(buttontxt=='1' || buttontxt=='2' || buttontxt=='3'  || buttontxt=='4' || buttontxt=='5' || buttontxt=='6' || buttontxt=='7' || buttontxt=='8' || buttontxt=='9' || buttontxt=='0' || buttontxt=='/' || buttontxt=='+' || buttontxt=='-' || buttontxt=='(' || buttontxt==')') {
            screenValue += buttontxt;
            screen.value = screenValue;
        }
        else
        {
            if(screenValue.length!=0)
            {

                screenValue = screenValue.substring(0, screenValue.length - 1);
                screen.value = screenValue;
                removeElementsByClass("styled-table");
                removeElementsByClass("styled-table-reactions");
              

            }
        }

    })
}





const ChemicalCALC = async () => {

    var myBody = {
        'exp': screenValue,
    }
    const response = await fetch('http://chemicalcalc.herokuapp.com/chemicalCALC', {
        method: 'POST',
        body: JSON.stringify(myBody), // string or object
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    });
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    display(myJson['data']);


    // do something with myJson
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function display(data) {

    for (let i = 0; i < data[0].length; i++) {
        var table_reactions = document.createElement("TABLE");
        var table = document.createElement("TABLE");
        table.classList.add("styled-table");
        table_reactions.classList.add("styled-table-reactions");
        
        let rowRea = document.createElement('tr')
        var colRea = document.createElement("th");
        let textRea = document.createTextNode(data[0][i]);
        colRea.appendChild(textRea);
        rowRea.appendChild(colRea);

        let headerRea= document.createElement('thead');
        headerRea.appendChild(rowRea);

        table_reactions.appendChild(headerRea);

        //div.innerHTML = data[0][i];

        for (let j = 0; j < data[1][i].length; j++) {

            let rowRea = document.createElement('tr')
            var colRea = document.createElement("td");
            let textRea = document.createTextNode(data[1][i][j]);
            colRea.appendChild(textRea);
            rowRea.appendChild(colRea);

            table_reactions.appendChild(rowRea);
        }

        let table_header = [];
        table_header.push("Reaction");
        table_header.push("Number Of Iterations");

        for(let k = 0;k<data[3][i].length;k++)
        {
            table_header.push(data[3][i][k]);
        }



        
        let row = document.createElement('tr')
        let header = document.createElement('thead');
        for (let k = 0; k <table_header.length; k++) {
            var col = document.createElement("th");
            let text = document.createTextNode(table_header[k]);
            col.appendChild(text);
            row.appendChild(col);
        }
        header.appendChild(row);
        table.appendChild(header);
        

        for (let j = 0; j < data[2][i].length; j++) {
            let row = document.createElement('tr');
            for (let k = 0; k < data[2][i][j].length; k++) {
                var col = document.createElement("td");
                let text = document.createTextNode(data[2][i][j][k]);
                col.appendChild(text);
                row.appendChild(col);
            }

            table.appendChild(row);



        }




        document.body.appendChild(table_reactions);
        document.body.appendChild(table);


    }

    // let table_header = [];
    // table_header.push('CB')
    // table_header.push('B')
    // table_header.push('Xb')
    // table_header.push('b');
    // let totalVariables = parseInt(m)+parseInt(n);
    // for(let i=0;i<totalVariables;i++)
    // {
    //     table_header.push('a'+(i+1).toString());
    // }
    // table_header.push('Min_Ration');
    // table_header.push('Operations');

    // for(let k=0;k<data.length-3;k++)
    // {
    //     let table=document.createElement("table");
    //     table.setAttribute("class",'table table-bordered borders-dark table-striped text-center m-50 ');

    //     for(let i=0;i<data[0].length+1;i++)
    //     {
    //         let row =document.createElement('tr')

    //         if(i==0)
    //             row.setAttribute('class','table_header table-primary')
    //         else
    //         row.setAttribute('class','table_row')
    //         for(let j=0;j<data[0][0].length;j++)
    //         {
    //                 var col = document.createElement("td");
    //                 if(i==0)
    //                 {
    //                     col.setAttribute('class','table_heading');
    //                     let text=document.createTextNode(table_header[j]);
    //                     col.appendChild(text);
    //                     row.appendChild(col);

    //                 }
    //                 else{
    //                     col.setAttribute('class','table_cell');
    //                     let x=data[k][i-1][j];
    //                     let x1,text;
    //                     text=document.createTextNode(x);
    //                     col.appendChild(text);
    //                     row.appendChild(col);

    //                 }

    //             }
    //             table.appendChild(row);

    //     }
    //     document.getElementById('tables').appendChild(table);

    // }
    // let p = document.createElement('p');
    // let text = document.createTextNode('The Optimal Solution is :')
    // p.appendChild(text);
    // document.getElementById('optimulSolution').appendChild(p);


    // for(let i=0;i<m;i++)
    // {
    //     p = document.createElement('p');
    //     let text = document.createTextNode(data[data.length-2][i]+' = '+data[data.length-3][i].toString());
    //     p.appendChild(text);
    //     document.getElementById('optimulSolution').appendChild(p);


    // }
    // p = document.createElement('p');
    // text=document.createTextNode('Z = '+data[data.length-1].toString());
    // p.appendChild(text);
    // document.getElementById('optimulSolution').appendChild(p);




}

