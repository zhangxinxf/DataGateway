package com.bsc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsc.common.BaseSearch;
import com.bsc.dao.MetadataMapper;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.Metadata;
import com.bsc.service.IMetadataService;

@Transactional
@Service
public class MetadataServiceImpl implements IMetadataService {

	@Autowired
	private MetadataMapper metadataMapper;
	
	@Override
	public Metadata findById(Integer id) throws BusinessServiceException {
		// TODO Auto-generated method stub
		return metadataMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<Metadata> findAll() throws BusinessServiceException {
		// TODO Auto-generated method stub
		return metadataMapper.findAll();
	}

	@Override
	public List<Metadata> findListPage(BaseSearch search)
			throws BusinessServiceException {
		// TODO Auto-generated method stub
		return metadataMapper.findListPage(search);
	}

	@Override
	public void add(Metadata metadata) throws BusinessServiceException {
		// TODO Auto-generated method stub
		metadataMapper.insert(metadata);
	}

	@Override
	public void update(Metadata metadata) throws BusinessServiceException {
		// TODO Auto-generated method stub
		metadataMapper.updateByPrimaryKey(metadata);
	}

	@Override
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException {
		// TODO Auto-generated method stub
		metadataMapper.batchDeleteById(ids);
	}

	@Override
	public List<Metadata> findListByName(String name)
			throws BusinessServiceException {
		return metadataMapper.findListByName(name);
	}

}
