package com.bsc.service;

import java.util.List;

import com.bsc.exception.BusinessServiceException;
import com.bsc.model.InvokeConfig;
import com.bsc.model.JoinTable;

/**
 * 关联表信息
 * @author zhangx
 *
 */
public interface IJoinTableService extends IBaseService<JoinTable>{
	
	/**
	 * 添加关联表信息
	 */
	public void add(InvokeConfig config)throws BusinessServiceException;
	
	
	/**
	 * 获取方法对应的表信息
	 * @param invokeId
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<JoinTable> findByInvokeId(Integer invokeId)throws BusinessServiceException;
	
}
