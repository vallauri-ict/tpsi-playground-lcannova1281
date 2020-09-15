"use strict"

let n=6;
let turno=0;
let bottoni=new Array(6);
for (let i = 0; i < bottoni.length; i++){
    bottoni[i] = new Array (6);
}

let pulsante1;
let pulsante2;
let contVittoria=0;

window.onload=function () {

    let valBottoni = new Array(2);
    for (let i = 0; i < valBottoni.length; i++){
        valBottoni[i] = new Array (18);
    }

    let x;
    let trovato=false;

    for (let i=0;i<2;i++) {
        for (let j = 0; j < 18; j++) {
            do {
                x = generaNumero(1, 18);
                trovato = ricercaSentinella(x, valBottoni[i]);
            } while (trovato);
            valBottoni[i][j] = x;
        }
    }



    let body=document.getElementsByTagName("body")[0];
    let h1=document.createElement("h1");
    h1.innerHTML="Memory";
    h1.style.textAlign="center";
    body.appendChild(h1);
    let div=document.createElement("div");
    div.style.width="300px";
    div.style.height="300px";
    //div.style.border="1px solid black";
    div.style.margin="0 auto";
    div.setAttribute("id", "divWrapper");
    body.appendChild(div);

    let cont=0;
    let button;
    let br=document.createElement("br");
    for (let i=0;i<n;i++){
        for (let j=0;j<n;j++){
            button=document.createElement("button");

            if (j%2==0){
                button.innerText=valBottoni[0][cont];

            }
            else
            {
                button.innerText=valBottoni[1][cont];
                cont++;
            }
            button.onclick = function() { click(this) };
            button.style.width=300/n + "px";
            button.style.height=300/n + "px";
            button.style.color="#EFEFEF";
            button.style.background="#EFEFEF";
            div.appendChild(button);
            bottoni[i][j]=button;
        }
        div.appendChild(br);
    }


}

function ricercaSentinella(num, valBottoni) {
    let i=0;
    let trovato = false;

    do {
        if (valBottoni[i] == num)
        {
            trovato=true;
        }
        else
        {
            i++;
        }
    }while (i < valBottoni.length && !trovato);

    return trovato;
}

function generaNumero(a , b) {
    return Math.floor((b - a + 1) * Math.random()) + a;
}

function click(pulsanteCliccato) {
    if (turno==0){
        pulsanteCliccato.style.background="red";
        pulsanteCliccato.disabled=true;
        pulsante1=pulsanteCliccato;
        turno++;
    }
    else {
        pulsanteCliccato.style.background="red";
        pulsante2=pulsanteCliccato;

        for (let i=0;i<n;i++){
            for (let j=0;j<n;j++){
                bottoni[i][j].disabled=true;
            }
        }

        let timer = setTimeout(verificaUguali, 1500);


        turno=0;
    }

}

function verificaUguali() {


    if (pulsante1.innerText==pulsante2.innerText){
        pulsante1.style.background="blue";
        pulsante2.style.background="blue";
        contVittoria=contVittoria+2;
    }
    else {
        pulsante1.style.background="#EFEFEF";
        pulsante2.style.background="#EFEFEF";
    }

    for (let i=0;i<n;i++){
        for (let j=0;j<n;j++){
            if (bottoni[i][j].style.background!="blue") {
                bottoni[i][j].disabled = false;
            }
        }
    }

    if (contVittoria==(n*n)){
        alert("HAI VINTO!");
    }
}







