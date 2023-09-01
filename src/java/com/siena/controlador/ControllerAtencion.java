package com.siena.controlador;

import com.siena.bd.ConexionMySQL;
import com.siena.model.Paciente;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Ing Jorge Rangel
 */
public class ControllerAtencion {
    
    public List<Paciente> getAllPaciente(String filtro) throws Exception
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
