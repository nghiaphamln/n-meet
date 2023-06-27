let isAudioAllowed = false;
let isVideoAllowed = false;

setTimeout(async () => {
    await InitDevices();
}, 1000);

const InitDevices = async () => {
    await InitAudioDevice();
    await InitWebcamDevice();
}

const InitAudioDevice = async () => {
    await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            EnumerateAudioDevices(stream);
            isAudioAllowed = true;
        })
        .catch(() => {
            isAudioAllowed = false;
        });
}

const EnumerateAudioDevices = (stream) => {
    navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
            devices.forEach((device) => {
                console.log(device);
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
        .then((stream) => {
            EnumerateVideoDevices(stream);
            isVideoAllowed = true;
        })
        .catch(() => {
            isVideoAllowed = false;
        });
}

const EnumerateVideoDevices = (stream) => {
    navigator.mediaDevices
        .enumerateDevices()
        .then((devices) =>
            devices.forEach((device) => {
                console.log(device)
            }),
        )
        .then(() => {
            StopTracks(stream);
        });
}
