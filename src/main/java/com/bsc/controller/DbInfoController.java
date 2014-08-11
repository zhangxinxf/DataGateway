package com.bsc.controller;

import java.util.List;

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
import com.bsc.service.IDbInfoService;
import com.bsc.utils.DBUtils;
import com.bsc.utils.JsonUtil;
import com.bsc.utils.WebUtils;

/**
 * 数据库连接信息操作
 * 
 * @author zhangx
 * 
 */
@Controller
@RequestMapping("/dbinfo")
public class DbInfoController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private IDbInfoService dbInfoService;

	/**
	 * 指标信息列表
	 * 
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/list")
	public ModelAndView list(PageBean page) {
		ModelAndView view = new ModelAndView();
		try {
			BaseSearch search = new BaseSearch();
			search.setPage(page);
			List<DbInfo> list = dbInfoService.findListPage(search);
			page.setPageUrl("dbinfo/list");
			view.setViewName("/dbinfo/list");
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
	public String add() {

		return "dbinfo/add";
	}

	/**
	 * 添加操作
	 * 
	 * @param response
	 * @param dbInfo
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(HttpServletResponse response, DbInfo dbInfo) {
		String msg = "添加成功!";
		boolean flag = true;
		try {
			dbInfoService.add(dbInfo);
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
		ModelAndView view = new ModelAndView("dbinfo/update");
		DbInfo info;
		try {
			info = dbInfoService.findById(id);
			view.addObject("info", info);
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
	public void update(HttpServletResponse response, DbInfo dbInfo) {
		String msg = "修改成功!";
		boolean flag = true;
		try {
			dbInfoService.update(dbInfo);
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
			this.dbInfoService.batchDeleteById(ids);
			msg = "成功删除用户信息！";
		} catch (Exception e) {
			msg = "删除用户的信息失败！";
			flag = false;
			log.error(msg, e);
		} finally {
			WebUtils.renderJson(response, JsonUtil.jsonMsg(flag, msg));
		}
	}

	@RequestMapping(value = "/test/{id}")
	public void test(HttpServletResponse response,
			@PathVariable("id") Integer id) {
		String msg = "";
		boolean flag = true;
		try {
			DbInfo info = dbInfoService.findById(id);
			DBUtils.getConnection(info.getDbtype(), info.getIp(),
					info.getDbname(), info.getUsername(), info.getPassword());
			msg = "连接成功!";
			flag = true;
		} catch (Exception e) {
			msg = "连接失败!";
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
	public boolean checkName(Long id, String appname) {
		String msg = "";
		try {
			appname = appname.trim();
			List<DbInfo> infos = dbInfoService.findByAppName(appname);
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
	public boolean existDbInfo(List<DbInfo> dbInfos, Long id) {
		boolean flag = false;
		for (DbInfo dbInfo : dbInfos) {
			if (dbInfo.getId().intValue() == id) {
				flag = true;
				break;
			}
		}
		return flag;
	}
}
