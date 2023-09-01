let moduloRegistro;
let moduloAtencion;
let moduloAdministracion;

function cargarModuloRegistro(){
fetch("modules/registroDietas/view_dietas.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modules/registroDietas/controller_registroDietas.js").then(
                        function(controller){
                                moduloRegistro = controller;
                                moduloRegistro.inicializar(); //Mandamos llamar la función inicializar
                        }
                );
                }
        );
        }

function cargarModuloAtencion(){
fetch("modules/atencionDietas/view_atencionDietas.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipalNutricion").innerHTML = html;
                import ("../modules/atencionDietas/controller_atencionDietas.js").then(
                        function(controller){
                                moduloAtencion = controller;
                                moduloAtencion.inicializar();
                        }
                );
                }
        );
        }

function cargarModuloAdministracion(){
fetch("modules/administracion/view_administracion.html")
        .then(
                function(response){
                return response.text();
                }
        )
        .then(
                function(html){
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import ("../modules/administracion/controller_administracion.js").then(
                        function(controller){
                            moduloAdministracion = controller;
                            moduloAdministracion.inicializar();
                        }
                );
                }
        );
    }    


