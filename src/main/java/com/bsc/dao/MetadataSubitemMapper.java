package com.bsc.dao;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.MetadataSubItem;

public interface MetadataSubitemMapper {
	
	int deleteByPrimaryKey(Integer id);

	int insert(MetadataSubItem record);

	int insertSelective(MetadataSubItem record);

	MetadataSubItem selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(MetadataSubItem record);

	int updateByPrimaryKey(MetadataSubItem record);

	public void batchDeleteById(Integer[] ids) throws BusinessServiceException;

	public void deletByIds(Integer[] ids) throws BusinessServiceException;

	public List<MetadataSubItem> findListPage(BaseSearch search)
			throws BusinessServiceException;
}