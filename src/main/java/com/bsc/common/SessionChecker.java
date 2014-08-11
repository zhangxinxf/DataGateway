package com.bsc.common;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.bsc.service.ISubItemService;


/**
 * 检测session
 *@Company Rockontrol
 *@author   zhangx
 *@date   2013-7-16 下午7:41:29
 *@Team 云计算中心
 */
@Component
public class SessionChecker implements HandlerInterceptor{
    Logger logger = LoggerFactory.getLogger(SessionChecker.class);
    
    @Autowired
    protected ISubItemService userService;
    
    public boolean preHandle(HttpServletRequest request, javax.servlet.http.HttpServletResponse response, Object o){
       try{
          logger.debug("pre handle...");
          logger.info("uri:"+request.getRequestURI());
          request.setCharacterEncoding("UTF-8");
          response.setCharacterEncoding("UTF-8");
          //待实现.......
          if(true){
              return true;
          }else{
             if(true){
                 return true;
             }else{
                return needLogin(request,response);
             }
          }
       }catch(Exception e){
          e.printStackTrace();
       }
       return needLogin(request,response);
    }
    
    private boolean needLogin(HttpServletRequest request, javax.servlet.http.HttpServletResponse response){
       try{
           response.sendRedirect("index");
           return false;
       }catch(IOException e){
          e.printStackTrace();
       }
       return false;
    }
    
    public void postHandle(HttpServletRequest httpServletRequest, javax.servlet.http.HttpServletResponse httpServletResponse, Object o, org.springframework.web.servlet.ModelAndView modelAndView) throws Exception{
        logger.debug("post handle...");
    }

    public void afterCompletion(HttpServletRequest httpServletRequest, javax.servlet.http.HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception{
        logger.debug("after completion...");
    }
}
