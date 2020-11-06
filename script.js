let content;
let container = document.querySelector("#container");
let temp = document.querySelector("template");

window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("sidenVises");

    document.querySelector(".menuknap").addEventListener("click", toggleMenu);

}

const link = "http://vais.dk/kea/02_SEM/tema9/ihs/wordpress/wp-json/wp/v2/pages/" + id;

document.addEventListener("DOMContentLoaded", hentData);


async function hentData() {
    const respons = await fetch(link);
    content = await respons.json();
    console.log(content.title.rendered);
    console.log(content.content.rendered);
    document.querySelector("section").innerHTML = content.content.rendered;

}

function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector(".menu").classList.toggle("hidden");

    let erSkjult = document.querySelector(".menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector(".menuknap").innerHTML = "<img src='burgermenu.png' alt='menu logo'>";

    } else {
        document.querySelector(".menuknap").innerHTML = "<img src='kryds.png' alt='menu x'>";
    }
}
