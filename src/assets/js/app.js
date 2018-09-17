import '../scss/style.scss';
const p = document.createElement('p');
document.addEventListener('DOMContentLoaded', () => {
    p.innerHTML = 'Running JS!!';
    document.querySelector('footer').parentNode.insertBefore(p, document.querySelector('footer'));
});
