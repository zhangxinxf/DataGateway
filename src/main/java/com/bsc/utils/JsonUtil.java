package com.bsc.utils;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * 拼装json
 * 
 * @author zhangx
 * 
 */
public class JsonUtil {

	/**
	 * 输出正确或错误及消息JSON字符
	 * 
	 * @param msg
	 *            消息串
	 * @param success
	 *            响应正确或错误标识
	 * @return
	 */
	public static String jsonMsg(boolean status, String msg) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", status);
		map.put("msg", msg);
		return JSON.toJSONString(map);
	}

	/**
	 * 输出包含实体对象的JSON字符
	 */
	public static String jsonObject(boolean status, String msg, Object object) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", status);
		jsonObject.put("msg", msg);
		jsonObject.put("item", JSON.toJSONString(object));
		return jsonObject.toJSONString();
	}

	/**
	 * 输出包含实体对象的JSON字符
	 */
	public static String jsonObject(boolean status, String msg,
			Map<String, Object> map) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success", status);
		jsonObject.put("msg", msg);
		jsonObject.put("item", JSON.toJSONString(map));
		return jsonObject.toString();
	}
}
