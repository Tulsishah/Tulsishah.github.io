window.onscroll = function() {myFunction()};

var header = document.getElementById("heading");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
    
  }
}

function day(id)
{
  if(id=="Monday")
 {
  var x=document.getElementById("monday");
  x.style.display= "block";
  tuesday.style.display="none";
  wednesday.style.display="none";
  thursday.style.display="none";
  friday.style.display="none";
  saturday.style.display="none";
  Imagev.remove();
  }
  else if(id=="Tuesday")
  {
  var x=document.getElementById("tuesday");
  x.style.display="block";
  monday.style.display="none";
  wednesday.style.display="none";
  thursday.style.display="none";
  friday.style.display="none";
  saturday.style.display="none";
  Imagev.remove();
 
  }
  else if(id=="Wednesday")
  {
  var x=document.getElementById("wednesday");
  x.style.display= "block";
  monday.style.display="none";
  tuesday.style.display="none";
  thursday.style.display="none";
  friday.style.display="none";
  saturday.style.display="none";
  Imagev.remove();
  }
  else if(id=="Thursday")
  {
  var x=document.getElementById("thursday");
  x.style.display= "block";
  tuesday.style.display="none";
  wednesday.style.display="none";
  monday.style.display="none";
  friday.style.display="none";
  saturday.style.display="none";
  Imagev.remove();
  }
  else if(id=="Friday")
  {
  var x=document.getElementById("friday");
  x.style.display= "block";
  tuesday.style.display="none";
  wednesday.style.display="none";
  thursday.style.display="none";
  monday.style.display="none";
  saturday.style.display="none";
  Imagev.remove();
  }
  else if(id=="Saturday")
  {
  var x=document.getElementById("saturday");
  x.style.display= "block";
  tuesday.style.display="none";
  wednesday.style.display="none";
  thursday.style.display="none";
  friday.style.display="none";
  monday.style.display="none";
  Imagev.remove();
  }
}

