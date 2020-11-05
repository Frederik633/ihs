window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM loaded');
    navSlide();
    hentData();
});


}

// FILTER

let filter = "alle";
let destinationer;
let container = document.querySelector("#container");
let temp = document.querySelector("template");



const link = "http://vais.dk/kea/02_SEM/tema9/passion/wordpress/wp-json/wp/v2/posts"

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

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
};

function filterBTNs() {
    filter = this.dataset.køn;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    });

    this.classList.add("valgt");
    vis(destinationer);
}
