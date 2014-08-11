package com.bsc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsc.common.BaseSearch;
import com.bsc.dao.MetadataSubitemMapper;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.MetadataSubItem;
import com.bsc.service.IMetadataSubItemService;

@Service
@Transactional
public class MetaDataSubItemServiceImpl implements IMetadataSubItemService {

	@Autowired
	private MetadataSubitemMapper metadataItemMapper;

	@Override
	public MetadataSubItem findById(Integer id) throws BusinessServiceException {
		return metadataItemMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<MetadataSubItem> findAll() throws BusinessServiceException {
		return null;
	}

	@Override
	public List<MetadataSubItem> findListPage(BaseSearch search)
			throws BusinessServiceException {
		return metadataItemMapper.findListPage(search);
	}

	@Override
	public int add(MetadataSubItem item) throws BusinessServiceException {
		// TODO Auto-generated method stub
		return metadataItemMapper.insert(item);
	}

	@Override
	public int update(MetadataSubItem item) throws BusinessServiceException {
		// TODO Auto-generated method stub
		return metadataItemMapper.updateByPrimaryKey(item);
	}

	@Override
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException {
		// TODO Auto-generated method stub
		metadataItemMapper.batchDeleteById(ids);
	}

	@Override
	public void deletByIds(Integer[] ids) throws BusinessServiceException {
		for (Integer id : ids) {
			metadataItemMapper.deleteByPrimaryKey(id);
		}
	}
}
