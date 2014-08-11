package com.bsc.service;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.SubItem;

/**
 * 指标项
 * 
 * @author zhangx
 * 
 */
public interface ISubItemService {

	/**
	 * 根据ID标识获取信息
	 * 
	 * @param id
	 * @return
	 * @throws BusinessServiceException
	 */
	public SubItem findById(Integer id) throws BusinessServiceException;

	/**
	 * 查询全部数据
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<SubItem> findAll() throws BusinessServiceException;

	/**
	 * 添加
	 * 
	 * @param SubItem
	 * @return
	 * @throws BusinessServiceException
	 */
	public int add(SubItem item) throws BusinessServiceException;

	/**
	 * 修改
	 * 
	 * @param SubItem
	 * @return
	 * @throws BusinessServiceException
	 */
	public int update(SubItem item) throws BusinessServiceException;

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
	public List<SubItem> findListPage(BaseSearch search)
			throws BusinessServiceException;

	/**
	 * 根据指标ID获取子项信息
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<SubItem> findListByItemId(Integer itemId) throws BusinessServiceException;

}
