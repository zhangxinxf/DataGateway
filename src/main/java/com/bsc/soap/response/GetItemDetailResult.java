package com.bsc.soap.response;

import javax.xml.bind.annotation.XmlType;

import com.bsc.model.Item;
import com.bsc.soap.WsConstants;
import com.bsc.soap.response.base.WSResult;

@XmlType(name = "GetItemResult", namespace = WsConstants.NS)
public class GetItemDetailResult extends WSResult {

	private Item  item;

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

}
