package com.bsc.model;

import java.util.Date;

/**
 * 
 * @author zhangx
 * 
 */
public class BaseEntity {
	private Integer id;
	private Date createDate = new Date();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

}
