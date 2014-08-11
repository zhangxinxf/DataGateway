package com.bsc.exception;

import java.io.PrintStream;
import java.io.PrintWriter;

/**
 * BusinessService层的异常处理
 * 	@author zhangx
 */
public class BusinessServiceException extends Exception {

   private static final long serialVersionUID = -8582869876478864758L;
   private Throwable nestedThrowable = null;
   private String errorCode;

   public BusinessServiceException() {
      super();
   }

   public BusinessServiceException(String errorCode) {
      super();
      this.errorCode = errorCode;
   }

   public BusinessServiceException(Throwable nestedThrowable) {
      this.nestedThrowable = nestedThrowable;
   }

   public BusinessServiceException(String msg, String errorCode) {
      super(msg);
      this.errorCode = errorCode;
   }

   public BusinessServiceException(String msg, String errorCode,
         Throwable nestedThrowable) {
      super(msg);
      this.errorCode = errorCode;
      this.nestedThrowable = nestedThrowable;
   }

   public BusinessServiceException(String msg, Throwable nestedThrowable) {
      super(msg);
      this.nestedThrowable = nestedThrowable;
   }

   public void printStackTrace() {
      super.printStackTrace();
      if (nestedThrowable != null) {
         nestedThrowable.printStackTrace();
      }
   }

   public void printStackTrace(PrintStream ps) {
      super.printStackTrace(ps);
      if (nestedThrowable != null) {
         nestedThrowable.printStackTrace(ps);
      }
   }

   public void printStackTrace(PrintWriter pw) {
      super.printStackTrace(pw);
      if (nestedThrowable != null) {
         nestedThrowable.printStackTrace(pw);
      }
   }

   public String getErrorCode() {
      return errorCode;
   }

   public void setErrorCode(String errorCode) {
      this.errorCode = errorCode;
   }

   public static void serviceException(Throwable e) throws BusinessServiceException {
      String msg = "";
      String errorCode = "";
      if (e instanceof BusinessServiceException) {
         BusinessServiceException serviceException = (BusinessServiceException) e;
         errorCode = serviceException.getErrorCode();
         msg = e.getMessage();
      }
      throw new BusinessServiceException(msg, errorCode, e);
   }
}
