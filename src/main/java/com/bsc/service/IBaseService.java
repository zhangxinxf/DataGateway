package com.bsc.service;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.exception.BusinessServiceException;

public interface IBaseService<E> {

	/**
	 * 添加
	 * 
	 * @param E
	 * @return
	 * @throws BusinessServiceException
	 */
	public int add(E entity) throws BusinessServiceException;

	/**
	 * 根据ID标识获取信息
	 * 
	 * @param id
	 * @return
	 * @throws BusinessServiceException
	 */
	public E findById(Integer id) throws BusinessServiceException;

	/**
	 * 查询全部数据
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<E> findAll() throws BusinessServiceException;



	/**
	 * 获取分页数据
	 * 
	 * @param search
	 * @return
	 * @throws BusinessServiceException
	 */
	public List<E> findListPage(BaseSearch search)
			throws BusinessServiceException;

	/**
	 * 修改
	 * 
	 * @return
	 * @throws BusinessServiceException
	 */
	public int update(E entity) throws BusinessServiceException;

	/**
	 * 根据ID删除
	 * 
	 * @param ids
	 * @throws BusinessServiceException
	 */
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException;

}
