/**
 * 查询提交
 * 
 * @param url
 */
function searchFrom(url,index){
	$("#optType").attr("value",index);
	$("#searchForm").attr("action",url);
    $("#searchForm").submit();
}

function exportLogExcel(url,index,pageTotal)
{
	 $.msgBox({
		    title:"导出excel",
		    content:"请选择excel的导出方式",
		    type:"confirm",
		    height:200,
		    width:300,
		    buttons: [
		              { value: "导出本页" },
		              { value: "导出全部" },
		              { value: "取消" }
		              ],
		    success: function (result) {
		       if(result == "导出全部")
 		        {
				if (url.indexOf("?") != -1) {
					url = url + "&exportType=all&pageTotal="+pageTotal;
				} else {
					url = url + "?exportType=all&pageTotal="+pageTotal;
				}
				searchFrom(url);
			}else if(result == "导出本页")
		        {
		        	 gotoPage(index,url);
		        }
		    }
		 });
}

