let indexPacienteSeleccionado;
let pacientes = [];

export function inicializar() {
    refrescarTabla();
}
 
export function refrescarTabla() {
    let url = 'api/paciente/getAllPacientes';
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
    pacientes = data;
    pacientes.forEach(function (paciente) {
        let registro =
                '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                '<td>' + paciente.habitacion + '</td>' +
                '<td>' + paciente.nombrePaciente + '</td>' +
                '<td>' + paciente.medico + '</td>' +
                '<td>' + paciente.diagnostico + '</td>' +
                '<td>' + paciente.especificaciones + '</td>' +
                '<td>' + paciente.estatusPaciente + '</td></tr>';
        cuerpo += registro;
        
    });
    document.getElementById("tblPacientes").innerHTML = cuerpo;
}

export function save() {
    let datos = null;
    let params = null;

    let paciente = new Object();
    paciente = new Object();

    if (document.getElementById("txtIDPaciente").value.trim().length < 1) {
        paciente.IdPersona = 0;
    } else {
        paciente.idPersona = parseInt(document.getElementById("txtIDPaciente").value);
    }
    
    paciente.nombrePaciente = document.getElementById("txtNombre").value;
    paciente.habitacion = document.getElementById("txtHabitacion").value;
    paciente.fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    paciente.edad = document.getElementById("txtEdad").value;
    paciente.medico = document.getElementById("txtMedico").value;
    paciente.diagnostico = document.getElementById("txtDiagnostico").value;
    paciente.alergias = document.getElementById("txtAlergias").value;
    paciente.especificaciones = document.getElementById("txtIndicaciones").value;
    //paciente.estatusPaciente = document.getElementById("txtEstatusPaciente").value; IMPORTANT
    
    var radioHospitalizado = document.getElementById("txtHospitalizado");
    var radioOperacion = document.getElementById("txtOperacion");
    var radioAlta = document.getElementById("txtAlta");
        if (radioHospitalizado.checked) {
            var valorSeleccionado = radioHospitalizado.value;
        } else if (radioOperacion.checked) {
            var valorSeleccionado = radioOperacion.value;
        } else if (radioAlta.checked) {
            var valorSeleccionado = radioAlta.value;
        }
    paciente.estatusPaciente = valorSeleccionado;
    
    //paciente.estatusDieta = document.getElementById("txtEstatusDieta").value; IMPORTANT
    var radioValidado = document.getElementById("txtValidado");
    var radioModificado = document.getElementById("txtModificado");
    if (radioValidado.checked) {
        var valorSeleccionadoDieta = radioValidado.value;
    } else if (radioModificado.checked) {
        var valorSeleccionadoDieta = radioModificado.value;
    }
    
    paciente.estatusDieta = valorSeleccionadoDieta;
    paciente.tipoDietaDesayuno = document.getElementById("txtDesayuno").value;
    paciente.descripcionDesayuno = document.getElementById("txtDesayunoDescripcion").value;
    paciente.tipoDietaComida = document.getElementById("txtComida").value;
    paciente.descripcionComida = document.getElementById("txtComidaDescripcion").value;
    paciente.tipoDietaCena = document.getElementById("txtCena").value;
    paciente.descripcionCena = document.getElementById("txtCenaDescripcion").value;

    datos = {
        datosPaciente: JSON.stringify(paciente)
    };

    params = new URLSearchParams(datos);

    fetch("api/paciente/save",
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
                document.getElementById("txtIDPaciente").value = data.idPaciente;
                alert("Datos guardados correctamente");
                refrescarTabla();
            });
}

export function selectPaciente(index) {
    document.getElementById("txtIDPaciente").value = pacientes[index].idPaciente;
    document.getElementById("txtNombre").value = pacientes[index].nombrePaciente;
    document.getElementById("txtHabitacion").value = pacientes[index].habitacion;
    document.getElementById("txtFechaNacimiento").value = pacientes[index].fechaNacimiento;
    document.getElementById("txtEdad").value = pacientes[index].edad;
    document.getElementById("txtMedico").value = pacientes[index].medico;
    document.getElementById("txtDiagnostico").value = pacientes[index].diagnostico;
    document.getElementById("txtIndicaciones").value = pacientes[index].especificaciones;
    document.getElementById("txtAlergias").value = pacientes[index].alergias;
    document.getElementById("txtDesayuno").value = pacientes[index].tipoDietaDesayuno;
    document.getElementById("txtDesayunoDescripcion").value = pacientes[index].descripcionDesayuno;
    document.getElementById("txtComida").value = pacientes[index].tipoDietaComida;
    document.getElementById("txtComidaDescripcion").value = pacientes[index].descripcionComida;
    document.getElementById("txtCena").value = pacientes[index].tipoDietaCena;
    document.getElementById("txtCenaDescripcion").value = pacientes[index].descripcionCena;
    //document.getElementById("txtEstatusPaciente").value = pacientes[index].estatusPaciente;
    //document.getElementById("txtEstatusDieta").value = pacientes[index].estatusDieta;
    
    indexPacienteSeleccionado = index;
}

export function clean() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtHabitacion").value = "";
    document.getElementById("txtFechaNacimiento").value = "";
    document.getElementById("txtEdad").value = "";
    document.getElementById("txtMedico").value = "";
    document.getElementById("txtDiagnostico").value = "";
    document.getElementById("txtIndicaciones").value = "";
    document.getElementById("txtAlergias").value = "";
    document.getElementById("txtDesayuno").value = "";
    document.getElementById("txtDesayunoDescripcion").value = "";
    document.getElementById("txtComida").value = "";
    document.getElementById("txtComidaDescripcion").value = "";
    document.getElementById("txtCena").value = "";
    document.getElementById("txtCenaDescripcion").value = "";
    //document.getElementById("txtEstatusPaciente").value = "";
    //document.getElementById("txtEstatusDieta").value = "";

    indexPacienteSeleccionado = 0;
}

export function searchPaciente() {
    let filtro = document.getElementById("txtBusqueda").value;
    let filtroMinuscula = filtro.toLowerCase();

    if (filtro === "") {

        refrescarTabla();

    } else {
        let resultados = pacientes.filter(element => element.nombrePaciente.toLowerCase() === filtroMinuscula);
        let resultados2 = pacientes.filter(element => element.habitacion.toLowerCase() === filtroMinuscula);
        let resultados3 = pacientes.filter(element => element.fechaNacimiento.toLowerCase() === filtroMinuscula);
        let resultados4 = pacientes.filter(element => element.medico.toLowerCase() === filtroMinuscula);
        let resultados5 = pacientes.filter(element => element.diagnostico.toLowerCase() === filtro);
        let resultados6 = pacientes.filter(element => element.alergias.toLowerCase() === filtro);
        let resultados7 = pacientes.filter(element => element.estatusPaciente.toLowerCase() === filtroMinuscula);
        let resultados8 = pacientes.filter(element => element.estatusDieta.toLowerCase() === filtroMinuscula);

        let cuerpo = "";
        resultados.forEach(function (paciente) {
            let registro =
                '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                '<td>' + paciente.habitacion + '</td>' +
                '<td>' + paciente.nombrePaciente + '</td>' +
                '<td>' + paciente.medico + '</td>' +
                '<td>' + paciente.diagnostico + '</td>' +
                '<td>' + paciente.especificaciones + '</td>' +
                '<td>' + paciente.estatusPaciente + '</td></tr>';
            cuerpo += registro;
        });

        resultados2.forEach(function (paciente) {
            let registro =
                    '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                    '<td>' + paciente.habitacion + '</td>' +
                    '<td>' + paciente.nombrePaciente + '</td>' +
                    '<td>' + paciente.medico + '</td>' +
                    '<td>' + paciente.diagnostico + '</td>' +
                    '<td>' + paciente.especificaciones + '</td>' +
                    '<td>' + paciente.estatusPaciente + '</td></tr>';
            cuerpo += registro;
        });


        resultados3.forEach(function (paciente) {
            let registro =
                    '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                    '<td>' + paciente.habitacion + '</td>' +
                    '<td>' + paciente.nombrePaciente + '</td>' +
                    '<td>' + paciente.medico + '</td>' +
                    '<td>' + paciente.diagnostico + '</td>' +
                    '<td>' + paciente.especificaciones + '</td>' +
                    '<td>' + paciente.estatusPaciente + '</td></tr>';
            cuerpo += registro;
        });


        resultados4.forEach(function (paciente) {
        let registro =
                    '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                    '<td>' + paciente.habitacion + '</td>' +
                    '<td>' + paciente.nombrePaciente + '</td>' +
                    '<td>' + paciente.medico + '</td>' +
                    '<td>' + paciente.diagnostico + '</td>' +
                    '<td>' + paciente.especificaciones + '</td>' +
                    '<td>' + paciente.estatusPaciente + '</td></tr>';
            cuerpo += registro;
        });


        resultados5.forEach(function (paciente) {
        let registro =
                    '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                    '<td>' + paciente.habitacion + '</td>' +
                    '<td>' + paciente.nombrePaciente + '</td>' +
                    '<td>' + paciente.medico + '</td>' +
                    '<td>' + paciente.diagnostico + '</td>' +
                    '<td>' + paciente.especificaciones + '</td>' +
                    '<td>' + paciente.estatusPaciente + '</td></tr>';
            cuerpo += registro;
        });


        resultados6.forEach(function (paciente) {
            let registro =
                    '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                    '<td>' + paciente.habitacion + '</td>' +
                    '<td>' + paciente.nombrePaciente + '</td>' +
                    '<td>' + paciente.medico + '</td>' +
                    '<td>' + paciente.diagnostico + '</td>' +
                    '<td>' + paciente.especificaciones + '</td>' +
                    '<td>' + paciente.estatusPaciente + '</td></tr>';
            cuerpo += registro;
        });


        resultados7.forEach(function (paciente) {
            let registro =
                    '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                    '<td>' + paciente.habitacion + '</td>' +
                    '<td>' + paciente.nombrePaciente + '</td>' +
                    '<td>' + paciente.medico + '</td>' +
                    '<td>' + paciente.diagnostico + '</td>' +
                    '<td>' + paciente.especificaciones + '</td>' +
                    '<td>' + paciente.estatusPaciente + '</td></tr>';
            cuerpo += registro;
        });


        resultados8.forEach(function (paciente) {
        let registro =
                '<tr onclick="moduloRegistro.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
                '<td>' + paciente.habitacion + '</td>' +
                '<td>' + paciente.nombrePaciente + '</td>' +
                '<td>' + paciente.medico + '</td>' +
                '<td>' + paciente.diagnostico + '</td>' +
                '<td>' + paciente.especificaciones + '</td>' +
                '<td>' + paciente.estatusPaciente + '</td></tr>';
            cuerpo += registro;
        });

        console.log(cuerpo);
        document.getElementById("tblPacientes").innerHTML = cuerpo;
    }
}
