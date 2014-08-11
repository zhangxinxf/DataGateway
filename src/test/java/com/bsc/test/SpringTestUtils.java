package com.bsc.test;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import com.bsc.common.BaseSearch;
import com.bsc.common.PageBean;
import com.bsc.exception.BusinessServiceException;
import com.bsc.service.IDbInfoService;
import com.bsc.service.ISubItemService;

@DirtiesContext
@ContextConfiguration(locations = { "classpath*:spring/applicationContext.xml" })
// @Configuration 要加入cglib增强代理
@ActiveProfiles("production")
public class SpringTestUtils extends AbstractJUnit4SpringContextTests {

	@Autowired
	private IDbInfoService userService;

	@Test
	public void testUser() {
		BaseSearch serBaseSearch = new BaseSearch();
		PageBean page = new PageBean();
		serBaseSearch.setPage(page);
		try {
			userService.findListPage(serBaseSearch);
		} catch (BusinessServiceException e) {
			e.printStackTrace();
		}
		// 手动释放资源
		AbstractApplicationContext abstractApplicationContext = (AbstractApplicationContext) applicationContext;
		abstractApplicationContext.close();
	}
}
