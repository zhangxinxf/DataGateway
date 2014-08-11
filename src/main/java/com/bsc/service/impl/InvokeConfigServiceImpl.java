package com.bsc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsc.common.BaseSearch;
import com.bsc.dao.InvokeConfigMapper;
import com.bsc.dao.JoinTableMapper;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.InvokeConfig;
import com.bsc.service.IInvokeConfigService;

@Service
public class InvokeConfigServiceImpl implements IInvokeConfigService {

	@Autowired
	private InvokeConfigMapper invokeConfigMapper;
	@Autowired
	private JoinTableMapper joinTaleMapper;

	@Override
	@Transactional(readOnly = true)
	public InvokeConfig findById(Integer id) throws BusinessServiceException {
		return invokeConfigMapper.selectByPrimaryKey(id);
	}

	@Override
	@Transactional(readOnly = true)
	public List<InvokeConfig> findAll() throws BusinessServiceException {
		return invokeConfigMapper.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public List<InvokeConfig> findListPage(BaseSearch search)
			throws BusinessServiceException {
		return invokeConfigMapper.findListPage(search);
	}

	@Override
	public int add(InvokeConfig config) throws BusinessServiceException {
		// TODO Auto-generated method stub
		return invokeConfigMapper.insert(config);
	}

	@Override
	public int update(InvokeConfig config) throws BusinessServiceException {
		// TODO Auto-generated method stub
		return invokeConfigMapper.updateByPrimaryKey(config);
	}

	@Override
	public void deleteByIds(Integer[] ids) throws BusinessServiceException {
		// TODO Auto-generated method stub
		for (Integer id : ids) {
			invokeConfigMapper.deleteByPrimaryKey(id);	
		}
	}
}
