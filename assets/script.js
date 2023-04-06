// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var saveBtnEl = $(".btn");
var currentDate = dayjs();
var currentDateEl = $('#currentDay');
var divRowEl = [] 
var keyList = []

// TODO: Add code to display the current date in the header of the page.
currentDateEl.text(currentDate.format('dddd, MMMM D YYYY'));


  //Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.

saveBtnEl.on('click', saveToLocalStorage)

function saveToLocalStorage(event){
  event.preventDefault();
  var buttonSave = $(this).parent();
  var rowId = buttonSave.attr('id').trim();
  var rowValue = buttonSave.children().eq(1).val().trim();
  localStorage.setItem(rowId,JSON.stringify(rowValue))
  
}
  
  //  Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.

function getEventsAndAddColor(){

  $.each($('.container-lg').children('.row'), function () {
    divRowEl.push($(this).attr('id'));
  });
if(localStorage.length > 0){
  for (i=0; i<localStorage.length; i++)  
  {  
      keyList.push(localStorage.key(i).trim());  
    
  } 
  for (var i=0; i< divRowEl.length;i++){
    var parentDivEl =$('#'+divRowEl[i])
    var textAreaEl = parentDivEl.children().eq(1);

    for (var x=0; x < keyList.length; x ++){
      if(divRowEl[i]=== keyList[x]){

        textAreaEl.text(JSON.parse(localStorage.getItem(keyList[x])));

      }
    }
  
}
  
}
//set the colors no matter if local storage has items

for (var i=0; i< divRowEl.length;i++){
  var parentDivEl =$('#'+divRowEl[i]);
  var textAreaEl = parentDivEl.children().eq(1);
  

  if(parseInt(currentDate.format('H')) == parseInt(divRowEl[i].slice(5))){
    textAreaEl.addClass('present');

  }else if(parseInt(currentDate.format('H')) < parseInt(divRowEl[i].slice(5))){
    
    textAreaEl.addClass('future');

  }else if (parseInt(currentDate.format('H')) > parseInt(divRowEl[i].slice(5))){
    textAreaEl.addClass('past');

}
}
}

  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. 
getEventsAndAddColor()
  


  
