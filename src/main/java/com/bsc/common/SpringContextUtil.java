package com.bsc.common;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;


/**
 * 获取spring容器，以访问容器中定义的其他bean
 * 
 * @author zhangx
 * 
 */
@Component
public class SpringContextUtil implements ApplicationContextAware {
   private static ApplicationContext applicationContext;
   public static Map<String, String> jobMap = new HashMap<String, String>();

   public static ApplicationContext getApplicationContext() {
      return applicationContext;
   }

   /**
    * 获取对象
    * 
    * @return Object 一个以所给名字注册的bean的实例 (service注解方式，自动生成以首字母小写的类名为bean name)
    */
   public static Object getBean(String name) throws BeansException {
      return applicationContext.getBean(name);
   }

   /**
    * 实现ApplicationContextAware接口的回调方法，设置上下文环境
    */
   @Override
   public void setApplicationContext(ApplicationContext applicationContext)
         throws BeansException {
      SpringContextUtil.applicationContext = applicationContext;
   }

   /**
    * 容器加载完后，启动系统任务
    */
   @PostConstruct
   private void init() {
      // PoolControlTask pool = new PoolControlTask();
      // pool.loadJobs();
 /*     JobTool jobTool = JobTool.init();
      jobTool.addJob("poolControlTask", "0 0/1 * * * ?", PoolControlTask.class);
*/
      /*
       * jobTool.addJob("queryServerTask", "0 0/59 * * * ?",
       * QueryServerTask.class); jobTool.addJob("checkMountTask",
       * "0 0/30 * * * ?", CheckMountTask.class);
       * jobTool.addJob("updateInstanceTask", "0 0/10 * * * ?",
       * UpdateInstanceTask.class); jobTool.addJob("updateHostTask",
       * "0 0/10 * * * ?", UpdateHostTask.class);
       * jobTool.addJob("instanceHaTask", "0 0/10 * * * ?",
       * InstanceHaTask.class); jobTool.addJob("hostMonitorTask",
       * "0 0/5 * * * ?", HostMonitorTask.class)
       */;
   }

}
