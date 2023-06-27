let isAudioAllowed = false;
let isVideoAllowed = false;
let rc = null;
let initStream = null;

setTimeout(async () => {
    await InitDevices();
    HandleSelect();
}, 1000);

const InitDevices = async () => {
    await InitAudioDevice();
    await InitWebcamDevice();

    if (isAudioAllowed && isVideoAllowed) {
        SelectDevices();
        let camera = document.getElementById('initVideoSelect').value;
        await ChangeCamera(camera);
    }
}

const InitAudioDevice = async () => {
    await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(async (stream) => {
            await EnumerateAudioDevices(stream);
            isAudioAllowed = true;
        })
        .catch(() => {
            isAudioAllowed = false;
        });
}

const EnumerateAudioDevices = async (stream) => {
    await navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
            devices.forEach((device) => {
                let el = null;
                let eli = null;
                if ('audioinput' === device.kind) {
                    el = 'microphoneSelect';
                    eli = 'initMicrophoneSelect';
                } else if ('audiooutput' === device.kind) {
                    el = 'speakerSelect';
                    eli = 'initSpeakerSelect';
                }
                if (!el) return;
                AddChild(device, [el, eli]);
            });
        })
        .then(() => {
            StopTracks(stream);
        });
}

const StopTracks = (stream) => {
    stream.getTracks().forEach((track) => {
        track.stop();
    });
}

const InitWebcamDevice = async () => {
    await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(async (stream) => {
            await EnumerateVideoDevices(stream);
            isVideoAllowed = true;
        })
        .catch(() => {
            isVideoAllowed = false;
        });
}

const EnumerateVideoDevices = async (stream) => {
     await navigator.mediaDevices
        .enumerateDevices()
        .then((devices) =>
            devices.forEach((device) => {
                let el = null;
                let eli = null;
                if ('videoinput' === device.kind) {
                    el = 'videoSelect';
                    eli = 'initVideoSelect';
                }
                if (!el) return;
                AddChild(device, [el, eli]);
            }),
        )
        .then(() => {
            StopTracks(stream);
        });
}

const AddChild = (device, els) => {
    let kind = device.kind;
    for (let el of els) {
        let option = document.createElement('option');
        option.value = device.deviceId;
        switch (kind) {
            case 'videoinput':
                option.innerText = `📹 ` + device.label || `📹 camera ${el.length + 1}`;
                break;
            case 'audioinput':
                option.innerText = `🎤 ` + device.label || `🎤 microphone ${el.length + 1}`;
                break;
            case 'audiooutput':
                option.innerText = `🔈 ` + device.label || `🔈 speaker ${el.length + 1}`;
                break;
            default:
                break;
        }
        document.getElementById(el).appendChild(option);
    }
}

const SelectDevices = () => {
    Hide('loadingDiv');

    document.body.style.background = 'var(--body-bg)';

    const initUser = document.getElementById('initUser');
    initUser.classList.toggle('hidden');

    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: 'radial-gradient(#393939, #000000)',
        title: 'Chọn thiết bị',
        input: 'text' ,
        inputValue: document.getElementById('userFullName').value,
        inputAttributes: {
            disabled: true
        },
        html: initUser,
        confirmButtonText: `Vào phòng`,
        showClass: {
            popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
        },
    })
    .then(() => {
        if (initStream && !joinRoomWithScreen) {
            stopTracks(initStream);
            hide(initVideo);
        }
        getPeerInfo();
        joinRoom(peer_name, room_id);
    });
}

const ChangeCamera = async (deviceId) => {
    if (initStream) {
        StopTracks(initStream);
        Show('initVideo');
    }
    const videoConstraints = {
        audio: false,
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            deviceId: deviceId,
            aspectRatio: 1.777,
            frameRate: {
                min: 5,
                ideal: 15,
                max: 30,
            },
        },
    };
    navigator.mediaDevices
        .getUserMedia(videoConstraints)
        .then((camStream) => {
            let video = document.getElementById('initVideo')
            video.className = 'mirror';
            video.srcObject = camStream;
            initStream = camStream;
        })
        .catch((err) => {
            console.error('[Error] changeCamera', err);
        });
}

const HandleSelect = () => {
    let videoSelect = document.getElementById('initVideoSelect');
    videoSelect.addEventListener('change', async () => {
        let deviceId = videoSelect.value;
        await ChangeCamera(deviceId);
    });
}