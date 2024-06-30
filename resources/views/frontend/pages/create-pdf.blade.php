<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subir PDF</title>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <style>
        section {
            padding: 40px 0;
        }
        .alert {
            display: none;
        }
    </style>
</head>
<body>
    <section>
        <div class="container">
            <h1 class="text-center">Subir PDF</h1>

            <div id="success-message" class="alert alert-success" role="alert"></div>
            <div id="error-message" class="alert alert-danger" role="alert"></div>

            <form id="pdf-form" autocomplete="off" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="mb-3">
                    <label for="nombre_usuario" class="form-label">Ingrese su Nombre y Apellido:</label>
                    <input type="text" id="nombre_usuario" name="nombre_usuario" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="nombre_pdf">Nombre del Diseño:</label>
                    <input type="text" id="nombre_pdf" name="nombre_pdf" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="pdf_file">Archivo PDF:</label>
                    <input type="file" id="pdf_file" name="pdf_file" class="form-control" accept="application/pdf" required>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-success">Guardar PDF</button>
                </div>
            </form>
        </div>
    </section>

    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

    <script>
        document.getElementById('pdf-form').addEventListener('submit', async function(e) {
            e.preventDefault();

            let form = e.target;
            let formData = new FormData(form);

            try {
                let response = await fetch('{{ route('pdf.store') }}', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    },
                    body: formData
                });

                let result = await response.json();

                if (response.ok) {
                    document.getElementById('success-message').style.display = 'block';
                    document.getElementById('success-message').innerText = result.message;

                    // Copiar el enlace al portapapeles
                    let textarea = document.createElement("textarea");
                    textarea.textContent = result.link;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textarea);

                    // Mostrar mensaje de enlace copiado
                    let linkCopiedMessage = document.createElement("div");
                    linkCopiedMessage.className = "alert alert-info";
                    linkCopiedMessage.role = "alert";
                    linkCopiedMessage.innerText = "¡Enlace copiado al portapapeles!";
                    document.getElementById('success-message').appendChild(linkCopiedMessage);

                    // Resetear el formulario
                    form.reset();
                } else {
                    document.getElementById('error-message').style.display = 'block';
                    document.getElementById('error-message').innerText = result.message;
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').innerText = 'Ocurrió un error al subir el PDF.';
            }
        });
    </script>
</body>
</html>
