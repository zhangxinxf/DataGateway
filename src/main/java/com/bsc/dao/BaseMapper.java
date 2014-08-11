package com.bsc.dao;

import java.util.List;

import com.bsc.common.BaseSearch;

public interface BaseMapper<E> {

	int deleteByPrimaryKey(Integer id);

	int insert(E entity);

	int insertSelective(E entity);

	E selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(E entity);

	int updateByPrimaryKey(E entity);

	public List<E> findAll();

	public List<E> findListPage(BaseSearch search);
}
