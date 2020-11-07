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



// FILTER

let filter = "alle";
let destinationer;
let container = document.querySelector("#container");
let temp = document.querySelector("template");


document.addEventListener("DOMContentLoaded", hentData);


async function hentData() {
    const respons = await fetch(link);
    destinationer = await respons.json();
    addEventListenersToButtons();
    vis(destinationer);
}

function vis(destinationer) {
    //Løber igennem array "destinationer" fra JSON
    container.innerHTML = "";
    destinationer.forEach(dest => {
        if (filter == "alle" || filter == dest.gsx$kategori.$t.toLowerCase()) {
            console.log(dest);
            const klon = temp.cloneNode(true).content;
            klon.querySelector(".navn").textContent = dest.title.rendered;
            klon.querySelector(".beskrivelse").innerHTML = dest.content.rendered;
            //            klon.querySelector("img").src = "img/billeder/" + dest.gsx$billede.$t + ".jpg";
            //            klon.querySelector(".indbyggertal").textContent += dest.gsx$indbyggertal.$t;
            //            klon.querySelector(".vejr").textContent += dest.gsx$vejr.$t;
            //            klon.querySelector(".funfact").textContent += dest.gsx$funfact.$t;
            //            klon.querySelector(".pris").textContent += dest.gsx$pris.$t;

            klon.querySelector("article").addEventListener("click", () => visDetaljer(dest));

            container.appendChild(klon);

        }

    })

    destinationer.feed.entry.forEach(dest => {

        if (id == dest.gsx$id.$t) {
            visDetaljer(dest)
        }
    })

}

function visDetaljer(dest) {
    location.href = `singleview.html?id=${dest.gsx$id.$t}`;

}
