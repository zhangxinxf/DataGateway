package com.bsc.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.taglibs.standard.lang.jstl.Literal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsc.common.BaseSearch;
import com.bsc.dao.ItemMapper;
import com.bsc.dao.JoinTableMapper;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.InvokeConfig;
import com.bsc.model.Item;
import com.bsc.model.JoinTable;
import com.bsc.service.IJoinTableService;

@Service
public class JoinTableServiceImpl implements IJoinTableService {

	@Autowired
	private JoinTableMapper joinTableMapper;
	@Autowired
	private ItemMapper itemMapper;

	@Override
	public int add(JoinTable entity) throws BusinessServiceException {
		// TODO Auto-generated method stub
		return joinTableMapper.insert(entity);
	}

	@Override
	@Transactional(readOnly = true)
	public JoinTable findById(Integer id) throws BusinessServiceException {
		// TODO Auto-generated method stub
		return joinTableMapper.selectByPrimaryKey(id);
	}

	@Override
	@Transactional(readOnly = true)
	public List<JoinTable> findAll() throws BusinessServiceException {
		return joinTableMapper.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public List<JoinTable> findListPage(BaseSearch search)
			throws BusinessServiceException {
		return joinTableMapper.findListPage(search);
	}

	@Override
	public int update(JoinTable entity) throws BusinessServiceException {
		return joinTableMapper.updateByPrimaryKey(entity);
	}

	@Override
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException {

	}

	@Override
	@Transactional
	public void add(InvokeConfig config) {
		List<JoinTable> tables = config.getTables();
		List<JoinTable> old = joinTableMapper.findByInvokeId(config.getId());
		if (null != tables && tables.size() > 0) {
			for (JoinTable joinTable : old) {
				if (!exists(tables, joinTable)) {
					joinTableMapper.deleteByPrimaryKey(joinTable.getId());
				}
			}
			
			for (JoinTable joinTable : tables) {
				if (joinTable != null) {
					Item item = null;
					Item toitem = null;
					if (joinTable.getItem() != null
							&& joinTable.getItem().getId() != null) {
						item = itemMapper.selectByPrimaryKey(joinTable
								.getItem().getId());
						joinTable.setTableName(item.getItemName());

					}
					if (joinTable.getToItem() != null
							&& joinTable.getToItem().getId() != null) {
						toitem = itemMapper.selectByPrimaryKey(joinTable
								.getToItem().getId());
						joinTable.setToTable(toitem.getItemName());
					}

					if (joinTable.getId() != null) {
						joinTable.setInvokeConfig(config);
						joinTableMapper.updateByPrimaryKey(joinTable);
					} else {
						joinTable.setInvokeConfig(config);
						joinTableMapper.insert(joinTable);
					}
				}
			}
		}
	}

	private boolean exists(List<JoinTable> nlist, JoinTable table) {
		boolean flag=false;
		for (JoinTable n : nlist) {
			if(n.getId()!=null&&(table.getId().intValue()==n.getId().intValue())){
				flag=true;
				break;
			}
		}
		return flag;
	}

	@Override
	public List<JoinTable> findByInvokeId(Integer invokeId)
			throws BusinessServiceException {
		return joinTableMapper.findByInvokeId(invokeId);
	}
}
