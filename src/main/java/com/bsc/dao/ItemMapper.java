package com.bsc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bsc.model.Item;

public interface ItemMapper extends BaseMapper<Item> {

	public void batchDeleteById(Integer[] ids);

	public List<Item> findListByItemNameOrdbId(
			@Param("itemName") String itemName, @Param("dbId") Integer dbId);

	public List<Item> findListByDbId(Integer dbId);
}