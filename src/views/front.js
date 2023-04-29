const fill = document.querySelector('.fill');
const submitFile = document.querySelector('.submitform');

//Fill listeners
fill.addEventListener('dragstart', dragStart);

//functions
function dragStart(evt) {

}


const dropDownBtn = document.querySelector(".Nav-btn-drop");
const dropDownMenu = document.querySelector(".Nav-dropdown-container");

dropDownBtn.addEventListener('click', dropDown);

function dropDown() {
    if (dropDownMenu.style.visibility == "hidden") {
        dropDownMenu.style.visibility = "visible";
      } else {
        dropDownMenu.style.visibility = "hidden";
      }
}