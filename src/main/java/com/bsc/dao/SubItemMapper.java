package com.bsc.dao;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.model.SubItem;

public interface SubItemMapper {
	int deleteByPrimaryKey(Integer id);

	int insert(SubItem record);

	int insertSelective(SubItem record);

	SubItem selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(SubItem record);

	int updateByPrimaryKey(SubItem record);

	public List<SubItem> findAll();

	public List<SubItem> findListPage(BaseSearch search);

	public void batchDeleteById(Integer[] ids);

	public void batchAdd(List<SubItem> subItems);
	
	public List<SubItem> findListByItemId(Integer itemId);
}