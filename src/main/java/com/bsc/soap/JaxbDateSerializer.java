package com.bsc.soap;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.bind.annotation.adapters.XmlAdapter;

/**
 * JAXB时间转换类
 * 
 * @author zhangx
 * 
 */
public class JaxbDateSerializer extends XmlAdapter<String, Date> {

	private SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd-yyyy");

	@Override
	public Date unmarshal(String date) throws Exception {
		return dateFormat.parse(date);
	}

	@Override
	public String marshal(Date date) throws Exception {
		return dateFormat.format(date);
	}

}
