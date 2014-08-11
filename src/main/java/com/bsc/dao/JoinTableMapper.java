package com.bsc.dao;

import java.util.List;

import com.bsc.model.JoinTable;

public interface JoinTableMapper  extends BaseMapper<JoinTable>{
	
	public List<JoinTable> findByInvokeId(Integer invokeId);
 
}