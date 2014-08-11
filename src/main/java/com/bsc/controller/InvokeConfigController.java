package com.bsc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bsc.common.BaseSearch;
import com.bsc.common.PageBean;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.DbInfo;
import com.bsc.model.InvokeConfig;
import com.bsc.model.Item;
import com.bsc.model.JoinTable;
import com.bsc.service.IDbInfoService;
import com.bsc.service.IInvokeConfigService;
import com.bsc.service.IItemService;
import com.bsc.service.IJoinTableService;
import com.bsc.utils.JsonUtil;
import com.bsc.utils.WebUtils;

/**
 * 接口方法配置表
 * 
 * @author zhangx
 * 
 */
@Controller
@RequestMapping("/invoke")
public class InvokeConfigController {

	private final static Logger log = LoggerFactory
			.getLogger(InvokeConfigController.class.getSimpleName());

	@Autowired
	private IItemService itemService;

	@Autowired
	private IDbInfoService dbInfoService;
	@Autowired
	private IInvokeConfigService invokeConfigService;
	
	@Autowired 
	private IJoinTableService joinTableService;

	/**
	 * 调用方法列表
	 * 
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/list")
	public ModelAndView list(HttpServletRequest request, PageBean page,
			Integer dbId) {
		ModelAndView view = new ModelAndView();
		try {
			BaseSearch search = new BaseSearch();
			search.setPage(page);
			List<InvokeConfig> list = invokeConfigService.findListPage(search);
			page.setPageUrl(request.getContextPath() + "/invoke/list");
			view.setViewName("/invoke/list");
			view.addObject("list", list);
			view.addObject("page", page);
		} catch (BusinessServiceException e) {
			e.printStackTrace();
		}
		return view;
	}

	/**
	 * 添加界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/toAdd")
	public ModelAndView add(ModelAndView view) {
		try {
			List<DbInfo> dbInfos = dbInfoService.findAll();
			view.addObject("list", dbInfos);
			view.setViewName("invoke/add");
		} catch (BusinessServiceException e) {
			e.printStackTrace();
		}
		return view;
	}

	/**
	 * 添加界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/condition/{id}")
	public ModelAndView condition(ModelAndView view, @PathVariable("id") Integer id) {
		try {
			InvokeConfig config = invokeConfigService.findById(id);
			Integer dbId = config.getId();
			List<Item> items = itemService.findListByDbId(dbId);
			List<JoinTable> tables=joinTableService.findByInvokeId(id);
			view.addObject("config", config);
			view.addObject("item", items);
			view.addObject("list", tables);
			view.setViewName("invoke/condition");
		} catch (BusinessServiceException e) {
			e.printStackTrace();
		}
		return view;
	}
	/**
	 * 添加界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/condition",method=RequestMethod.POST)
	public void condition(HttpServletResponse response, InvokeConfig config) {
		boolean flag=false;
		String msg="添加成功!";
		try {
		     joinTableService.add(config);
		} catch (BusinessServiceException e) {
			e.printStackTrace();
			msg="添加失败!";
		}finally{
			WebUtils.renderJson(response, JsonUtil.jsonMsg(flag, msg));
		}
	}

	/**
	 * 添加操作
	 * 
	 * @param response
	 * @param dbInfo
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(HttpServletResponse response, InvokeConfig config) {
		String msg = "添加成功!";
		boolean flag = true;
		try {
			invokeConfigService.add(config);
		} catch (BusinessServiceException e) {
			flag = false;
			msg = "添加失败!";
			e.printStackTrace();
			log.error(msg, e);
		} finally {
			WebUtils.renderJson(response, JsonUtil.jsonMsg(flag, msg));
		}
	}

	/**
	 * 修改界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/update/{id}")
	public ModelAndView update(@PathVariable(value = "id") Integer id) {
		ModelAndView view = new ModelAndView("invoke/update");
		try {
			Item item = itemService.findById(id);
			List<DbInfo> dbInfos = dbInfoService.findAll();
			view.addObject("list", dbInfos);
			view.addObject("item", item);
		} catch (BusinessServiceException e) {
			log.error("获取数据源信息失败!", e);
		}
		return view;
	}

	/**
	 * 修改操作
	 * 
	 * @param response
	 * @param dbInfo
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public void update(HttpServletResponse response, Item item) {
		String msg = "修改成功!";
		boolean flag = true;
		try {
			itemService.update(item);
		} catch (Exception e) {
			flag = false;
			msg = "修改失败!";
			log.error(msg, e);
		} finally {
			WebUtils.renderJson(response, JsonUtil.jsonMsg(flag, msg));
		}
	}

	@RequestMapping(value = "/delete")
	public void delete(HttpServletResponse response,
			@RequestParam("id") Integer[] ids) {
		String msg = "";
		boolean flag = true;
		try {
			itemService.batchDeleteById(ids);
			msg = "成功删除指标信息！";
		} catch (Exception e) {
			msg = "删除指标信息失败！";
			flag = false;
			log.error(msg, e);
		} finally {
			WebUtils.renderJson(response, JsonUtil.jsonMsg(flag, msg));
		}
	}

	@RequestMapping(value = "/read")
	public void read(HttpServletResponse response,
			@RequestParam("id") Integer[] ids) {
		String msg = "";
		boolean flag = true;
		try {
			itemService.readItem(ids);
			msg = "读取成功！";
		} catch (Exception e) {
			msg = "读取失败！";
			flag = false;
			log.error(msg, e);
		} finally {
			WebUtils.renderJson(response, JsonUtil.jsonMsg(flag, msg));
		}
	}

	/**
	 * 检查唯一性
	 * 
	 * @param id
	 * @param appname
	 * @return
	 */
	@RequestMapping(value = "/checkName")
	@ResponseBody
	public boolean checkName(@RequestParam("id") Integer id,
			@RequestParam("itemName") String itemName,
			@RequestParam("dbId") Integer dbId) {
		String msg = "";
		try {
			itemName = itemName.trim();
			List<Item> infos = itemService.findListByItemNameOrdbId(itemName,
					dbId);
			if (null == id || id.intValue() == 0) {
				if (infos != null && infos.size() > 0)
					return false;
				else
					return true;
			} else {

				if (!existDbInfo(infos, id))
					return false;
				else
					return true;
			}
		} catch (Exception e) {
			msg = e.getMessage();
			log.error(msg, e);
		}
		return true;
	}

	/**
	 * 判断列表中ID的值是否存在
	 * 
	 * @param dbInfos
	 * @param id
	 * @return
	 */
	public boolean existDbInfo(List<Item> items, Integer id) {
		boolean flag = false;
		for (Item item : items) {
			if (item.getId().intValue() == id) {
				flag = true;
				break;
			}
		}
		return flag;
	}
}
