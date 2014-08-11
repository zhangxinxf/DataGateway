package com.bsc.model;

/**
 * 关联表信息
 * 
 * @author zhangx
 * 
 */
public class JoinTable extends BaseEntity {

	private InvokeConfig invokeConfig;
	private String tableName;
	private Item item;
	private Item toItem;
	private String toTable;
	private String searchName;
	private String joinCloumn;
	private String refCloumn;
	private String joinType;

	public InvokeConfig getInvokeConfig() {
		return invokeConfig;
	}

	public void setInvokeConfig(InvokeConfig invokeConfig) {
		this.invokeConfig = invokeConfig;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getSearchName() {
		return searchName;
	}

	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}


	public String getJoinCloumn() {
		return joinCloumn;
	}

	public void setJoinCloumn(String joinCloumn) {
		this.joinCloumn = joinCloumn;
	}

	public String getToTable() {
		return toTable;
	}

	public void setToTable(String toTable) {
		this.toTable = toTable;
	}

	public String getJoinType() {
		return joinType;
	}

	public void setJoinType(String joinType) {
		this.joinType = joinType;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Item getToItem() {
		return toItem;
	}

	public void setToItem(Item toItem) {
		this.toItem = toItem;
	}

	public String getRefCloumn() {
		return refCloumn;
	}

	public void setRefCloumn(String refCloumn) {
		this.refCloumn = refCloumn;
	}
	
}
