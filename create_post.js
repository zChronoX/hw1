const showInfoWindow = document.querySelector('#infoView')
const infoButton = document.querySelector('#infoButton')
infoButton.addEventListener('click', showInfo)
const closeInfo = document.querySelector('#closeInfo')
closeInfo.addEventListener('click', closeInfoPage)


//Funzione di visualizzazione delle info


function showInfo() {
    if (showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.remove('hidden')
    }
}

function closeInfoPage() {
    if (!showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.add('hidden')
    }
}

function verifica(event) {
    //Verifico che tutti i campi siano stati compilati dall'utente

    if (form_dati.Titolo.value.length == 0 || form_dati.Testo.value.length == 0) {
        event.preventDefault();

        alert('Non hai compilato tutti i campi. Riprova!');

    }

}



const form_dati = document.forms['form_post'];
form_dati.addEventListener('submit', verifica);


function createNewPost(event) {
    const form_data = { method: 'post', body: new FormData(form_dati) };
    fetch("send_posts.php", form_data).then(fetchResponse, onError);

}

function fetchResponse(response) {
    console.log('Success!');
    return response.json();
}

function onError(error) {
    console.log('Error' + error);
}


form_dati.addEventListener('submit', createNewPost);


const title = document.querySelector('input[name="Titolo"]')
title.addEventListener('blur', checkTitle)

function checkTitle(event) {
    const form_title = document.getElementById("Title");
    let title_value = document.getElementById("titolo").value;
    const pattern = /^[a-zA-Z0-9!@#?\$%\^\&*\s)\(+=._-]{4,20}$/g;

    if (title_value.match(pattern)) {
        console.log("Titolo valido");
        form_title.classList.remove("invalid");
        form_title.textContent = "";

    }

    else {
        form_title.textContent = "Perfavore, inserisci un titlo compreso tra 4 e 20 caratteri.";
        form_title.style.color = "#ff0000";
        form_title.classList.add("invalid");

        title.value = '';
    }
    if (title_value == '') {
        form_title.classList.remove("valid");
        form_title.classList.remove("invalid");
        form_title.textContent = "";
        form_title.style.color = "#00a100";
    }
}

const text = document.querySelector('#testo')
text.addEventListener('blur', checkText)

function checkText(event) {
    const form_text = document.getElementById("main_text");
    let text_value = document.getElementById("testo").value;
    const pattern = /^[a-zA-Z0-9!@#?\$%\^\&*\s)\(+=._-]{10,}$/g;

    if (text_value.match(pattern)) {
        console.log("Testo valido");
        form_text.classList.remove("invalid");
        form_text.textContent = "";

    }

    else {
        form_text.textContent = "Perfavore, inserisci un testo di almeno 10 caratteri";
        form_text.style.color = "#ff0000";
        form_text.classList.add("invalid");

        testo.value = '';
    }
    if (text_value == '') {
        form_text.classList.remove("valid");
        form_text.classList.remove("invalid");
        form_text.textContent = "";
        form_text.style.color = "#00a100";
    }
}