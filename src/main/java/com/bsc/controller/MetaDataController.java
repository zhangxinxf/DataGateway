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
import com.bsc.model.Metadata;
import com.bsc.service.IMetadataService;
import com.bsc.utils.JsonUtil;
import com.bsc.utils.WebUtils;

/**
 * 元数据项信息
 * 
 * @author zhangx
 * 
 */
@Controller
@RequestMapping("/metadata")
public class MetaDataController {

	private final static Logger log = LoggerFactory
			.getLogger(MetaDataController.class.getSimpleName());

	@Autowired
	private IMetadataService metadataService;

	/**
	 * 指标信息列表
	 * 
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/list")
	public ModelAndView list(HttpServletRequest request, PageBean page,String name) {
		ModelAndView view = new ModelAndView();
		try {
			BaseSearch search = new BaseSearch();
			search.getHashMap().put("name", name);
			search.setPage(page);
			List<Metadata> list = metadataService.findListPage(search);
			page.setPageUrl(request.getContextPath() + "/metadata/list");
			view.setViewName("/metadata/list");
			view.addObject("list", list);
			view.addObject("page", page);
			view.addObject("name", name);
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
		view.setViewName("metadata/add");
		return view;
	}

	/**
	 * 添加操作
	 * 
	 * @param response
	 * @param dbInfo
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(HttpServletResponse response, Metadata data) {
		String msg = "添加成功!";
		boolean flag = true;
		try {
			metadataService.add(data);
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
		ModelAndView view = new ModelAndView("metadata/update");
		try {
			Metadata data = metadataService.findById(id);
			view.addObject("data", data);
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
	public void update(HttpServletResponse response, Metadata data) {
		String msg = "修改成功!";
		boolean flag = true;
		try {
			metadataService.update(data);
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
			metadataService.batchDeleteById(ids);
			msg = "成功删除元数据信息！";
		} catch (Exception e) {
			msg = "删除元数据信息失败！";
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
			@RequestParam("metadataName") String metadataName) {
		String msg = "";
		try {
			metadataName = metadataName.trim();
			List<Metadata> infos = metadataService.findListByName(metadataName);
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
	public boolean existDbInfo(List<Metadata> metadatas, Integer id) {
		boolean flag = false;
		for (Metadata data : metadatas) {
			if (data.getId().intValue() == id) {
				flag = true;
				break;
			}
		}
		return flag;
	}
}
