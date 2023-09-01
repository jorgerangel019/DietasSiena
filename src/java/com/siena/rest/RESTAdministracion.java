package com.siena.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.siena.controlador.ControllerAdministracion;
import com.siena.model.Usuario;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author Ing Jorge Rangel
 */
@Path("usuario")
public class RESTAdministracion {
    
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosUsuario") @DefaultValue("") String datosUsuario){ //QueryParam no sirve para POST(Solo sirve para GET), y tenemos que utilizar FormParam cuando se utiliza POST
        
        String out = null;
        Gson gson = new Gson();
        Usuario usu = null; //Generamos
        ControllerAdministracion ca = new ControllerAdministracion(); //Controler es donde se hace todas las funciones
        
        try{
          usu = gson.fromJson(datosUsuario, Usuario.class); //Ocupamos gson para convertirlo Gson tiene una funcion que permite convertir una variable a una clase
            if (usu.getIdUsuario() == 0) { // Realizamos un if para saber si existe el empledo, de la clase empleado tomamos el id y lo comparamos con 0
                ca.insert(usu); //si es igual a 0 insertamos el empleado
            }
            else
            {
                ca.update(usu); //Y si la id no es 0 se actualiza el Empleado
            }
            out = gson.toJson(usu); //Devolvemos una respuesta y se compierte a un String
        }
        catch(JsonParseException jpe){
            jpe.printStackTrace();
            out = "{\"exception\": \"%?\"}";
            out = String.format(out, "Formato de Datos Incorrecta");
        }
        catch(Exception e){
            e.printStackTrace();
            out = "{\"exception\": \"%s\"}";
            out = String.format(out, e.toString());
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @GET
    @Path("getAllUsuarios")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsuarios(String filtro) {
      String out = null;
            ControllerAdministracion ca= new ControllerAdministracion();
            Gson gs = new Gson();
        try {
           List<Usuario> Usuario = ca.getAllUsuarios(filtro);
           out= gs.toJson(Usuario);
        
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\""+e.toString()+"\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
}
