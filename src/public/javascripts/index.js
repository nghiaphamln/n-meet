document.getElementById('roomName').onkeyup = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        joinRoom();
    }
};

function genRoom() {
    document.getElementById('roomName').value = getUUID4();
}

function getUUID4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16),
    );
}

function joinRoom() {
    const roomName = filterXSS(document.getElementById('roomName').value);
    if (roomName) {
        window.location.href = '/join/' + roomName;
    } else {
        alert('Tên phòng rỗng, vui lòng nhập tên phòng!');
    }
}