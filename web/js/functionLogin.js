async function encriptar(texto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function accesar() {
    let usuario = document.getElementById("txtUser").value;
    let contrasenia = document.getElementById("txtPassword").value;

    encriptar(contrasenia).then((texto) => {
        window.console.log(texto);
        let objusuario = new Object();
        objusuario.idUsuario = 0;
        objusuario.nombre = usuario;
        objusuario.contrasenia = texto;
        objusuario.rol = "";
        objusuario.lastToken = "";
        objusuario.dateLastToken = "";
        console.log(objusuario);
        datos = JSON.stringify(objusuario);
        console.log(datos);
        fetch('api/log/in',
                {
                    method: 'POST',
                    headers: {'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: datos
                }).then(response => response.json())
                .then(data => {
                    if (data.exception != null) {
                        alert("Error interno del servidor");
                        //Swal.fire('', 'Error interno del servidor. Intente nuevamente mas tarde.', 'error');
                        return;
                    }
                    if (data.error != null) {
                        alert(data.error);
                        //Swal.fire('', data.error, 'warning');
                        window.location.href = 'http://localhost:8080/DietasSiena/login.html';
                        return;
                    } else {
                        if(usuario.rol == "Enfermeria"){
                            localStorage.setItem('currentUser', JSON.stringify(data));
                            alert("Acceso correcto");
                            window.location.href = 'http://localhost:8080/DietasSiena/';
                        }
                        localStorage.setItem('currentUser', JSON.stringify(data));
                        alert("Acceso correcto");
                        window.location.href = 'http://localhost:8080/DietasSiena/indexNutricion.html';
                        //Swal.fire('¡Acceso Correcto!', 'sucess'); 
                    }
                });
    });
}

function cerrarSesion() {
    let usu = localStorage.getItem('currentUser');
    let usuario = {"usuario": usu};
    let params = new URLSearchParams(usuario);
    console.log(params);
    fetch('api/log/out',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            }).then(response => response.json())
            .then(data => {
                if (data.exception != null) {
                    alert("Error interno del servidor");
                    //Swal.fire('', 'Error interno del servidor. Intente nuevamente mas tarde.', 'error');
                    return;
                }
                if (data.error != null) {
                    alert(data.error);
                    Swal.fire('', data.error, 'warning');
                    return;
                } else {
                    alert("Sesión cerrada con exito");
                    //Swal.fire('¡Sesión cerrada con éxito!', 'sucess');
                    //Swal.fire('', 'sesion cerrada con exito', 'success');
                    //window.location.replace('../login.html');
                    localStorage.removeItem('currentUser');
                    window.location.href = 'http://localhost:8080/DietasSiena/login.html';
                }
                alert("Acceso correcto");
                //Swal.fire('¡Acceso Correcto!', 'sucess');
            });

}
