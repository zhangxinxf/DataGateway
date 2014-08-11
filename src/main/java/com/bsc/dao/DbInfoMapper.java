package com.bsc.dao;

import java.util.List;

import com.bsc.common.BaseSearch;
import com.bsc.model.DbInfo;

public interface DbInfoMapper extends BaseMapper<DbInfo> {

	public List<DbInfo> findListPage(BaseSearch search);

	public List<DbInfo> findByAppName(String appname);

	public void batchDeleteById(Integer[] ids);
}