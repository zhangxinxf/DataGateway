package com.bsc.model;


public class Item extends BaseEntity {

	private String itemName;

	private String itemDes;

	private DbInfo dbInfo;
	/**
	 * 指标读取状态 1,未读取 2,成功 3,失败
	 */
	private Integer readStatus;


	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName == null ? null : itemName.trim();
	}

	public String getItemDes() {
		return itemDes;
	}

	public void setItemDes(String itemDes) {
		this.itemDes = itemDes == null ? null : itemDes.trim();
	}

	public DbInfo getDbInfo() {
		return dbInfo;
	}

	public void setDbInfo(DbInfo dbInfo) {
		this.dbInfo = dbInfo;
	}

	public Integer getReadStatus() {
		return readStatus;
	}

	public void setReadStatus(Integer readStatus) {
		this.readStatus = readStatus;
	}
	
}