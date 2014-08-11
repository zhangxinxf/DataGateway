package com.bsc.dao;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.model.Metadata;

public interface MetadataMapper {
	int deleteByPrimaryKey(Integer id);

	int insert(Metadata record);

	int insertSelective(Metadata record);

	Metadata selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(Metadata record);

	int updateByPrimaryKey(Metadata record);

	public List<Metadata> findAll();

	public List<Metadata> findListPage(BaseSearch search);

	public void batchDeleteById(Integer[] ids);

	public List<Metadata> findListByName(String name);
}