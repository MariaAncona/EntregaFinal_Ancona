
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const nombre = document.getElementById('nombre').value;

        Swal.fire({
            title: 'Información enviada',
            text: `Gracias, ${nombre}! en breve nos pondremos en contacto contigo.`,
            confirmButtonText: 'Aceptar',
            background: '#f9f9f9db',
            confirmButtonColor: '#78c478',
        });

        form.reset();
    });
});
