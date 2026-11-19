let recup1;

function recupererduhtml() {
    recup1 = document.getElementById("monnom").innerHTML;
    // console.log(recup1);
}

function afficherdansduhtml() {
    document.getElementById("monnom").innerHTML = recup1;
    afficherdansduhtml2();
}

function afficherdansduhtml2() {
    document.getElementById("monnom").innerHTML = "<h1 id = 'monnom'>" + recup1+"</h1>";
}

function lasourisbouge() {
    alert ("la sourisbouge");
}

function lasourissort() {
    alert ("je suis sorti de la zone");
}

function lavaleurchange() {
    let recuperer= document.getElementById("kokpakpa").value;
    if(recuperer==="")
        alert("pas d'information")
      else{ alert("recuperer");
     }
    }