package com.bsc.service;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.Item;

/**
 * 指标信息接口
 * 
 * @author zhangx
 * 
 */
public interface IItemService {

	/**
	 * 根据ID标识获取信息
	 * 
	 * @param id
	 * @return
	 * @throws BusinessServiceException
	 */
	public Item findById(Integer id) throws BusinessServiceException;

	/**
	 * 查询全部数据
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<Item> findAll() throws BusinessServiceException;

	/**
	 * 添加
	 * 
	 * @param item
	 * @return
	 * @throws BusinessServiceException
	 */
	public int add(Item item) throws BusinessServiceException;

	/**
	 * 修改
	 * 
	 * @param item
	 * @return
	 * @throws BusinessServiceException
	 */
	public int update(Item item) throws BusinessServiceException;

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
	public List<Item> findListPage(BaseSearch search)
			throws BusinessServiceException;

	/**
	 * 根据名称和数据源ID获取指标项 如果dbId is null 则根据指标名称全表匹配
	 * 
	 * @param itemName
	 * @param dbId
	 * @return
	 */
	public List<Item> findListByItemNameOrdbId(String itemName, Integer dbId)
			throws BusinessServiceException;

	/**
	 * 读取指标项
	 */
	public void readItem(Integer[] ids) throws BusinessServiceException;
	

	public List<Item> findListByDbId(Integer dbId)
			throws BusinessServiceException;
	
}
