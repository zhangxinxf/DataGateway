package com.bsc.service;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.Metadata;

/**
 * 元数据操作接口
 * 
 * @author zhangx
 * 
 */
public interface IMetadataService {

	/**
	 * 根据ID标识获取信息
	 * 
	 * @param id
	 * @return
	 * @throws BusinessServiceException
	 */
	public Metadata findById(Integer id) throws BusinessServiceException;

	/**
	 * 查询全部数据
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<Metadata> findAll() throws BusinessServiceException;

	/**
	 * 获取分页数据
	 * 
	 * @param search
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<Metadata> findListPage(BaseSearch search)
			throws BusinessServiceException;

	/**
	 * 添加元数据
	 * 
	 * @param metadata
	 * @throws BusinessServiceException
	 */
	public void add(Metadata metadata) throws BusinessServiceException;

	/**
	 * 修改元数据
	 * 
	 * @param metadata
	 * @throws BusinessServiceException
	 */
	public void update(Metadata metadata) throws BusinessServiceException;

	/**
	 * 删除数据项
	 * 
	 * @param ids
	 * @throws BusinessServiceException
	 */
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException;

	/**
	 * 根据名称查找元数据
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<Metadata> findListByName(String name) throws BusinessServiceException;
}
