package com.bsc.model;


public class MetadataSubItem extends BaseEntity {

	private String subitemName;

	private String subitemDes;

	private Metadata metadata;


	public String getSubitemName() {
		return subitemName;
	}

	public void setSubitemName(String subitemName) {
		this.subitemName = subitemName == null ? null : subitemName.trim();
	}

	public String getSubitemDes() {
		return subitemDes;
	}

	public void setSubitemDes(String subitemDes) {
		this.subitemDes = subitemDes == null ? null : subitemDes.trim();
	}

	public Metadata getMetadata() {
		return metadata;
	}

	public void setMetadata(Metadata metadata) {
		this.metadata = metadata;
	}
}