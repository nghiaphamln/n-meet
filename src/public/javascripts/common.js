function Hide(id) {
    let el = document.getElementById(id);
    if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
    }
}

function Show(id) {
    let el = document.getElementById(id);
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
    }
}

function Disable(elem, disabled) {
    elem.disabled = disabled;
}

function SetColor(id, color) {
    let el = document.getElementById(id);
    el.style.color = color;
}