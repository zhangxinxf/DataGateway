package com.bsc.controller;

import java.util.ArrayList;
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
import com.bsc.model.Metadata;
import com.bsc.model.MetadataSubItem;
import com.bsc.service.IMetadataService;
import com.bsc.service.IMetadataSubItemService;
import com.bsc.utils.JsonUtil;
import com.bsc.utils.WebUtils;

/**
 * 指标信息
 * 
 * @author zhangx
 * 
 */
@Controller
@RequestMapping("/dataitem")
public class MetaDataSubItemController {

	private final static Logger log = LoggerFactory
			.getLogger(MetaDataSubItemController.class.getSimpleName());

	@Autowired
	private IMetadataService metadataService;
	@Autowired
	private IMetadataSubItemService metadataSubItemService;


	/**
	 * 指标信息列表
	 * 
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/list")
	public ModelAndView list(HttpServletRequest request, PageBean page,Integer metaId) {
		ModelAndView view = new ModelAndView();
		try {
			String name=request.getParameter("name");
			BaseSearch search = new BaseSearch();
			search.setPage(page);
			search.getHashMap().put("name", name);
			search.getHashMap().put("metaId", metaId);
			List<MetadataSubItem> list = metadataSubItemService.findListPage(search);
			List<Metadata> data = metadataService.findAll();
			page.setPageUrl(request.getContextPath() + "/dataitem/list");
			view.setViewName("/dataitem/list");
			view.addObject("list", list);
			view.addObject("page", page);
			view.addObject("data", data);
			view.addObject("name",name);
			view.addObject("metaId",metaId);
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
			List<Metadata> data = metadataService.findAll();
			view.addObject("data", data);
			view.setViewName("dataitem/add");
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
	public void add(HttpServletResponse response, MetadataSubItem item) {
		String msg = "添加成功!";
		boolean flag = true;
		try {
			metadataSubItemService.add(item);
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
		ModelAndView view = new ModelAndView("dataitem/update");
		try {
			MetadataSubItem item = metadataSubItemService.findById(id);
			List<Metadata> items = metadataService.findAll();
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
	public void update(HttpServletResponse response, MetadataSubItem item) {
		String msg = "修改成功!";
		boolean flag = true;
		try {
			metadataSubItemService.update(item);
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
			metadataSubItemService.batchDeleteById(ids);
			msg = "成功删除元数据项信息！";
		} catch (Exception e) {
			msg = "删除指标元数据项失败！";
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
			@RequestParam("fieldName") String fieldName,
			@RequestParam("itemId") Integer itemId) {
		String msg = "";
		try {
			fieldName = fieldName.trim();
			List<MetadataSubItem> infos =new ArrayList<MetadataSubItem>();
															
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
	public boolean existDbInfo(List<MetadataSubItem> items, Integer id) {
		boolean flag = false;
		for (MetadataSubItem item : items) {
			if (item.getId().intValue() == id) {
				flag = true;
				break;
			}
		}
		return flag;
	}
}
