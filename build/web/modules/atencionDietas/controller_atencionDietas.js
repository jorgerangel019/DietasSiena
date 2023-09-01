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
                '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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

export function selectPaciente(index) {
    
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
    document.getElementById("txtEstatusPaciente").value = pacientes[index].estatusPaciente;
    
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
    document.getElementById("txtEstatusPaciente").value = "";
    document.getElementById("txtEstatusDieta").value = "";

    indexPacienteSeleccionado = 0;
}

export function buscarPaciente(){
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
                '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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
                    '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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
                    '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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
                    '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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
                    '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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
                    '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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
                    '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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
                '<tr onclick="moduloAtencion.selectPaciente(' + pacientes.indexOf(paciente) + ');">' +
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
