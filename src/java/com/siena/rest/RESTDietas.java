package com.siena.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.siena.controlador.ControllerDietas;
import com.siena.model.Paciente;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author Ing Jorge Rangel
 */
@Path("paciente")
public class RESTDietas {
    
//    @POST
//    @Path("save")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response save(@QueryParam("nombre") @DefaultValue("") String nombrePaciente,
//                         @QueryParam("txtHabitacion") @DefaultValue("") String habitacion,
//                         @QueryParam("txtFechaNacimiento") @DefaultValue("") String fechaNacimiento,
//                         @QueryParam("txtEdad") @DefaultValue("") String edad,
//                         @QueryParam("txtMedico") @DefaultValue("") String medico,
//                         @QueryParam("txtDiagnostico") @DefaultValue("") String diagnostico,
//                         @QueryParam("txtAlergias") @DefaultValue("") String alergias,
//                         @QueryParam("txtIndicaciones") @DefaultValue("") String especificaciones,
//                         @QueryParam("txtEstatusPaciente") @DefaultValue("") String estatusPaciente,
//                         @QueryParam("txtEstatusDieta") @DefaultValue("") String estatusDieta,
//                         @QueryParam("txtDesayuno") @DefaultValue("") String tipoDietaDesayuno,
//                         @QueryParam("txtDesayunoDescripcion") @DefaultValue("") String descripcionDesayuno,
//                         @QueryParam("txtComida") @DefaultValue("") String tipoDietaComida,
//                         @QueryParam("txtComidaDescripcion") @DefaultValue("") String descripcionComida,
//                         @QueryParam("txtCena") @DefaultValue("") String tipoDietaCena,
//                         @QueryParam("txtCenaDescripcion") @DefaultValue("") String descripcionCena){
//        
//        String out = null;
//        Gson gson = new Gson();
//        Paciente pac = new Paciente();
//        ControllerDietas cd = new ControllerDietas();
//        
//        pac.setNombrePaciente(nombrePaciente);
//        pac.setHabitacion(habitacion);
//        pac.setFechaNacimiento(fechaNacimiento);
//        pac.setEdad(edad);
//        pac.setMedico(medico);
//        pac.setDiagnostico(diagnostico);
//        pac.setAlergias(alergias);
//        pac.setEspecificaciones(especificaciones);
//        pac.setEstatusPaciente(estatusPaciente);
//        pac.setEstatusDieta(estatusDieta);
//        pac.setTipoDietaDesayuno(tipoDietaDesayuno);
//        pac.setDescripcionDesayuno(descripcionDesayuno);
//        pac.setTipoDietaComida(tipoDietaComida);
//        pac.setDescripcionComida(descripcionComida);
//        pac.setTipoDietaCena(tipoDietaCena);
//        pac.setDescripcionCena(descripcionCena);
//        
//        try{
//
//            if (pac.getIdPaciente() == 0) {
//                cd.insert(pac);
//            }
//            else
//            {
//                cd.update(pac);
//            }
//            out = gson.toJson(pac); 
//            
//        }
//        catch(JsonParseException jpe){
//            jpe.printStackTrace();
//            out = "{\"exception\": \"Formato de Datos Incorrecta.\"}\n";
//        }
//        catch(Exception e){
//            e.printStackTrace();
//            out = "{\"exception\" : \"%s\"}\n";
//            out = String.format(out, e.toString());
//        }
//        return Response.status(Response.Status.OK).entity(out).build();
//    }
    
    
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosPaciente") @DefaultValue("") String datosPaciente){ 
        
        String out = null;
        Gson gson = new Gson();
        Paciente pac = null;
        ControllerDietas cd = new ControllerDietas();
        
        try{
          pac = gson.fromJson(datosPaciente, Paciente.class);
            if (pac.getIdPaciente() == 0) {
                cd.insert(pac);
            }
            else
            {
                cd.update(pac);
            }
            out = gson.toJson(pac); 
        }
        catch(JsonParseException jpe){
            jpe.printStackTrace();
            out = "{\"exception\": \"%s\"}";
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
    @Path("getAllPacientes")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPacientes(String filtro) {
      String out = null;
            ControllerDietas ca= new ControllerDietas();
            Gson gs = new Gson();
        try {
           List<Paciente> Paciente = ca.getAllPacientes(filtro);
           out= gs.toJson(Paciente);
        
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\""+e.toString()+"\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
}
