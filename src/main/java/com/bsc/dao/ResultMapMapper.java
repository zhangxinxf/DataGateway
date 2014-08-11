package com.bsc.dao;

import com.bsc.model.ResultMap;

public interface ResultMapMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ResultMap record);

    int insertSelective(ResultMap record);

    ResultMap selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ResultMap record);

    int updateByPrimaryKey(ResultMap record);
}