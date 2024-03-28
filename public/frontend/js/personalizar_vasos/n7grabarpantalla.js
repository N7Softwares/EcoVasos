const $button = document.querySelector('#capturadoraPantalla');

$button.addEventListener('click', async () => {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' }
    });

    const mediarecorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm;codecs=h264',
        videoBitsPerSecond : 8000000, // Ajusta la tasa de bits de video según tus necesidades
        frameRate: { ideal: 60, min: 30 } // Establece el framerate deseado
    });

    mediarecorder.start();

    // Establecer el temporizador para detener la grabación después de 12 segundos
    setTimeout(() => {
        mediarecorder.stop();
    }, 12000);

    mediarecorder.addEventListener("dataavailable", (e) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(e.data);
        link.download = "captura.webm";
        link.click();

        // Cerrar la ventana de "dejar de compartir" después de descargar el video
        setTimeout(() => {
            mediaStream.getVideoTracks()[0].stop();
        }, 1000); // Esperar un segundo antes de cerrar la ventana
    });
});
