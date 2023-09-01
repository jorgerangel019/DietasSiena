/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.siena.controlador;

import com.siena.bd.ConexionMySQL;
import com.siena.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 *
 * @author 52477
 */
public class ControllerLogin {
    public Usuario login(String usuario, String contrasenia) throws Exception
    {
        String sql = "SELECT * FROM v_usuarios VU WHERE VU.nombre = ? AND VU.contrasenia = ?;";
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        Connection conn = connMySQL.open();
        
        PreparedStatement pstmt = conn.prepareStatement(sql);
        
        ResultSet rs = null;
        pstmt.setString(1, usuario);
        pstmt.setString(2, contrasenia);
        
        rs = pstmt.executeQuery();
        
        Usuario usu = null;
        
        if (rs.next()){
            usu = fill(rs);
        }
        
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        return usu;
    }
    
    private Usuario fill(ResultSet rs) throws Exception
    {
        Usuario u = new Usuario();               
        
        u.setIdUsuario(rs.getInt("idUsuario"));
        u.setNombre(rs.getString("nombre"));
        u.setContrasenia(rs.getString("contrasenia"));
        u.setRol(rs.getString("rol"));
        u.setLastToken(rs.getString("lastToken"));
        u.setDateLastToken(rs.getString("dateLastToken"));
        
        return u;
    }
    
    public void delete(int idUsuario,String lastToken ) throws Exception
    {
        String sql = "Update usuario set lastToken = ? where idUsuario = ?";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement cstmt = conn.prepareStatement(sql);
        
        cstmt.setString(1, lastToken);
        cstmt.setInt(2, idUsuario);
        cstmt.executeUpdate();
        cstmt.close();
        connMySQL.close();
    }
    
    public boolean validarToken(String t) throws Exception{
        boolean r=false;
        String query = "SELECT * FROM v_usuarios WHERE lastToken='"+t+"'";
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection connection = connMySQL.open();
        Statement stmt = connection.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        
        if (rs.next())
            r=true;
        
        stmt.close();
        connection.close();
        connMySQL.close();
        return r;
    }
    
    public boolean eliminarToken(Usuario u) throws Exception{
        boolean r = false;
        
        String query = "UPDATE usuario SET lastToken = '' WHERE idUsuario = ?";
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection connection = connMySQL.open();
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, u.getIdUsuario());
        preparedStatement.execute();
        r=true;
        preparedStatement.close();
        connection.close();
        connMySQL.close();
        return r;
    }
}
