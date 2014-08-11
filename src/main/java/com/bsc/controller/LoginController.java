package com.bsc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.bsc.exception.BusinessServiceException;

/**
 * 用户登陆controller
 * 
 * @Company Rockontrol
 * @author zhangx
 * @date 2013-6-19 下午2:40:11
 * @Team 云计算中心
 */
@Controller
public class LoginController {
	Logger logger = LoggerFactory.getLogger(LoginController.class);

	/**
	 * 登陆页面
	 * 
	 * @author zhangx
	 * @date 2013-6-19 下午2:45:14
	 * @return ModelAndView
	 * @exception
	 */
	@RequestMapping(value = "/index")
	public ModelAndView index() {
		logger.info("mapping /index to index.jsp");
		return new ModelAndView("index");
	}

	/**
	 * 用户登陆
	 * 
	 * @author zhangx
	 * @date 2013-6-19 下午2:44:57
	 * @param request
	 * @param u
	 * @return ModelAndView
	 * @exception
	 */
	@RequestMapping(value = "/login")
	public ModelAndView login(HttpServletRequest request,
			HttpServletResponse response, String loginName, String passWord)
			throws BusinessServiceException {
		ModelAndView mv  = new ModelAndView("admin_main");
		try {
			System.out.println("loginName:" + loginName + "\tpassWord:"
					+ passWord);
		} catch (Exception e) {
		}
		return mv;
	}
}
