package com.siena.rest;

import com.google.gson.Gson;
import com.siena.controlador.ControllerAtencion;
import com.siena.controlador.ControllerDietas;
import com.siena.model.Paciente;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author Inge Jorge Rangel
 */
@Path("paciente")
public class RESTAtencion {
    @GET
    @Path("getAllPaciente")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPaciente(String filtro) {
      String out = null;
            ControllerAtencion ca= new ControllerAtencion();
            Gson gs = new Gson();
        try {
           List<Paciente> Paciente = ca.getAllPaciente(filtro);
           out= gs.toJson(Paciente);
        
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\""+e.toString()+"\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
