package com.bsc.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import org.apache.shiro.codec.Base64;

/**
 * HTTP BASIC VALIDATOR
 * 
 * @author zhangx
 * 
 */
public class BasicAuthTest {
	private final String baseUrl;
	private final String username;
	private final String password;

	public BasicAuthTest(String baseUrl, String username, String password) {
		this.baseUrl = baseUrl;
		this.username = username;
		this.password = password;
	}

	public String getRESTResponse(String accountId) {
		return getDataFromServer("user/" + accountId);
	}

	private String getDataFromServer(String path) {
		StringBuilder sb = new StringBuilder();
		try {
			URL url = new URL(baseUrl + path);
			URLConnection urlConnection = setUsernamePassword(url);
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					urlConnection.getInputStream()));
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
			reader.close();

			return sb.toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private URLConnection setUsernamePassword(URL url) throws IOException {
		URLConnection urlConnection = url.openConnection();
		String authString = username + ":" + password;
		String authStringEnc = new String(Base64.encode(authString.getBytes()));
		urlConnection.setRequestProperty("Authorization", "Basic "
				+ authStringEnc);
		return urlConnection;
	}

	public static void main(String[] args) {

		String url = "http://192.168.0.50:8080/his/cxf/rest/";
		String username = "tomcat";
		String password = "tomcat";
		BasicAuthTest auth = new BasicAuthTest(url, username, password);
		System.out.println(auth.getRESTResponse("0001"));

	}
}
