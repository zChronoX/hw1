//TOGGLE PASSWORD
function showPassword(event) {
  console.log(event)
  if (state) {
    let type = document.getElementById('password');
    type.setAttribute("type", "password");
    console.log(type);
    document.getElementById('eye').style.color = '#7a797e';
    state = false;
  }
  else {
    let type = document.getElementById('password');
    type.setAttribute("type", "text");
    document.getElementById('eye').style.color = '#fcfcfc';

    state = true;
  }

}

var state = false;
const eye = document.getElementById('eye');
eye.addEventListener('click', showPassword);

function verifica(event) {
  //ACCEDO AL VALORE INSERITO DALL'UTENTE nei vari input del nostro form

  //VERIFICA CHE TUTTI I CAMPI DEVONO ESSERE INSERITI
  if (form_dati.username.value.length == 0 || form_dati.password.length == 0) {
    //SE UNO DI QUESTI CAMPI NON E' STATO INSERITO:

    //MANDIAMO UN ALERT PER AVVISARE L'UTENTE
    alert('Compilare tutti i campi!!');
    event.preventDefault();
  }
}

const form_dati = document.forms['form_dati'];
form_dati.addEventListener('submit', verifica);

const username = document.querySelector('input[name="username"]')
username.addEventListener('blur', checkUsername)

function checkUsername(event) {
  const form = document.getElementById("textUser");
  let username_value = document.getElementById("username").value;
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

const password = document.querySelector('input[name="password"]')
password.addEventListener('blur', checkPassword)

function checkPassword(event) {
  const form = document.getElementById("textPassword");
  let password_value = document.getElementById("password").value;
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
