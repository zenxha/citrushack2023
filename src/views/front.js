//drag and drop
const dragDetactor = document.querySelector('html');
const submitForm = document.querySelector('.submit-form');

dragDetactor.addEventListener('dragover', (event) => {
    event.preventDefault();
    submitForm.classList.add('dragover');
});
  
dragDetactor.addEventListener('dragleave', () => {
    submitForm.classList.remove('dragover');
});
  
dragDetactor.addEventListener('drop', (event) => {
    event.preventDefault();
    submitForm.classList.remove('dragover');
  
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
});
  
function handleFileUpload(file) {
    const fileNameElement = document.querySelector('.file-name');
    fileNameElement.textContent = file.name;
}


//file upload by button
const fileInput = document.getElementById("audio-upload");
const fileNameSpan = document.querySelector(".file-name");
const customUploadButton = document.querySelector(".custom-file-upload");

fileInput.addEventListener("change", function () {
    fileNameSpan.textContent = this.files[0].name;
});

// Trigger click event on file input when the custom button is clicked
customUploadButton.addEventListener("click", function () {
    fileInput.click();
});


//
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

// Handle form submission
const submit = () => {
    const fileInputs = document.querySelector('input[type="file"]')
    const textInput = document.querySelector('input[name="textData"]');
    const audio = fileInputs[0]
    const formData = new FormData();
    formData.append('audio', audio);
    formData.append('title', textInput);

    fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        // do shit
    })
    .catch(error => {
        console.error(error);
        // handle the error
    });

}