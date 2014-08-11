package com.bsc.service;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.MetadataSubItem;

/**
 * 元数据项操作接口
 * 
 * @author zhangx
 * 
 */
public interface IMetadataSubItemService {

	/**
	 * 根据ID标识获取信息
	 * 
	 * @param id
	 * @return
	 * @throws BusinessServiceException
	 */
	public MetadataSubItem findById(Integer id) throws BusinessServiceException;

	/**
	 * 查询全部数据
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<MetadataSubItem> findAll() throws BusinessServiceException;

	/**
	 * 添加
	 * 
	 * @param MetadataSubItem
	 * @return
	 * @throws BusinessServiceException
	 */
	public int add(MetadataSubItem item) throws BusinessServiceException;

	/**
	 * 修改
	 * 
	 * @param MetadataSubItem
	 * @return
	 * @throws BusinessServiceException
	 */
	public int update(MetadataSubItem item) throws BusinessServiceException;

	/**
	 * 批量删除
	 * 
	 * @param ids
	 * @throws BusinessServiceException
	 */
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException;

	/**
	 * 循环删除多个
	 * 
	 * @param ids
	 * @throws BusinessServiceException
	 */
	public void deletByIds(Integer[] ids) throws BusinessServiceException;

	/**
	 * 获取分页数据
	 * 
	 * @param search
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<MetadataSubItem> findListPage(BaseSearch search)
			throws BusinessServiceException;
}
