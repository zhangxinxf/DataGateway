package com.bsc.model;

import java.util.Date;

public class SubItem extends BaseEntity {

	/**
	 * 字段名称
	 */
	private String fieldName;

	/**
	 * 字段描述
	 */
	private String fieldDes;

	/**
	 * 所属指标
	 */
	private Item item;

	/**
	 * 数据库字段类型
	 */
	private String dbType;

	/**
	 * java字段类型
	 */
	private String propertyType;


	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName == null ? null : fieldName.trim();
	}

	public String getFieldDes() {
		return fieldDes;
	}

	public void setFieldDes(String fieldDes) {
		this.fieldDes = fieldDes == null ? null : fieldDes.trim();
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public String getDbType() {
		return dbType;
	}

	public void setDbType(String dbType) {
		this.dbType = dbType;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

}