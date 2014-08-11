package com.bsc.service;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.DbInfo;

/**
 * DB信息操作接口
 * 
 * @author zhangx
 * 
 */
public interface IDbInfoService {

	/**
	 * 添加
	 * 
	 * @param dbInfo
	 * @return
	 * @throws BusinessServiceException
	 */
	public int add(DbInfo dbInfo) throws BusinessServiceException;

	/**
	 * 根据ID标识获取信息
	 * 
	 * @param id
	 * @return
	 * @throws BusinessServiceException
	 */
	public DbInfo findById(Integer id) throws BusinessServiceException;

	/**
	 * 查询全部数据
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<DbInfo> findAll() throws BusinessServiceException;

	/**
	 * 根据应用名称获取数据
	 * 
	 * @return
	 */
	public List<DbInfo> findByAppName(String add)
			throws BusinessServiceException;

	/**
	 * 获取分页数据
	 * 
	 * @param search
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<DbInfo> findListPage(BaseSearch search)
			throws BusinessServiceException;

	/**
	 * 修改
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public int update(DbInfo dbInfo) throws BusinessServiceException;

	/**
	 * 根据ID删除
	 * 
	 * @param ids
	 * @throws BusinessServiceException
	 */
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException;
	
}
