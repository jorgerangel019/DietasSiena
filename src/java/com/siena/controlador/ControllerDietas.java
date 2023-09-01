package com.siena.controlador;

import com.siena.bd.ConexionMySQL;
import com.siena.model.Paciente;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

/**
 *
 * @author Ing Jorge Rangel
 */
public class ControllerDietas {
    
    public int insert(Paciente p) throws Exception
    {
        String sql =    "{call insertarPaciente(?, ?, ?, ?, ?, ?, ?, " +
                                               "?, ?, ?, ?, ?, ?, ?, " +
                                               "?, ?, ?," +
                                               "?)}";  
        
        int idPacienteGenerado = -1;
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setString(1, p.getNombrePaciente());
        cstmt.setString(2, p.getHabitacion());
        cstmt.setString(3, p.getFechaNacimiento());
        cstmt.setString(4, p.getEdad());
        cstmt.setString(5, p.getMedico());
        cstmt.setString(6, p.getDiagnostico());
        cstmt.setString(7, p.getAlergias());
        
        LocalDate fechaActual = LocalDate.now();
        cstmt.setObject(8, fechaActual);
        //cstmt.setString(8, p.getFechaRegistro());
        
        cstmt.setString(9, p.getEspecificaciones());
        cstmt.setString(10, p.getEstatusPaciente());
        cstmt.setString(11, p.getEstatusDieta());
        cstmt.setString(12, p.getTipoDietaDesayuno());
        cstmt.setString(13, p.getDescripcionDesayuno());
        cstmt.setString(14, p.getTipoDietaComida());
        cstmt.setString(15, p.getDescripcionComida());
        cstmt.setString(16, p.getTipoDietaCena());
        cstmt.setString(17, p.getDescripcionCena());
        
        cstmt.registerOutParameter(18, Types.INTEGER);
        
        cstmt.executeUpdate();
        
        idPacienteGenerado = cstmt.getInt(18);
        
        p.setIdPaciente(idPacienteGenerado);
        cstmt.close();
        connMySQL.close();
        return idPacienteGenerado;
    }
    
    public void update(Paciente p) throws Exception
    {
        //Definimos la consulta SQL que invoca al Stored Procedure:
        String sql =    "{call actualizarPaciente(  ?, ?, ?, ?, ?, ?, ?, " + //Datos Personales
                                                   "?, ?, ?, ?, ?, ?, ?, " +
                                                   "?," +
                                                   "?)}"; // IDs
        
        
        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        
        //Con este objeto invocaremos al StoredProcedure:
        CallableStatement cstmt = conn.prepareCall(sql);
        
        
        //Establecemos los parámetros de los datos personales en el orden
        //en que los pide el procedimiento almacenado, comenzando en 1:
        cstmt.setString(1, p.getNombrePaciente());
        cstmt.setString(2, p.getHabitacion());
        cstmt.setString(3, p.getFechaNacimiento());
        cstmt.setString(4, p.getEdad());
        cstmt.setString(5, p.getMedico());
        cstmt.setString(6, p.getDiagnostico());
        cstmt.setString(7, p.getAlergias());
        cstmt.setString(8, p.getEspecificaciones());
        cstmt.setString(9, p.getEstatusPaciente());
        cstmt.setString(10, p.getEstatusDieta());
        cstmt.setString(11, p.getTipoDietaDesayuno());
        cstmt.setString(12, p.getDescripcionDesayuno());
        cstmt.setString(13, p.getTipoDietaComida());
        cstmt.setString(14, p.getDescripcionComida());
        cstmt.setString(15, p.getTipoDietaCena());
        cstmt.setString(16, p.getDescripcionCena());
        
        cstmt.setInt(17, p.getIdPaciente());

        //Ejecutamos el Stored Procedure:
        cstmt.executeUpdate();
        
        cstmt.close();
        connMySQL.close();        
    }
    
    public List<Paciente> getAllPacientes(String filtro) throws Exception
    {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM v_pacientes";
        
        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        
        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        
        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        
        List<Paciente> pacientes = new ArrayList<>();
        
        while (rs.next())
            pacientes.add(fill(rs));
        
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        return pacientes;
    }
    
    private Paciente fill(ResultSet rs) throws Exception
    {
        Paciente p = new Paciente();
        
        p.setIdPaciente(rs.getInt("idPaciente"));
        
        p.setNombrePaciente(rs.getString("nombrePaciente"));
        p.setHabitacion(rs.getString("habitacion"));
        p.setFechaNacimiento(rs.getString("fechaNacimiento"));
        p.setEdad(rs.getString("edad"));
        p.setMedico(rs.getString("medico"));
        p.setDiagnostico(rs.getString("diagnostico"));
        p.setAlergias(rs.getString("alergias"));
        p.setFechaRegistro(rs.getString("fechaRegistro"));
        p.setEspecificaciones(rs.getString("especificaciones"));
        p.setEstatusPaciente(rs.getString("estatusPaciente"));
        p.setEstatusDieta(rs.getString("estatusDieta"));
        p.setTipoDietaDesayuno(rs.getString("tipoDietaDesayuno"));
        p.setDescripcionDesayuno(rs.getString("descripcionDesayuno"));
        p.setTipoDietaComida(rs.getString("tipoDietaComida"));
        p.setDescripcionComida(rs.getString("descripcionComida"));
        p.setTipoDietaCena(rs.getString("tipoDietaCena"));
        p.setDescripcionCena(rs.getString("descripcionCena"));
        
        return p;
    }
    
}
