package com.bsc.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.Item;
import com.bsc.service.IItemService;

/**
 * rest 风格
 * 
 * @author zhangx
 * 
 */
public class UserRestService {

	private static Logger logger = LoggerFactory
			.getLogger(UserRestService.class);

	@Autowired
	private IItemService itemService;

	@GET
	@Path("/user/{id}")
	@Produces(value = { MediaType.APPLICATION_JSON })
	public String findUserById(@PathParam(value = "id") Integer id) {
		String str = "";
		try {
			Item item = itemService.findById(id);
			if (null == item) {
				logger.error("指标不存在!!!");
			}
			str = JSON.toJSONString(item);
		} catch (BusinessServiceException e) {
			String message = "指标不存在(id:" + id + ")";
			logger.error(message, e);
		}
		return str;
	}

	@GET
	@Path("/dept/getDeptAll")
	@Produces(value = { MediaType.APPLICATION_JSON })
	public String findAll() {
		String str = "";
		try {
			List<Item> depts = itemService.findAll();
			str = JSON.toJSONString(depts);
		} catch (BusinessServiceException e) {
			String message = "获取指标列表失败!!";
			logger.error(message, e);
		}
		return str;
	}
}
