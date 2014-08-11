package com.bsc.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Path;

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

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bsc.common.BaseSearch;
import com.bsc.common.PageBean;
import com.bsc.exception.BusinessServiceException;
import com.bsc.model.Item;
import com.bsc.model.SubItem;
import com.bsc.service.IDbInfoService;
import com.bsc.service.IItemService;
import com.bsc.service.ISubItemService;
import com.bsc.utils.JsonUtil;
import com.bsc.utils.WebUtils;

/**
 * 指标信息
 * 
 * @author zhangx
 * 
 */
@Controller
@RequestMapping("/subitem")
public class SubItemController {

	private final static Logger log = LoggerFactory
			.getLogger(SubItemController.class.getSimpleName());

	@Autowired
	private ISubItemService subItemService;
	@Autowired
	private IItemService itemService;
	@Autowired
	private IDbInfoService dbInfoService;

	/**
	 * 指标信息列表
	 * 
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/list")
	public ModelAndView list(HttpServletRequest request, PageBean page,
			Integer itemId) {
		ModelAndView view = new ModelAndView();
		try {
			String fieldName = request.getParameter("fieldName");
			BaseSearch search = new BaseSearch();
			search.setPage(page);
			search.getHashMap().put("fieldName", fieldName);
			search.getHashMap().put("itemId", itemId);
			List<SubItem> list = subItemService.findListPage(search);
			List<Item> items = itemService.findAll();
			page.setPageUrl(request.getContextPath() + "/subitem/list");
			view.setViewName("/subitem/list");
			view.addObject("data", items);
			view.addObject("list", list);
			view.addObject("page", page);
			view.addObject("itemId", itemId);
			view.addObject("fieldName", fieldName);
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
			List<Item> items = itemService.findAll();
			view.addObject("list", items);
			view.setViewName("subitem/add");
		} catch (BusinessServiceException e) {
			e.printStackTrace();
		}
		return view;
	}

	/**
	 * 添加操作
	 * 
	 * @param response
	 * @param dbInfo
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(HttpServletResponse response, SubItem item) {
		String msg = "添加成功!";
		boolean flag = true;
		try {
			subItemService.add(item);
		} catch (BusinessServiceException e) {
			flag = false;
			msg = "添加失败!";
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
		ModelAndView view = new ModelAndView("subitem/update");
		try {
			SubItem item = subItemService.findById(id);
			List<Item> items = itemService.findAll();
			view.addObject("list", items);
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
	public void update(HttpServletResponse response, SubItem item) {
		String msg = "修改成功!";
		boolean flag = true;
		try {
			subItemService.update(item);
		} catch (BusinessServiceException e) {
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
			subItemService.batchDeleteById(ids);
			msg = "成功删除指标项信息！";
		} catch (Exception e) {
			msg = "删除指标项信息失败！";
			flag = false;
			log.error(msg, e);
		} finally {
			WebUtils.renderJson(response, JsonUtil.jsonMsg(flag, msg));
		}
	}

	@ResponseBody
	@RequestMapping("/subItemTree")
	public String getJsonTree(Integer[] ids) {
		JSONArray array = new JSONArray();
		try {
			for (Integer itemId : ids) {
				Item item = itemService.findById(itemId);
				List<SubItem> list = subItemService.findListByItemId(itemId);
				JSONObject parent = new JSONObject();
				parent.put("id", item.getId());
				parent.put("name", item.getItemName());
				parent.put("pId", 0);
				parent.put("open", true);
				array.add(parent);
				for (SubItem subItem : list) {
					JSONObject object = new JSONObject();
					object.put("id", subItem.getId());
					object.put("name", subItem.getFieldName());
					object.put("pId", item.getId());
					array.add(object);
				}
			}
		} catch (BusinessServiceException e) {
			e.printStackTrace();
		}
		return array.toJSONString();
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
			@RequestParam("fieldName") String fieldName,
			@RequestParam("itemId") Integer itemId) {
		String msg = "";
		try {
			fieldName = fieldName.trim();
			List<SubItem> infos = new ArrayList<SubItem>();// itemService.findListByItemNameOrdbId(itemName,
															// dbId);
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
	public boolean existDbInfo(List<SubItem> items, Integer id) {
		boolean flag = false;
		for (SubItem item : items) {
			if (item.getId().intValue() == id) {
				flag = true;
				break;
			}
		}
		return flag;
	}
}
