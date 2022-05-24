function showPassword(event) {
  //console.log(event)
  if (stateP) {
    let typeP = document.getElementById('Password');
    typeP.setAttribute("type", "password");
    console.log(typeP);
    document.getElementById('eyeP').style.color = '#7a797e';
    stateP = false;
  }
  else {
    let typeP = document.getElementById('Password');
    typeP.setAttribute("type", "text");
    document.getElementById('eyeP').style.color = '#000000';

    stateP = true;
  }

}

var stateP = false;
const eyeP = document.getElementById('eyeP');
//console.log(eyeP);
eyeP.addEventListener('click', showPassword);



//Funzione di verifica compilazione form

function verifica(event) {
  //Verifico che tutti i campi siano stati compilati dall'utente

  if (form_dati.Nome.value.length == 0 || form_dati.Cognome.length == 0 ||
    form_dati.Username.length == 0 || form_dati.Password.length == 0 ||
    form_dati.cPassword.length == 0 || form_dati.Email.length == 0 ||
    form_dati.Genere.value === '') {

    //In caso di esito negativo invio un'alert e prevengo l'invio del form 

    alert('Non hai compilato tutti i campi. Riprova!');
    event.preventDefault();
  }

}


//Faccio in modo che prima di inviare i campi, avvenga il controllo tramite la funzione

const form_dati = document.forms['form_dati']
form_dati.addEventListener('submit', verifica)



const username = document.querySelector('input[name="Username"]')
username.addEventListener('blur', checkUsername)

function checkUsername(event) {
  const form = document.getElementById("textUsername");
  let username_value = document.getElementById("Username").value;
  const pattern = /^[ a-z A-Z 0-9]{4,15}$/;
  if (username_value.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    form.textContent = "Username valido";
    form.style.color = "#00a100";
  }
  else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    form.textContent = "Perfavore, inserisci un valido username";
    form.style.color = "#ff0000";


    username.value = '';
  }
  if (username_value == '') {
    form.classList.remove("valid");
    form.classList.remove("invalid");
    form.textContent = "";
    form.style.color = "#00a100";
  }


}

const email = document.querySelector("input[name='Email']");
//console.log(email);
email.addEventListener('blur', checkEmail);

function checkEmail(event) {

  const form = document.getElementById("form");
  let email_value = document.getElementById("email").value;
  const text = document.getElementById("textEmail");

  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (email_value.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    text.textContent = "Email valida";
    text.style.color = "#00a100";
  }

  else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    text.textContent = "Perfavore, inserisci una email valida";
    text.style.color = "#ff0000";

    const mail = document.querySelector('input[name="Email"]');
    mail.value = '';
  }

  if (email_value == '') {
    form.classList.remove("valid");
    form.classList.remove("invalid");
    text.textContent = "";
    text.style.color = "#00a100";
  }
}

const nome = document.querySelector('input[name="Nome"]')
nome.addEventListener('blur', checkName)

function checkName(event) {
  const form = document.getElementById("textUser");
  let user_value = document.getElementById("Nome").value;
  const pattern = /^[a-zA-Z]{3,15}$/;

  if (user_value.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    form.textContent = "Nome valido";
    form.style.color = "#00a100";
  }
  else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    form.textContent = "Perfavore, inserisci un nome valido";
    form.style.color = "#ff0000";


    nome.value = '';
  }
  if (user_value == '') {
    form.classList.remove("valid");
    form.classList.remove("invalid");
    form.textContent = "";
    form.style.color = "#00a100";
  }


}

const cognome = document.querySelector('input[name="Cognome"]')
cognome.addEventListener('blur', checkSurname)

function checkSurname(event) {
  const form = document.getElementById("textSurname");
  let user_value = document.getElementById("Cognome").value;
  const pattern = /^[a-zA-Z]{3,15}$/;

  if (user_value.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    form.textContent = "Cognome valido";
    form.style.color = "#00a100";
  }
  else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    form.textContent = "Perfavore, inserisci un cognome valido";
    form.style.color = "#ff0000";


    cognome.value = '';
  }
  if (user_value == '') {
    form.classList.remove("valid");
    form.classList.remove("invalid");
    form.textContent = "";
    form.style.color = "#00a100";
  }


}

const password = document.querySelector('input[name="Password"]')
password.addEventListener('blur', checkPassword)

function checkPassword(event) {
  const form = document.getElementById("textPassword");
  let password_value = document.getElementById("Password").value;
  const pattern = /^[ a-z A-Z 0-9]{4,15}$/;

  if (password_value.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    form.textContent = "Password valida";
    form.style.color = "#00a100";
  }
  else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    form.textContent = "Pattern errato";
    form.style.color = "#ff0000";


    password.value = '';
  }
  if (password_value == '') {
    form.classList.remove("valid");
    form.classList.remove("invalid");
    form.textContent = "";
    form.style.color = "#00a100";
  }


}

const passC = document.querySelector('input[name="cPassword"]')
passC.addEventListener('blur', checkPassC)

function checkPassC(event) {
  const form = document.getElementById("textPassC");
  const text = document.getElementById("textPassC");
  let passC_value = document.getElementById("cPassword").value;
  let pass_value = document.getElementById("Password").value;

  if (passC_value == pass_value) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    form.textContent = "Password uguali";
    form.style.color = "#00a100";
  }

  else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    form.textContent = "Password diverse";
    form.style.color = "#ff0000";


    passC.value = '';
  }
  if (passC_value == '') {
    form.classList.remove("valid");
    form.classList.remove("invalid");
    form.textContent = "";
    form.style.color = "#00a100";
  }
}


