package com.bsc.soap.response;

import javax.xml.bind.annotation.XmlType;

import com.bsc.model.SubItem;
import com.bsc.soap.WsConstants;
import com.bsc.soap.response.base.WSResult;

@XmlType(name = "GetItemSubitem", namespace = WsConstants.NS)
public class GetUserResult extends WSResult {
	private SubItem itemSubitem;

	public SubItem getItemSubitem() {
		return itemSubitem;
	}

	public void setItemSubitem(SubItem itemSubitem) {
		this.itemSubitem = itemSubitem;
	}

}
