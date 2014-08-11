package com.bsc.soap;

import javax.jws.WebService;

import org.apache.commons.lang.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.bsc.exception.BusinessServiceException;
import com.bsc.mapper.BeanMapper;
import com.bsc.model.Item;
import com.bsc.service.IItemService;
import com.bsc.service.ISubItemService;
import com.bsc.soap.response.GetItemDetailResult;
import com.bsc.soap.response.base.WSResult;

/**
 * WebService服务端实现类.
 * 
 * 为演示方便，直接调用了Dao层.客户端实现见功能测试用例.
 * 
 * @author calvin
 */
// serviceName指明WSDL中<wsdl:service>与<wsdl:binding>元素的名称,
// endpointInterface属性指向Interface类全称.
@WebService(serviceName = "AccountService", endpointInterface = "com.bsc.soap.AccountSoapService", targetNamespace = WsConstants.NS)
public class AccountSoapServiceImpl implements AccountSoapService {

	private static Logger logger = LoggerFactory
			.getLogger(AccountSoapServiceImpl.class);

	@Autowired
	private IItemService itemService;
	@Autowired
	private ISubItemService itemSubitemService;

	/**
	 * @see AccountSoapService#getTeamDetail(Long)
	 */
	@Override
	public GetItemDetailResult getItemDetail(Integer id) {
		GetItemDetailResult result = new GetItemDetailResult();
		try {

			Validate.notNull(id, "id参数为空");

			Item item = itemService.findById(id);
			Validate.notNull(item, "项目不存在(id:" + id + ")");

			Item dto = BeanMapper.map(item, Item.class);
			result.setItem(dto);
			return result;
		} catch (IllegalArgumentException e) {
			return handleParameterError(result, e);
		} catch (RuntimeException e) {
			return handleGeneralError(result, e);
		} catch (BusinessServiceException e) {
			e.printStackTrace();
		}
		return null;
	}


	private <T extends WSResult> T handleParameterError(T result, Exception e) {
		logger.error(e.getMessage());
		result.setError(WSResult.PARAMETER_ERROR, e.getMessage());
		return result;
	}

	private <T extends WSResult> T handleGeneralError(T result, Exception e) {
		logger.error(e.getMessage());
		result.setDefaultError();
		return result;
	}
}
