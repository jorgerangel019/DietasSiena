let indexUsuarioSeleccionado;
let usuarios = [];

export function inicializar() {
    refrescarTabla();
} 

export function refrescarTabla() {
    let url = 'api/usuario/getAllUsuarios';
    fetch(url)
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    alert("Error interno del servidor");
                    return;
                }

                if (data.error != null) {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorsec != null) {
                    Swal.fire('', data.errorsec, 'error');
                    window.location.replace('index.html');
                    return;
                }
                cargarTabla(data);
            });
}

export function cargarTabla(data) {
    let cuerpo = "";
    usuarios = data;
    usuarios.forEach(function (usuario) {
        let registro =
                '<tr onclick="moduloAdministracion.selectUsuario(' + usuarios.indexOf(usuario) + ');">' +
                '<td>' + usuario.idUsuario + '</td>' +
                '<td>' + usuario.nombre + '</td>' +
                '<td>' + usuario.rol + '</td></tr>';
        cuerpo += registro;
        
    });
    document.getElementById("tblUsuarios").innerHTML = cuerpo;
}

export function save() {
    let datos = null;
    let params = null;

    let usuario = new Object();
    usuario = new Object();

    if (document.getElementById("txtNewID").value.trim().length < 1) {
        usuario.IdUsuario = 0;
    } else {
        usuario.idUsuario = parseInt(document.getElementById("txtNewID").value);
    }
    usuario.nombre = document.getElementById("txtNewUser").value;
    usuario.contrasenia = document.getElementById("txtNewPassword").value;
    usuario.rol = document.getElementById("txtNewRol").value;

    datos = {
        datosUsuario: JSON.stringify(usuario)
    };

    params = new URLSearchParams(datos);

    fetch("api/usuario/save",
            {method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    //Swal.fire('', 'Error interno del servidor. Intente nuevamente mas tarde.', 'error');
                    alert("Error interno del servidor. Intente nuevamente mas tarde");
                    return;
                }
                if (data.error != null) {
                    //Swal.fire('', data.error, 'warning');
                    alert("error");
                    return;
                }
                if (data.errorperm != null) {
                    //Swal.fire('', 'No tiene permiso para realizae esta operacion.', 'warning');
                    alert("No tiene permiso para realizae esta operacion");
                    return;
                }
                document.getElementById("txtNewID").value = data.idUsuario;
                alert("Datos guardados correctamente");
                refrescarTabla();
            });
}



export function clean() {
    document.getElementById("txtNewID").value = "";
    document.getElementById("txtNewUser").value = "";
    document.getElementById("txtNewPassword").value = "";
    document.getElementById("txtNewRol").value = "";


    //document.getElementById("txtNombre").focus();
    //document.getElementById("btnUpdate").classList.add("disabled");
    //document.getElementById("btnDelete").classList.add("disabled");
    //document.getElementById("btnReactivar").classList.add("disabled");
    //document.getElementById("btnAdd").classList.remove("disabled");
    indexUsuarioSeleccionado = 0;
}

export function selectUsuario(index) {
    document.getElementById("txtNewID").value = usuarios[index].idUsuario;
    document.getElementById("txtNewUser").value = usuarios[index].nombre;
    document.getElementById("txtNewPassword").value = usuarios[index].contrasenia;
    document.getElementById("txtNewRol").value = usuarios[index].rol;

    //document.getElementById("btnUpdate").classList.remove("disabled");
    //document.getElementById("btnDelete").classList.remove("disabled");
    //document.getElementById("btnAdd").classList.add("disabled");
    //document.getElementById("btnReactivar").classList.remove("disabled");
    indexUsuarioSeleccionado = index;
}
