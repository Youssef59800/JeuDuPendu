const listMot=['APPLICATION', 'JAVASCRIPT','AVENTURE','MARCHER','JEU'];
const rand = Math.floor(Math.random()*listMot.length);
let motChoisi = listMot[rand];
let compteurErreur = 0;
let nombreErreurAutorisé = 8;
let motCache='';

let motSelectionne = document.getElementById("motCache");
let rejouerBtn = document.getElementById("btnRejouer");
let messageDeFin = document.getElementById("boiteFin");
let boiteDialogue = document.getElementById("popup");
let cadre = document.getElementById("boiteGuillo");
let clavier = document.getElementById("clavier");
let guillotine = document.getElementById("guillo");

let bonhomme = document.querySelectorAll(".membres");

// la fonction qui génére le clavier virtuel
function tablette() {
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i=0;i<alpha.length;i++) {
        let bouton = document.createElement("input");
        bouton.type = "button";
        bouton.value = alpha[i];
        bouton.id = alpha[i];
        bouton.onclick = compare;
        clavier.appendChild(bouton);
    }
}

// générer un mot au hasard à partir de la bibliothèque

function genererMot() {
    
    document.getElementById("nombreEssai").innerText = nombreErreurAutorisé;
    document.getElementById("nombreErreur").innerText = compteurErreur;
    motCache="";
    for(let i=0;i<motChoisi.length;i++){
        motCache +='-';
    }
    
    return motSelectionne.innerText = motCache;
}

//la fonction principale



function compare()
 {

    if(motChoisi.includes(this.value))
     {

        // remplacer le tiret par valeur de la touche tapée dans le cas où cette dernière est juste

    for(let i=0;i<motChoisi.length;i++)
    {
       if (motChoisi[i]===this.value) {
        motCache = motCache.substring(0,i) + this.value + motCache.substring(i+1);
        motSelectionne.innerText = motCache ;
       }
       
    }
       //désactiver la touche dans le clavier virtuelle

    this.disabled = true;
    
     }

    else 
     {

      // comptabliser les erreurs

    compteurErreur++;
    nombreErreurAutorisé--;
    document.getElementById("nombreErreur").innerText = compteurErreur;
    document.getElementById("nombreEssai").innerText = nombreErreurAutorisé;
    this.disabled = true;

      //afficher les parties de la pendaison en cas d'erreur

    bonhomme.forEach((partie,index) => {
        if (index < compteurErreur)
         {
        partie.style.display = 'block';
         }
        else 
         {
            partie.style.display = 'none';
         }

    })

}
checkWin();
}

  
//Fonction pour vérifier si on a gangné ou perdu

function checkWin() {
    if ( compteurErreur === 8 && motSelectionne != motChoisi ){
        messageDeFin.style.display = 'flex';
        document.getElementById("messageFinal").innerText = "Malheureusement vous avez perdu :(";

    }
    
    else if(compteurErreur < 8 && motCache === motChoisi){
        messageDeFin.style.display = 'flex';
        document.getElementById("messageFinal").innerText = "Bravo tu as gagné :)";
    }
}

//Fonction pour Rejouer la partie 
     
function rejouer() {
    messageDeFin.style.display = 'none';
    while (clavier.firstChild) {
        clavier.removeChild(clavier.lastChild);
    }

    while (bonhomme.firstChild) {
        bonhomme.removeChild(bonhomme.lastChild);
    }


    
    motSelectionne.innerText = "";
    compteurErreur = 0;
    nombreErreurAutorisé = 8;

    tablette();
    genererMot();
    
    }


tablette();
genererMot();

















