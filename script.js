/*  Déclaration des variables nécessaires
    pour le bouton 'Vers le haut de page'
*/
const scrollToTopBtn = document.getElementById('to_top');
const links = document.getElementById('links');
const observed = document.getElementById('home');

const xxl = window.matchMedia('(min-width: 1536px)');

// Ajoute un évènement 'click' sur le bouton 'Vers le haut de page'
scrollToTopBtn.addEventListener('click', event => {
    event.preventDefault();
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

/*  Créer un point d'observation sur la page pour savoir si
    le bouton 'Vers le haut de page' doit s'afficher ou non
*/
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.isIntersecting ? scrollToTopBtn.classList.remove('show') : scrollToTopBtn.classList.add('show');
            if (xxl.matches) {
                entry.isIntersecting ? links.classList.remove('top') : links.classList.add('top');
            }
        });
    }, {
    threshold: 0.5,
}
);

// Lance l'observation de la page
observer.observe(observed);


const docStacks = document.getElementById('stacks');
async function getStacks() {
    const res = await fetch('./stacks.json');
    const obj = await res.json();
    let arr = [];
    for (let i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}
const stacks = getStacks();

function setStacks() {
    stacks.then(data => {
        console.log(data)
        docStacks.innerHTML = 
            `<h2>Stacks</2>
            <h3>Utilise</h3>
            <ul id="stacks_acquired">
                ${data[0].reduce((u, l) => u.concat(
                    `<li><img src="./Assets/Icons/${l}.svg" alt="${l} Icon" />${l}</li>`
                ), '')}
            </ul>
            <h3>Apprend</h3>
            <ul id="stacks_learning">
                ${data[1].reduce((u, l) => u.concat(
                    `<li><img src="./Assets/Icons/${l}.svg" alt="${l} Icon" />${l}</li>`
                ), '')}
            </ul>
            <h3>Souhaite apprendre</h3>
            <ul id="stacks_wanted">
                ${data[2].reduce((u, l) => u.concat(
                    `<li><img src="./Assets/Icons/${l}.svg" alt="${l} Icon" />${l}</li>`
                ), '')}
            </ul>`;
    });
}
setStacks();

const docProjects = document.getElementById('projects');
async function getProjects() {
    const res = await fetch('./projects.json');
    const obj = await res.json();
    let arr = [];
    for (let i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}
const projects = getProjects();

function setProjects() {
    projects.then(data => {
        data.reverse();
        docProjects.lastElementChild.outerHTML = 
            `<ul>
                ${data.reduce((u, l) => u.concat(
                    `<li>
                        <div class="card">
                            <div class="card_top">
                                <img src="./Assets/Projects/${l.image}" alt="${l.name} - Image Preview" />
                            </div>
                            <div class="card_mid">
                                <h3>${l.name}</h3>
                                <p class="project_desc">${l.desc}</p>
                                <ul class="project_stacks">
                                    ${l.stacks.reduce((pv, cv) => pv.concat(
                                        `<li>
                                            <img src="./Assets/Icons/${cv}.svg" alt="${cv} Icon" />
                                        </li>`
                                    ), '')}
                                </ul>
                            </div>
                            <div class="card_bot">
                                ${l.links.preview ? `<a href="${l.links.preview}">PREVIEW</a>`: ''}
                                ${l.links.code ? `<a href="${l.links.code}">CODE</a>` : ''}
                            </div>
                        </div>
                    </li>
                    `
                ), '')}
            </ul>`;
    });
}
setProjects();