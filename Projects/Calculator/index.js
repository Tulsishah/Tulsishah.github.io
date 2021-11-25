let screen = document.getElementById("screen");
buttons=document.querySelectorAll("button");
let screenValue="";
screen.value=""
for(item of buttons)
{
    item.addEventListener('click',(e)=>{
       buttontxt = e.target.innerText;
       if(buttontxt=='X')
       {
           buttontxt='*';
           screenValue+=buttontxt;
           screen.value = screenValue;
       }
       else if(buttontxt == 'C')
       {
           screenValue =""
           screen.value=screenValue;
       }
       else if(buttontxt=='=')
       {
           screen.value= eval(screenValue);
       }
       else{
        console.log('tulsi')
        screenValue+=buttontxt;
        screen.value = screenValue;
       }
      
    })
}