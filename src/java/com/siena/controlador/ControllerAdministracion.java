package com.siena.controlador;

import com.siena.bd.ConexionMySQL;
import com.siena.model.Usuario;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Ing Jorge Rangel
 */
public class ControllerAdministracion {
    public int insert(Usuario u) throws Exception
    {
        String sql =    "{call insertarUsuario(?, ?, ?, " +
                                               "?)}";
        int idUsuarioGenerado = -1;
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        Connection conn = connMySQL.open();
        
        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setString(1, u.getNombre());
        cstmt.setString(2, u.getContrasenia());
        cstmt.setString(3, u.getRol());
        
        cstmt.registerOutParameter(4, Types.INTEGER);
        
        cstmt.executeUpdate();
        
        idUsuarioGenerado = cstmt.getInt(4);
        
        u.setIdUsuario(idUsuarioGenerado);
        
        cstmt.close();
        connMySQL.close();
        
        return idUsuarioGenerado;
    }
    
    public void update(Usuario u) throws Exception
    {
        String sql =    "{call actualizarUsuario(?, ?, ?, " +
                                               "?)}";
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        Connection conn = connMySQL.open();
        
        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setString(1, u.getNombre());
        cstmt.setString(2, u.getContrasenia());
        cstmt.setString(3, u.getRol());
        
        cstmt.setInt(4, u.getIdUsuario());
        
        cstmt.executeUpdate();
        
        cstmt.close();
        connMySQL.close();        
    }
    
    public List<Usuario> getAllUsuarios(String filtro) throws Exception {
        String sql = "SELECT * FROM usuario";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();

        List<Usuario> usuario = new ArrayList<>();

        while (rs.next()) {
            usuario.add(fillUsuario(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return usuario;
    }
    
    private Usuario fillUsuario(ResultSet rs) throws Exception {
        Usuario u = new Usuario();
        
        u.setIdUsuario(rs.getInt("idUsuario"));
        u.setNombre(rs.getString("nombre"));
        u.setContrasenia(rs.getString("contrasenia"));
        u.setRol(rs.getString("rol"));

        return u;
    }
    
}
