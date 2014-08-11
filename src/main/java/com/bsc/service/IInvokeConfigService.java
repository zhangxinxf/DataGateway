package com.bsc.service;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.InvokeConfig;

/**
 * 访问方法配置表
 * 
 * @author zhangx
 * 
 */
public interface IInvokeConfigService {

	/**
	 * 根据ID标识获取信息
	 * 
	 * @param id
	 * @return
	 * @throws BusinessServiceException
	 */
	public InvokeConfig findById(Integer id) throws BusinessServiceException;

	/**
	 * 查询全部数据
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<InvokeConfig> findAll() throws BusinessServiceException;

	/**
	 * 获取分页数据
	 * 
	 * @param search
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<InvokeConfig> findListPage(BaseSearch search)
			throws BusinessServiceException;
	
	/**
	 * 添加
	 * 
	 * @param item
	 * @return
	 * @throws BusinessServiceException
	 */
	public int add(InvokeConfig config) throws BusinessServiceException;

	/**
	 * 修改
	 * 
	 * @param item
	 * @return
	 * @throws BusinessServiceException
	 */
	public int update(InvokeConfig config) throws BusinessServiceException;

	/**
	 * 批量删除
	 * 
	 * @param ids
	 * @throws BusinessServiceException
	 */
	public void deleteByIds(Integer[] ids) throws BusinessServiceException;
	
}
