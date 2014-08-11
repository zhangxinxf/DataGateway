package com.bsc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsc.common.BaseSearch;
import com.bsc.dao.SubItemMapper;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.SubItem;
import com.bsc.service.ISubItemService;

@Transactional
@Service
public class SubitemServiceImpl implements ISubItemService {

	@Autowired
	private SubItemMapper subitemMapper;

	@Override
	public SubItem findById(Integer id) throws BusinessServiceException {
		return subitemMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<SubItem> findAll() throws BusinessServiceException {
		return subitemMapper.findAll();
	}

	@Override
	public int add(SubItem item) throws BusinessServiceException {
		return subitemMapper.insert(item);
	}

	@Override
	public int update(SubItem item) throws BusinessServiceException {
		return subitemMapper.updateByPrimaryKey(item);
	}

	@Override
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException {
		subitemMapper.batchDeleteById(ids);
	}

	@Override
	public List<SubItem> findListPage(BaseSearch search)
			throws BusinessServiceException {
		return subitemMapper.findListPage(search);
	}

	@Override
	public void deletByIds(Integer[] ids) throws BusinessServiceException {
		subitemMapper.batchDeleteById(ids);
	}

	@Override
	public List<SubItem> findListByItemId(Integer itemId)
			throws BusinessServiceException {
		return subitemMapper.findListByItemId(itemId);
	}
}
