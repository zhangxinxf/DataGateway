package com.bsc.common;

import java.util.ArrayList;
import java.util.List;

/**
 * 分页使用的对象
 * 
 * @author hudaowan
 * @version iSwap V5.0
 * @date 2009-2-4 下午05:44:43
 * @Team 数据交换平台研发小组
 */
public class PageBean {

   private String pageUrl;// 分页的Url
   private int perPage = 10;// Records per page;
   private long total = 0;// Total record;
   private int index = 1;// The page num which is loaded from,one based;
   private long pageCount = 0;// 总页数
   private List<String> pageList;// 页码list
   private int upNo;// 上一页
   private int nextNo;// 下一页

   public String getPageUrl() {
      return pageUrl;
   }

   public void setPageUrl(String pageUrl) {
      this.pageUrl = pageUrl;
   }

   public void setIndex(int index) {
      this.index = index;
   }

   public int getPerPage() {
      return perPage;
   }

   public void setPerPage(int perPage) {
      this.perPage = perPage;
   }

   public long getTotal() {
      return total;
   }

   public void setTotal(long total) {
      this.total = total;
   }

   public int getStart() {
      int startNum = Long.valueOf(this.getPageCount()).intValue();
      if (index > startNum) {
         index = startNum;
      }
      return (index - 1) * perPage;
   }

   public int getIndex() {
      if (index <= 0) {
         index = 1;
      }
      return index;
   }

   public long getPageCount() {
      if (total % perPage == 0) {
         pageCount = total / perPage;
      } else {
         pageCount = total / perPage + 1;
      }

      return pageCount;
   }

   public int getNextNo() {
      if (this.pageCount == this.index) {
         nextNo = this.index;
      } else {
         nextNo = this.index + 1;
      }
      return nextNo;
   }

   public int getUpNo() {
      if (this.index == 1) {
         upNo = 1;
      } else {
         upNo = this.index - 1;
      }
      return upNo;
   }

   public List<String> getPageList() {
      pageList = new ArrayList<String>();
      for (int i = 1; i <= this.pageCount; i++) {
         pageList.add(String.valueOf(i));
      }
      return pageList;
   }
}
