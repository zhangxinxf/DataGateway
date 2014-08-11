package com.bsc.model;

import java.util.Date;

public class Metadata  extends BaseEntity{

    private String metadataName;

    private String metadataDes;
    

    public String getMetadataName() {
        return metadataName;
    }

    public void setMetadataName(String metadataName) {
        this.metadataName = metadataName == null ? null : metadataName.trim();
    }

    public String getMetadataDes() {
        return metadataDes;
    }

    public void setMetadataDes(String metadataDes) {
        this.metadataDes = metadataDes == null ? null : metadataDes.trim();
    }
    
}