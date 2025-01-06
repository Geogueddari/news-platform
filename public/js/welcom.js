var suckless_tag = document.getElementById("suckless_tag");
var suckless_description = document.getElementById("suckless_description");
var items = document.querySelectorAll('.c-item');
function applyResizeSucklessTag() {
    if (window.innerWidth <= 620) {
        items.forEach((item) => {
            item.classList.remove('c-item');
            item.classList.add('c-item-s');
        });
    }
    else {
        items.forEach((item) => {
            item.classList.remove('c-item-s');
            item.classList.add('c-item');
        });
    }
    if (window.innerWidth >= 1200) {
        suckless_description.classList.add('pe-5');
        suckless_description.classList.add('me-5');
    } else {
        suckless_description.classList.remove('pe-5');
        suckless_description.classList.remove('me-5');
    }
    if (window.innerWidth <= 268) {
        suckless_tag.classList.remove('fs-2');
        suckless_tag.classList.add('fs-6');
        suckless_tag.classList.add('me-0');
    } else {
        suckless_tag.classList.remove('fs-6');
        suckless_tag.classList.remove('me-0');
        suckless_tag.classList.add('fs-2');
    }
}

window.addEventListener('resize', applyResizeSucklessTag);
window.addEventListener('load', applyResizeSucklessTag);
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        document.body.style.paddingTop = `${navbar.offsetHeight}px`;
    }
});

window.addEventListener("resize", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        document.body.style.paddingTop = `${navbar.offsetHeight}px`;
    }
});

var google_map = new ol.layer.Tile({
    visible: true,
    source: new ol.source.XYZ({
        url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
    }),
});

var view = new ol.View({
    projection: 'EPSG:4326',
    center: [-7.651806, 33.546789],
    zoom: 15,
});
const map = new ol.Map({
    target: 'map',
    layers: [google_map],
    view: view,

});




document.addEventListener('DOMContentLoaded', (event) => {
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById('darkModeSwitch');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = localStorage.getItem('bsTheme') || (prefersDarkScheme ? 'dark' : 'light');

    htmlElement.setAttribute('data-bs-theme', currentTheme);
    switchElement.checked = currentTheme === 'dark';

    switchElement.addEventListener('change', function () {
        const newTheme = this.checked ? 'dark' : 'light';
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('bsTheme', newTheme);
    });

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});