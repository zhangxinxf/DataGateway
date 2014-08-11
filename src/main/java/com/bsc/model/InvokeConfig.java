package com.bsc.model;

import java.util.ArrayList;
import java.util.List;

public class InvokeConfig extends BaseEntity {

	/**
	 * 方法名称
	 */
	private String methodName;

	/**
	 * 所属应用
	 */
	private DbInfo dbInfo;

	/**
	 * 方法描述
	 */
	private String methodDes;

	private List<JoinTable> tables=new ArrayList<JoinTable>();
	
	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName == null ? null : methodName.trim();
	}

	public DbInfo getDbInfo() {
		return dbInfo;
	}

	public void setDbInfo(DbInfo dbInfo) {
		this.dbInfo = dbInfo;
	}

	public String getMethodDes() {
		return methodDes;
	}

	public void setMethodDes(String methodDes) {
		this.methodDes = methodDes == null ? null : methodDes.trim();
	}

	public List<JoinTable> getTables() {
		return tables;
	}

	public void setTables(List<JoinTable> tables) {
		this.tables = tables;
	}
}