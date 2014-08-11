package com.bsc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsc.common.BaseSearch;
import com.bsc.dao.DbInfoMapper;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.DbInfo;
import com.bsc.service.IDbInfoService;

@Service
@Transactional
public class DbInfoServiceImpl implements IDbInfoService {

	@Autowired
	private DbInfoMapper dbInfoMapper;

	@Override
	public DbInfo findById(Integer id) throws BusinessServiceException {
		return dbInfoMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<DbInfo> findAll() throws BusinessServiceException {

		return dbInfoMapper.findAll();
	}

	@Override
	public List<DbInfo> findListPage(BaseSearch search)
			throws BusinessServiceException {
		return dbInfoMapper.findListPage(search);
	}

	@Override
	public int add(DbInfo dbInfo) throws BusinessServiceException {
		return dbInfoMapper.insert(dbInfo);
	}

	@Override
	public List<DbInfo> findByAppName(String appname)
			throws BusinessServiceException {
		return dbInfoMapper.findByAppName(appname);
	}

	@Override
	public int update(DbInfo dbInfo) throws BusinessServiceException {
		return dbInfoMapper.updateByPrimaryKey(dbInfo);
	}

	@Override
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException {
		dbInfoMapper.batchDeleteById(ids);
	}
}
