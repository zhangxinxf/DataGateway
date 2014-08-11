package com.bsc.common;

import java.util.HashMap;
import java.util.Map;

public class BaseSearch {
	private PageBean page;
	
	private Map<String, Object> hashMap = new HashMap<String, Object>();

	public Map<String, Object> getHashMap() {
		return hashMap;
	}

	public void setHashMap(Map<String, Object> hashMap) {
		this.hashMap = hashMap;
	}

	public PageBean getPage() {
		return page;
	}

	public void setPage(PageBean page) {
		this.page = page;
	}
}