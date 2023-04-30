// collect DOMs
const display = document.querySelector('.display')
const controllerWrapper = document.querySelector('.controllers')

const State = ['Initial', 'Record', 'Download', 'Upload', 'Uploaded']
let stateIndex = 0
let mediaRecorder, chunks = [], audioURL = ''
var audioName = ""

const list = document.createElement('select')
list.id = "selector"
list.required = true
navigator.mediaDevices.enumerateDevices().then(devices => 
    {
        for(let i = 0; i < devices.length; i++)
            if(devices[i].kind.toString() == "audioinput"){
                let option = document.createElement('option')
                console.log(devices[i].deviceId)
                option.value = devices[i].deviceId
                option.text = devices[i].label
                list.add(option)
            }
    }) 

function setMicrophone(id){
    console.log("Option changed")
    console.log("Option: " + id)
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        console.log('mediaDevices supported..')
        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: id, 
            },    
        }).then(stream => {
            mediaRecorder = new MediaRecorder(stream)
    
            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data)
            }
    
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'})
                chunks = []
                audioURL = window.URL.createObjectURL(blob)
                document.querySelector('audio').src = audioURL
    
            }
        }).catch(error => {
            console.log('Following error has occured : ',error)
        })
    }else{
        stateIndex = ''
        application(stateIndex)
    }
}

list.value = "default"
setMicrophone(list.value)

list.addEventListener(
    'change',
    function(){setMicrophone(list.value)},
    false
)


const clearDisplay = () => {
    display.textContent = ''
}

const clearControls = () => {
    controllerWrapper.textContent = ''
}

const reset = () =>{
    stateIndex = 0
    application(stateIndex)
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

const finalize = () =>{
    stateIndex = 3
    application(stateIndex)
}

const upload = () => {
    stateIndex = 4
    audioName = document.getElementById("audiotitle").value 
    console.log(audioName)
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

const addMicrophoneSelector = () => {
    display.append(list)
    list.value = "default"
}

const addMessage = (text) => {
    const msg = document.createElement('p')
    msg.textContent = text
    display.append(msg)
}

const addAudio = () => {
    const audio = document.createElement('audio')
    audio.controls = true
    audio.src = audioURL
    display.append(audio)
}

const addInputLine = () => {
    const msg = document.createElement('p')
    msg.textContent = "Audio Title: "
    let input = document.createElement("input");
    input.type = "text";
    input.id = "audiotitle"
    display.append(msg)
    display.append(input)
}

const application = (index) => {
    switch (State[index]) {
        case 'Initial':
            clearDisplay()
            clearControls()
            
            addMicrophoneSelector()
            addButton('record', 'record()', 'Record Audio')
            break;

        case 'Record':
            clearDisplay()
            clearControls()

            addMessage('Recording...')
            addButton('stop', 'stopRecording()', 'Stop Recording')
            break

        case 'Download':
            clearControls()
            clearDisplay()

            addAudio()
            addButton('reset', 'reset()', 'Record Again')
            addButton('finalize', 'finalize()', 'Finalize Upload')
            break
        case 'Upload':
            clearControls()
            clearDisplay()

            addAudio()
            addInputLine()
            addButton('upload', 'upload()', 'Upload Audio')
            break
        case 'Uploaded':
            clearControls()
            clearDisplay()

            addMessage("Audio " + audioName + " has been uploaded")
            break
        default:
            clearControls()
            clearDisplay()

            addMessage('Your browser does not support mediaDevices')
            break;
    }

}

application(stateIndex)