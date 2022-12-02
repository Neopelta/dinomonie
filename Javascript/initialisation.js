// *****************************************************
// ********************* INDEX *************************
// *****************************************************

var lang = navigator.language;

// Pour la modification de l'objet d'un email
var save_m = "";
var cpt = 0;

function email_objet() {
  let m = document.getElementById("email").href;
  // Sécurité sil'utilisateur appuis plusieurs fois sur le lien
  if (cpt === 0) {
    save_m = document.getElementById("email").href =
      m + "?subject=" + email_Date();
    cpt = 1;
  } else {
    save_m;
  }
}

//Obtenir date chargement de la page pour l'objet de l'email
function email_Date() {
  let date = "";

  let day = date_start.getDate(); //plage = 1-31
  if (day < 10) {
    day = "0" + day;
  }
  let month = date_start.getMonth() + 1; //plage = 0-11 //Janvier = 0 + 1
  if (month < 10) {
    month = "0" + month;
  }
  let year = date_start.getFullYear(); //plage = AAAA
  if (year < 10) {
    year = "0" + year;
  }
  let hour = date_start.getHours(); //plage = 0-23
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minute = date_start.getMinutes(); //plage = 0-59
  if (minute < 10) {
    minute = "0" + minute;
  }

  if (lang == "fr") {
    //Navigateur en français
    date = day + "-" + month + "-" + year + " : " + hour + "h" + minute;
  } else {
    //Navigateur en autre
    date = month + "-" + day + "-" + year + " : " + hour + "h" + minute;
  }

  return date;
}

// swap image (logo)

var logoSwap = 0;
var srcOr = "Images/logo/sans_fond/sans_titre/logo_dinomonie_sansfond_or_sanstitre.png";
var srcNoir = "Images/logo/sans_fond/sans_titre/logo_dinomonie_sansfond_noir_sanstitre.png";
function swapImage() {
  let logo = document.getElementById("imgLogo");
  if(logoSwap){
    logo.src = srcNoir;
  } else {
    logo.src = srcOr;
  }
  logoSwap = !logoSwap;
}

// *****************************************************
// ******************** FORMULAIRE *********************
// *****************************************************

// Bouton Envoyer
function mysubmit() {
  if (applyAllTests()) {
    // variable
    var getnom = document.getElementById("nom").value;

    // Appel de fonction
    initHiddenInput();
    // Afficher fenetre alerte
    if (document.getElementById("date").value == "") {
      window.alert("Merci d'avoir répondu au questionnaire, " + getnom);
    } else {
      window.alert(
        "Merci d'avoir répondu au questionnaire, " +
          getnom +
          ".\n" +
          "Vous avez gagné 2 neurones et perdu " +
          msToTime() +
          "de votre vie."
      );
    }
    document.getElementById("formulaire").submit();
  } else {
    window.alert("Merci de compléter les champs manquants.");
  }
}

var date_start;
var date_end;
// Date chargement de la page
function initReadOnlyTextInput() {
  date_start = new Date();
  document.getElementById("date").value = date_start.toLocaleString();
}

// Date de fin formulaire
function initHiddenInput() {
  date_end = new Date();
  document.getElementById("hide").value = date_end.toLocaleString();
}

// difference de deux dates en hh:mm:ss
function msToTime() {
  // tmp = soustraction
  let tmp = date_end.getTime() - date_start.getTime();
  // conversion ms en hh:mm:ss
  var seconds = parseInt((tmp / 1000) % 60),
    minutes = parseInt((tmp / (1000 * 60)) % 60),
    hours = parseInt((tmp / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + "h " + minutes + "min " + seconds + "s ";
  //console.log(hours + ":" + minutes + ":" + seconds);
}

// *****************************************************
// *********************** TESTS ***********************
// *****************************************************

// Function pour faire les tests

function applyAllTests() {
  let testName = checkNames();
  let testRadio = checkNumberCheckedRadio();
  //let testCheckbox = checkCheckbox();

  if (testName && testRadio === 0 /*&& testCheckbox === 0*/) {
    return true;
  }

  return false;
}

function checkNames() {
  let passTest = true;

  let nomElt = document.getElementById("nom");
  if (nomElt.value === "") {
    nomElt.style.boxShadow = "0 0 5px 1px red";
    passTest = false;
  } else {
    nomElt.style.boxShadow = "";
    passTest = true;
  }

  return passTest;
}

//Test si les checkRadio sont selectionnés
function checkNumberCheckedRadio() {
  let rootNames = [
    "quest1",
    "quest2",
    "quest3",
    "quest4",
    "quest5",
    "quest6",
    "quest7",
    "quest8",
    "quest9",
    "quest10",
  ];
  let passTest = 0;

  for (let j = 0; j < rootNames.length; j++) {
    let root = document.getElementById(rootNames[j]);
    let eltTable = root.getElementsByTagName("input");
    let c = 0;
    let cBox = 0;

    for (let i = 0; i < eltTable.length; i++) {
      let elt = eltTable[i];
      if (elt.getAttribute("type") === "radio" && elt.checked) {
        c++;
        cBox = 2;
      }
      if (elt.getAttribute("type") === "checkbox" && elt.checked) {
        c = 1;
        cBox++;
      }
    }

    if (c == 0 || cBox !== 2) {
      root.style.color = "red";
      passTest++;
    } else {
      root.style.color = "black";
    }
  }

  return passTest;
}

// Test si les CheckBox sont cochés

function checkCheckbox() {
  let passTest = 0;
  let rootName = ["imgList", "formList", "textareaList"];

  for (let j = 0; j < rootName.length; j++) {
    let root = document.getElementById(rootName[j]);
    let eltTable = root.getElementsByTagName("input");
    let c = 0;

    for (let i = 0; i < eltTable.length; i++) {
      let elt = eltTable[i];
      if (elt.getAttribute("type") === "checkbox" && elt.checked) {
        c++;
      }
    }

    if (c < 1) {
      root.style.color = "red";
      passTest++;
    } else {
      root.style.color = "black";
    }
  }
  return passTest;
}

// *****************************************************
// *********************** COOKIE **********************
// *****************************************************

function creerCookie(nom, valeur, jours) {
  var expires = ""
  if (jours) {
    var date = new Date();
    date.setTime(date.getTime() + jours * 24 * 60 * 60 * 1000);
    expires = ";expires =" + date.toGMTString();
  } else expires = "";
  var content = nom + "=" + valeur + expires + "; path=/";
  document.cookie = content;
  console.log("document.cookie = " + document.cookie);
}

function recupererCookie(nom) {
  var nomRC = nom + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nomRC) == 0) return c.substring(nomRC.length, c.length);
  }
  return "inconnu";
}

// FONCTION DE TEST - CHANGEMENT DE STYLE ***

var basicStyle = "Styles/basic.css";
var accessStyle = "Styles/access.css";

function toggleCookie() {
  var cookie = recupererCookie("pref_CSS");
  if(cookie !== "inconnu")
    creerCookie("pref_CSS", !JSON.parse(cookie), "15");
}

function ChangeCSS() {
  loadCSS(recupererCookie("pref_CSS"));
}

function firstLoadCSS(){
  
  let prefCSS = recupererCookie("pref_CSS");
  if(prefCSS != "inconnu") {
    let link = document.getElementById('basicStyle');
    if(prefCSS == "true") {
      link.setAttribute('href', basicStyle)
    } else {
      link.setAttribute('href', accessStyle)
    }
 } 
}

function loadCSS() {
  toggleCookie();
  let links = document.getElementsByTagName('link');
  for(let i = 0; i < links.length; i++) {
    var link = links[i];
    if(link.getAttribute('rel') == 'stylesheet') {
      if(link.getAttribute('href') == basicStyle){
        console.log("Change to access stylesheet");
        link.setAttribute('href', accessStyle);
      }
      else if(link.getAttribute('href') == accessStyle) {
        console.log("Change to basic stylesheet");
        link.setAttribute('href', basicStyle);
      }
    }
  }
}

// *****************************************************
// ********************* SITE MAP **********************
// *****************************************************
function functionToggle1() {
  // Afficher/cacher list_game
  let div = document.getElementById("list_games");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

function functionToggle2() {
  // Afficher/cachertop_aventure
  let div = document.getElementById("top_aventure");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

function functionToggle3() {
  // Afficher/cachertop_aventure
  let div = document.getElementById("top_multiple");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

function functionToggle4() {
  // Afficher/cachertop_aventure
  let div = document.getElementById("top_coop");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}
