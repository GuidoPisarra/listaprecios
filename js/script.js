document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            video.srcObject = stream;
            const barcodeDetector = new BarcodeDetector({ formats: ['qr_code', 'ean_13'] });

            const checkForCodes = async () => {
                try {
                    const codes = await barcodeDetector.detect(video);
                    if (codes && codes.length > 0) {
                        // Maneja los códigos encontrados aquí
                        console.log('Códigos encontrados:', codes);
                    }
                } catch (error) {
                    console.error('Error al detectar códigos:', error);
                }
                requestAnimationFrame(checkForCodes);
            };

            checkForCodes();
        } catch (error) {
            console.error('Error al acceder a la cámara:', error);
        }
    });
});
