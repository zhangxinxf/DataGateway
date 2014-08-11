package com.bsc.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bsc.exception.DAOException;

/**
 * DB测试类
 * 
 * @author zhangx
 * 
 */
public class DBUtils {

	private static final Logger log = LoggerFactory.getLogger(DBUtils.class
			.getSimpleName());

	private static Map<String, String> driverMap = new HashMap<String, String>();

	private static Map<String, String> urlMap = new HashMap<String, String>();

	static {
		driverMap.put("MYSQL", "com.mysql.jdbc.Driver");
		driverMap.put("SQLSERVER",
				"com.microsoft.sqlserver.jdbc.SQLServerDriver");
		driverMap.put("ORACLE", "oracle.jdbc.driver.OracleDriver");

		urlMap.put("MYSQL", "jdbc:mysql://%s:3306/%s");
		urlMap.put("SQLSERVER", "jdbc:sqlserver://%s:1433; DatabaseName=%s");
		urlMap.put("ORACLE", "jdbc:oracle:thin:@%s:1521:%s");
	}

	public static Connection getConnection(String type, String ip,
			String dbname, String username, String password)
			throws DAOException {
		Connection conn = null;
		try {
			String url = String.format(urlMap.get(type), ip, dbname);
			Class.forName(driverMap.get(type));
			conn = DriverManager.getConnection(url, username, password);
		} catch (ClassNotFoundException e) {
			log.error("not found driverClass!", e);
			throw new DAOException("not found driverClass!", e);
		} catch (SQLException e) {
			log.error("connection db exception!", e);
			throw new DAOException("connection db exception!", e);
		}
		return conn;
	}

	public static void closeConnection(Map<Integer, Connection> conns)
			throws SQLException {
		for (Connection conn : conns.values()) {
			try {
				if (conn != null)
					conn.close();
			} catch (SQLException e) {
				log.error("connection db exception!", e);
				throw new SQLException();
			}
		}
	}
}
