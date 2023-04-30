//drag and drop
const dragDetactor = document.querySelector('html');
const submitForm = document.querySelector('.submit-form');
const fileUploadInput = document.querySelector('.file-upload-input');
const audioPlayer = document.getElementById('audio');

const MAXSIZE = 64000000

dragDetactor.addEventListener('dragover', (event) => {
    event.preventDefault();
    submitForm.classList.add('dragover');
});
  
dragDetactor.addEventListener('dragleave', () => {
    submitForm.classList.remove('dragover');
});
  
dragDetactor.addEventListener('drop', async function(event) {
    event.preventDefault();
    submitForm.classList.remove('dragover');
  
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);

    //set playstate to pause (icon is declared in audioPlay.ejs)
    icon.classList.remove("play");
    icon.setAttribute('name', 'play-outline');
    icon.classList.add("pause");
    audio.pause();

    console.log(file.size + " : " + MAXSIZE)
    if (file.size > MAXSIZE) {
        alert('File size must be less than 64MB.');
        this.value = null; // clear the file input
        return;
    }

    //gets the playable address of a local file been uploaded
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = (event) => {
        const audioUrl = URL.createObjectURL(file);
        audioPlayer.src = audioUrl;
    };

});

fileUploadInput.addEventListener('change', async function(event) {
    const file = event.target.files[0];
    handleFileUpload(file);

    //set playstate to pause (icon is declared in audioPlay.ejs)
    icon.classList.remove("play");
    icon.setAttribute('name', 'play-outline');
    icon.classList.add("pause");
    audio.pause();

    console.log(file.size + " : " + MAXSIZE)
    if (file.size > MAXSIZE) {
        alert('File size must be less than 64MB.');
        this.value = null; // clear the file input
        return;
    }

    //gets the playable address of a local file been uploaded
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = (event) => {
        const audioUrl = URL.createObjectURL(file);
        audioPlayer.src = audioUrl;
    };
});
  
function handleFileUpload(file) {
    const fileNameElement = document.querySelector('.file-name');
    fileNameElement.textContent = file.name;
}

//file upload by button
const fileInput = document.getElementById("audio-upload");
const fileNameSpan = document.querySelector(".file-name");
const customUploadButton = document.querySelector(".custom-file-upload");

fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    handleFileUpload(file);

    //set playstate to pause (icon is declared in audioPlay.ejs)
    icon.classList.remove("play");
    icon.setAttribute('name', 'play-outline');
    icon.classList.add("pause");
    audio.pause();

    console.log(file.size + " : " + MAXSIZE)
    if (file.size > MAXSIZE) {
        alert('File size must be less than 64MB.');
        this.value = null; // clear the file input
        return;
    }
    fileNameSpan.textContent = this.files[0].name;
});

// Trigger click event on file input when the custom button is clicked
customUploadButton.addEventListener("click", function () {
    fileInput.click();
});


//nav dropdown toggling
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
// const handleSubmit = () => {
//     const fileInputs = document.querySelector('input[type="file"]')
//     const textInput = document.querySelector('input[name="textData"]');
//     const audio = fileInputs[0]
//     const formData = new FormData();
//     formData.append('audio', audio);
//     formData.append('title', textInput);

//     fetch('/api/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.text())
//     .then(result => {
//         console.log(result);
//         // do shit
//     })
//     .catch(error => {
//         console.error(error);
//         // handle the error
//     });

// }


//handles voice recording
// collect DOMs
const display = document.querySelector('.display')
const controllerWrapper = document.querySelector('.controllers')

const State = ['Initial', 'Record', 'Download']
let stateIndex = 0
let mediaRecorder, chunks = [], audioURL = '', newFile

// mediaRecorder setup for audio
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    console.log('mediaDevices supported..')

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
        }
        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            const newFile = new File([blob], `recorded_audio.ogg`, { type: 'audio/ogg; codecs=opus' });
            await Promise.resolve();

            // Create a new DataTransfer object and add the new file to it
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(newFile);

            // Replace the FileList object of the file input element with the new one
            fileUploadInput.files = dataTransfer.files;
          
            chunks = []
            audioURL = window.URL.createObjectURL(blob)
            audioPlayer.src = audioURL

            const fileNameElement = document.querySelector('.file-name');
            fileNameElement.textContent = newFile.name;
          };
    }).catch(error => {
        console.log('Following error has occured : ',error)
    })
}else{
    stateIndex = ''
    application(stateIndex)
}

const clearDisplay = () => {
    display.textContent = ''
}

const clearControls = () => {
    controllerWrapper.textContent = ''
}

const record = () => {
    stateIndex = 1
    mediaRecorder.start()
    application(stateIndex)
}

const stopRecording = () => {
    stateIndex = 2
    mediaRecorder.stop()
    application(stateIndex)
}

const downloadAudio = () => {
    const downloadLink = document.createElement('a')
    downloadLink.href = audioURL
    downloadLink.setAttribute('download', 'audio')
    downloadLink.click()
}

const addButton = (id, funString, text) => {
    const btn = document.createElement('button')
    btn.id = id
    btn.setAttribute('onclick', funString)
    btn.textContent = text
    controllerWrapper.append(btn)
}

const addMessage = (text) => {
    const msg = document.createElement('p')
    msg.textContent = text
    display.append(msg)
}

async function setAudio() {
    //set playstate to pause (icon is declared in audioPlay.ejs)
    icon.classList.remove("play");
    icon.setAttribute('name', 'play-outline');
    icon.classList.add("pause");
    audio.pause();
}

const application = (index) => {
    switch (State[index]) {
        case 'Initial':
            clearDisplay()
            clearControls()

            addButton('record', 'record()', 'Start Recording')
            break;

        case 'Record':
            clearDisplay()
            clearControls()

            // addMessage('Recording...')
            addButton('stop', 'stopRecording()', 'Stop Recording')
            break

        case 'Download':
            clearControls()
            clearDisplay()

            setAudio()
            addButton('record', 'record()', 'Record Again')
            break

        default:
            clearControls()
            clearDisplay()

            addMessage('Your browser does not support mediaDevices')
            break;
    }

}

application(stateIndex)