package com.bsc.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsc.common.BaseSearch;
import com.bsc.dao.ItemMapper;
import com.bsc.dao.SubItemMapper;
import com.bsc.exception.BusinessServiceException;
import com.bsc.exception.DAOException;
import com.bsc.model.DbInfo;
import com.bsc.model.Item;
import com.bsc.model.SubItem;
import com.bsc.service.IItemService;
import com.bsc.utils.DBUtils;
import com.mysql.jdbc.ResultSetMetaData;

@Service
@Transactional
public class ItemServiceImpl implements IItemService {

	private static final Logger log = LoggerFactory
			.getLogger(IItemService.class);

	private static final Map<Integer, Connection> map = new HashMap<Integer, Connection>();

	@Autowired
	private ItemMapper itemMapper;
	@Autowired
	private SubItemMapper subItemMapper;

	@Override
	public Item findById(Integer id) throws BusinessServiceException {
		return itemMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<Item> findAll() throws BusinessServiceException {

		return itemMapper.findAll();
	}

	@Override
	public List<Item> findListPage(BaseSearch search)
			throws BusinessServiceException {
		return itemMapper.findListPage(search);
	}

	@Override
	public int add(Item item) throws BusinessServiceException {
		return itemMapper.insert(item);
	}

	@Override
	public int update(Item item) throws BusinessServiceException {
		return itemMapper.updateByPrimaryKey(item);
	}

	@Override
	public void batchDeleteById(Integer[] ids) throws BusinessServiceException {
		itemMapper.batchDeleteById(ids);
	}

	@Override
	public void deletByIds(Integer[] ids) throws BusinessServiceException {
		for (Integer id : ids) {
			itemMapper.deleteByPrimaryKey(id);
		}
	}

	@Override
	public List<Item> findListByItemNameOrdbId(String itemName, Integer dbId)
			throws BusinessServiceException {
		return itemMapper.findListByItemNameOrdbId(itemName, dbId);
	}

	@Override
	public void readItem(Integer[] ids) throws BusinessServiceException {
		for (Integer id : ids) {
			Item item = itemMapper.selectByPrimaryKey(id);
			DbInfo dbInfo = item.getDbInfo();
			String tableName = item.getItemName();
			int status = 1;// 读取状态
			if (null!=item.getReadStatus()&&item.getReadStatus() == 1)
				continue;
			try {
				Connection conn = getConnection(dbInfo);
				List<SubItem> subItems = getListSubItemFormDB(conn, tableName,
						item);
				// 批量添加指标项
				subItemMapper.batchAdd(subItems);
			} catch (DAOException e) {
				status = 2;
				log.error("获取数据库连接异常!", e);
				throw new BusinessServiceException(e);
			} catch (SQLException e) {
				status = 2;
				log.error("读取表结构异常!", e);
				throw new BusinessServiceException(e);
			} finally {
				// 设置指标读取状态
				item.setReadStatus(status);
				itemMapper.updateByPrimaryKey(item);
			}
		}
	}

	/**
	 * 获取数据库连接
	 * 
	 * @param dbInfo
	 * @return
	 */
	private Connection getConnection(DbInfo dbInfo) throws DAOException {
		if (map.get(dbInfo.getId()) != null) {
			return map.get(dbInfo.getId());
		}
		Connection conn = null;
		try {
			String type = dbInfo.getDbtype();
			String ip = dbInfo.getIp();
			String dbname = dbInfo.getDbname();
			String username = dbInfo.getUsername();
			String password = dbInfo.getPassword();
			conn = DBUtils.getConnection(type, ip, dbname, username, password);
			map.put(dbInfo.getId(), conn);
		} catch (DAOException e) {
			log.error("获取数据库连接异常!", e);
			throw new DAOException(e);
		}
		return conn;
	}

	/**
	 * 根据数据源和表名来获取数据结构
	 * 
	 * @param conn
	 * @return
	 */
	private List<SubItem> getListSubItemFormDB(Connection conn,
			String tableName, Item item) throws SQLException {
		PreparedStatement statement = null;
		ResultSetMetaData result = null;
		ResultSet resultSet = null;
		SubItem subItem = null;
		List<SubItem> sub = new ArrayList<SubItem>();
		try {
			String sql = "select * from " + tableName;
			statement = conn.prepareStatement(sql);
			resultSet = statement.executeQuery();
			result = (ResultSetMetaData) resultSet.getMetaData();
			int len = result.getColumnCount();
			for (int i = 0; i < len; i++) {
				subItem = new SubItem();
				int index = i + 1;
				String javaType = result.getColumnClassName(index);
				String dbType = result.getColumnTypeName(index);
				String columnName = result.getColumnName(index);
				subItem.setDbType(dbType);
				subItem.setPropertyType(javaType);
				subItem.setFieldName(columnName);
				subItem.setItem(item);
				sub.add(subItem);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			log.error("读取表结构异常!", e);
			throw new SQLException(e);
		} finally {
			if (statement != null) {
				statement.close();
			}
		}
		return sub;
	}

	@Override
	public List<Item> findListByDbId(Integer dbId)
			throws BusinessServiceException {
		return itemMapper.findListByDbId(dbId);
	}
}
