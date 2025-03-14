document.getElementById("download-pdf").addEventListener("click", function () {
    // Asegurar que jsPDF está disponible
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("jsPDF no está definido. Revisa la importación.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Capturar el lienzo como imagen
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        console.error("No se encontró el canvas del modelo 3D.");
        return;
    }

    const imgData = canvas.toDataURL("image/png"); // Convertir canvas a imagen PNG

    // Agregar título y descripción
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Modelo 3D", 105, 20, null, null, "center");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Previsualización 3D powered by Ecoingenio.", 105, 30, null, null, "center");

    // Insertar la imagen del modelo 3D en el PDF
    doc.addImage(imgData, "PNG", 15, 40, 180, 90); // Ajusta la posición y tamaño

    // Guardar el PDF
    doc.save("modelo3D.pdf");
});

