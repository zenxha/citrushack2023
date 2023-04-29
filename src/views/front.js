const fill = document.querySelector('.fill');
const submitFile = document.querySelector('.submitform');

var visibility = false;

//Fill listeners
fill.addEventListener('dragstart', dragStart);

//functions
function dragStart(evt) {

}


const dropDownBtn = document.querySelector(".Nav-btn-drop");
const dropDownMenu = document.querySelector(".Nav-dropdown-container");

dropDownBtn.addEventListener('click', dropDown);

function dropDown() {
    visibility = !visibility;
    dropDownMenu.attributes.visibility = visibility;
    console.log(dropDownMenu.attributes.visibility);
}