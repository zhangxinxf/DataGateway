$.extend({
    isText: function(o){
        return ($.isNull(o) || $.isUndefined(o))? false :
                ($.isString(o) || $.isNumber(o) || $.isBoolean(o)) ;
    },
    
    isUndefined:function(o){
        return typeof(o) === "undefined" ;
    },
    
    isNull:function(o){
        return o === null ;
    },
    
    isNumber:function(o){
        return (o === 0 || o) && o.constructor === Number;
    },
    
    isString:function(o){
        return (o === "" || o) && (o.constructor === String);
    },
    
    isArray:function(o){
        return o && (o.constructor === Array);
    },
    isNullOrUndefined:function(o){
        return $.isUndefined(o) || $.isNull(o) ;
    },
    
    isBoolean:function(o){
        return (o === false || o) && (o.constructor === Boolean);
    },
    
    /**
     * 描述：xml中的节点
     * @param tag  node的标签名 {String}
     * @param attr node的属性 {Object}
     * @param isClose node是否关闭 {Boolean}
     */
    xmlNode:function(tag,attr,isClose){
        var xml = [] ,val ;
        tag = $.isString(tag) ? tag : "";
        attr = $.isPlainObject(attr) ? attr : {} ;
        isClose = $.isBoolean(isClose) ? isClose : true ;

        if($.trim(tag) != ""){
            xml.push("<"+tag);
            for(k in attr){
                val = attr[k] ;
                xml.push($.isString(val) ? ([' ',k,"='",val,"'"].join('')):"");
            }
            isClose ? xml.push(" />") : xml.push(" >") ;
        }

        return xml.join('');
    }

});

var Chart = {
    _MStyleTemplate:{
        chart:{},//对应<chart>的属性
        categories:{ 
            attr:{}, //对应<categories>的属性
            category:{} //对应<categories>的子节点<category>的属性
        },
        dataset:{
            attr:{},//对应<dataset>的属性
            set:{} //对应<dataset>的子节点<set>的属性
        },
        styles:{
        	//对应<styles>的子节点<definition>属性.definition数组的元素是Object类型，
        	//每个元素对应一个<style>的属性
            definition:[],
            //对应<styles>的子节点<application>属性.application数组的元素是Object类型，
            //每个元素对应一个<apply>的属性
            application:[]
        },
        eachDataset:[],
        xml:""
    },
    _SStyleTemplate:{
        chart:{},//对应<chart>的属性
        set:{},
        styles:{
            //对应<styles>的子节点<definition>属性.definition数组的元素是Object类型，
            //每个元素对应一个<style>的属性
            definition:[],
            //对应<styles>的子节点<application>属性.application数组的元素是Object类型，
            //每个元素对应一个<apply>的属性
            application:[]
        },
        eachSet:[],
        xml:""
    },
   styles:{ },//存储定义好的样式
   /**
    * 功能：添加自定义样式
   	* @param type flash图形名字.eg：MSColumn2D.swf的type = MSColumn2D等
    * @param name 预定义样式的名字，默认是“def”
    * @param style 样式列表，对于对系列的flash样式定义参看Chart.msStyleTemplate
    */
   addStyle:function(type,name,style){
       name = name ? name : "def" ;
       if(!$.isNullOrUndefined(type)){
           if($.isPlainObject(style)){
        	   if($.isUndefined(this.styles[type])){
        		   this.styles[type] = {name:{}};
        	   }
        	   this.styles[type][name] = style ;
           }
       }
   }
};


var MChart = function(cfg,data){
    this.cfg = $.extend({
        swf:"",
        width : 0 ,
        height:0,
        style:'def',
        id:"_"+new Date().getDate().toString(32)
    },cfg);
    this.data = $.isNullOrUndefined(data) ? [] : data ;
    this.type = "" ;
    this.selectedStyle = {} ;
    this._init();
};

MChart.prototype = {

    _init:function(){
        this._initType();
        this.selectedStyle = this.getStyle(this.type,this.cfg.style);
    },
    _initType:function(){
        var swf = this.cfg.swf ,
                len = swf.length ,
                index ;
        index = swf.lastIndexOf("/");
        this.type  =  swf.substring(index+1,len-4) ;
    },
    /**
     * 功能：获得制定flash图形的预定的样式
     * @param type flash图形名字.eg：MSColumn2D.swf的type = MSColumn2D等
     * @param name 预定义样式的名字，默认是“def”
     */
    getStyle:function(type,name){
        name = name ? name : "def" ;
        var style = $.extend({},Chart._MStyleTemplate) ;
        if($.isNullOrUndefined( Chart.styles[type]) ||
                $.isNullOrUndefined( Chart.styles[type][name])){
            return  style ;
        }else {
            return $.extend(style,Chart.styles[type][name]) ;
        }
    },
    /**
     * 功能：对xml中<chart>节点 添加属性或者修改预定义的属性
     * @param attr 属性列表。attr数据类型Object
     */
    addChart:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.chart,attr);
    },
    /**
     *功能：对xml中<Categories>节点 添加属性或者修改预定义的属性
     * @param attr 属性列表。attr数据类型Object
     */
    addCategories:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.categories,attr);
    },
    /**
     *功能：对xml中<Category>节点的子节点<Category> 添加属性或者修改预定义的属性
     * @param attr 属性列表。attr数据类型Object
     */
    addCategory:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.categories.category,attr);
    },
    /**
     *功能：对xml中<dataset>节点添加属性或者修改预定义的属性
     * @param attr 属性列表。attr数据类型Object
     */
    addDataset:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.dataset,attr);
    },
    /**
     *功能：对xml中<dataset>的子节点<set>节点添加属性或者修改预定义的属性
     * @param attr 属性列表。attr数据类型Object
     */
    addSet:function(){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.dataset.set,attr);
    },
    /**
     * 功能：在<chart></chart>中插入xml类型的数据
     * @param xml ：xml格式数据
     */
    append:function(xml){
        xml = $.isString(xml) ? xml : "";
        this.selectedStyle.xml = xml ;
    },
    /**
     *功能：单独设置每个dataset以及其子节点<set>的属性
     * @param array 定义每个dataset的样式，array数组中元素的形式
     * {
     *      attr:{}，//dataset的属性,对应xml中<dataset>中的属性 【可选】
     *      set:{}，//dataset子节点set的属性，对应xml中<dataset>子节点<set>中的属性 【可选】
     *      eachSet:[{},...] //dataset子节点每个set的属性 【可选】
     * }
     *
     */
    addEachDataset:function(array){ //[{attr,set:{},eachSet:[]},{}]

        var element ;
        var len = $.isArray(array) ? array.length : 0 ;
        for(var i=0; i<len; i+=1){
            element = array.shift();
            if($.isPlainObject(element)){
                if(element.hasOwnProperty("attr") ||
                        element.hasOwnProperty("set") ||
                        element.hasOwnProperty("eachSet") ){
                    this.selectedStyle.eachDataset.push(element);
                }
            }
        }
    },
    _dataChart:function(){
        var template = {  categories:[],  dataset:[] },
                data = this.data , size ;

        size = data.categories.length ;
        for(var i = 0; i<size; i+=1){
            template.categories.push({"label":data.categories.shift()});
        }

        var len = data.dataset.length ,sets ,array;
        for(var i =0; i<len; i+=1){
            array = [] ;
            sets = data.dataset.shift();
            for(var k =0; k<size; k+=1){
                array.push({value:sets.shift()});
            }
            template.dataset.push(array);
        }

        return template ;

    },
    _xmlChart:function(){
        var style = this.selectedStyle;
        var json  =  this._dataChart();
        var attr, size , xml= [] ;

        attr = style.chart ;
        xml.push($.xmlNode("chart",attr,false));

       //创建xml文件中<categories>片段
        if(json.categories.length > 0)
        {
            attr = style.categories.category ;
            xml.push($.xmlNode("categories",style.categories.attr,false));
            $.each(json.categories,function(k,category){ xml.push($.xmlNode("category", $.extend(category,attr)));  });
            xml.push("</categories>") ;
        }

        //创建xml文件中<dataset>片段
        size = json.dataset.length;
        var dsArray = style.eachDataset , dsAttr ,setAttr;
        if(size > 0 ){
            for(var i=0; i<size; i+=1){
                dsAttr = (dsArray.length > i) ? dsArray[i].attr :  style.dataset.attr ;
                attr = $.extend({},style.dataset.attr,dsAttr);
                xml.push($.xmlNode("dataset",attr,false));
                $.each(json.dataset.shift(), function(k,set){//创建xml文件中<dataset>的子节点<set>片段
                    setAttr = (dsArray.length > i)?
                            ((dsArray[i].eachSet && dsArray[i].eachSet.length > k ) ?
                                    dsArray[i].eachSet[k] :
                                    ((dsArray[i].set) ?dsArray[i].set : style.dataset.set )  ):
                            style.dataset.set ;
                    attr = $.extend({},style.dataset.set,setAttr);
                    xml.push(  $.xmlNode("set",$.extend(set,attr)) ) ;
                });
                xml.push("</dataset>");
            }
        }

       //创建xml文件中<styles>片段
        if(style.styles.definition.length > 0  && style.styles.application.length > 0)
        {
            xml.push("<styles>");
            xml.push("<definition>");
            $.each(style.styles.definition,function(i,obj){ xml.push($.xmlNode("style",obj));  });
            xml.push("</definition>");
            xml.push("<application>");
            $.each(style.styles.application,function(i,obj){  xml.push($.xmlNode("apply",obj));  });
            xml.push("</application>");
            xml.push("</styles>");
        }
        xml.push(style.xml);
        xml.push("</chart>");
        $("body").append(xml.join(''));
        return xml.join('');
    },
    render:function(id){
        var cfg = this.cfg ,xml ;
        xml = this._xmlChart() ;
        var myChart =new FusionCharts(cfg.swf, cfg.id, cfg.width ,cfg.height, "0", "0");
        myChart.setDataXML(xml);
        myChart.render(id);
    }

};


/**
 * ****************************************************************************************************
 */

var SChart = function(cfg,data){
    this.cfg = $.extend({
        swf:"",
        width : 0 ,
        height:0,
        style:'def',
        id:"_"+new Date().getDate().toString(32)
    },cfg);
    this.data = $.isNullOrUndefined(data) ? [] : data ;
    this.type = "" ;
    this.selectedStyle = {} ;
    this._init();
};

SChart.prototype = {

    _init:function(){
        this._initType();
        this.selectedStyle = this.getStyle(this.type,this.cfg.style);
    },
    _initType:function(){
        var swf = this.cfg.swf ,
            len = swf.length ,
            index ;
        index = swf.lastIndexOf("/");
        this.type  =  swf.substring(index+1,len-4) ;
    },
    /**
     * 功能：获得制定flash图形的预定的样式
     * @param type flash图形名字.eg：MSColumn2D.swf的type = MSColumn2D等
     * @param name 预定义样式的名字，默认是“def”
     */
    getStyle:function(type,name){
        name = name ? name : "def" ;
        var style = $.extend({},Chart._SStyleTemplate) ;
        if($.isNullOrUndefined( Chart.styles[type]) ||
            $.isNullOrUndefined( Chart.styles[type][name])){
            return  style ;
        }else {
            return $.extend(style,Chart.styles[type][name]) ;
        }
    },
    /**
     * 功能：对xml中<chart>节点 添加属性或者修改预定义的属性
     * @param attr 属性列表。attr数据类型Object
     */
    addChart:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.chart,attr);

    },
    /**
     *功能：对xml中<Categories>节点 添加属性或者修改预定义的属性
     * @param attr 属性列表。attr数据类型Object
     */
    addSet:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.set,attr);
    },
    /**
     * 功能：在<chart></chart>中插入xml类型的数据
     * @param xml ：xml格式数据
     */
    append:function(xml){
        xml = $.isString(xml) ? xml : "";
        this.selectedStyle.xml = xml ;
    },
    /**
     *功能：单独设置每个dataset以及其子节点<set>的属性
     * @param array 定义每个dataset的样式，array数组中元素的形式
     * {
     *      attr:{}，//dataset的属性,对应xml中<dataset>中的属性 【可选】
     *      set:{}，//dataset子节点set的属性，对应xml中<dataset>子节点<set>中的属性 【可选】
     *      eachSet:[{},...] //dataset子节点每个set的属性 【可选】
     * }
     *
     */
    addEachSet:function(array){ //[{attr,set:{},eachSet:[]},{}]

        var element ;
        var len = $.isArray(array) ? array.length : 0 ;
        for(var i=0; i<len; i+=1){
            element = array.shift();
            if($.isPlainObject(element)){
                this.selectedStyle.eachSet.push(element);
            }
        }
    },
    _dataChart:function(){
        var template = [], data = this.data , size,obj ;

        size = data.length ;
        for(var i = 0; i<size; i+=1){
          obj = data.shift();
          if(obj.label){
              template.push({label:obj.label,value:obj.value});
          }
        }

        return template ;
    },
    _xmlChart:function(){
        var style = this.selectedStyle;
        var json  =  this._dataChart();
        var attr, size , xml= [] ;

        attr = style.chart ;
        xml.push($.xmlNode("chart",attr,false));

        //创建xml文件中<set>片段
        size = json.length ;
        var array = style.eachSet ;
        for(var i=0; i<size;i+=1){
            attr = array.length > i ? array[i] : style.set ;
            attr = $.extend({},attr,json.shift()) ;
            xml.push($.xmlNode("set",attr,true)) ;
        }

        //创建xml文件中<styles>片段
        if(style.styles.definition.length > 0  && style.styles.application.length > 0)
        {
            xml.push("<styles>");
            xml.push("<definition>");
            $.each(style.styles.definition,function(i,obj){ xml.push($.xmlNode("style",obj));  });
            xml.push("</definition>");
            xml.push("<application>");
            $.each(style.styles.application,function(i,obj){  xml.push($.xmlNode("apply",obj));  });
            xml.push("</application>");
            xml.push("</styles>");
        }
        xml.push(style.xml);
        xml.push("</chart>");
        $("body").append(xml.join(''));
        return xml.join('');
    },
    /**
     * 功能：显示flash图形
     * @param id
     */
    render:function(id){
        var cfg = this.cfg ,xml ;
        xml = this._xmlChart() ;
        var myChart =new FusionCharts(cfg.swf, cfg.id, cfg.width, cfg.height, "0", "0");
        myChart.setDataXML(xml);
        myChart.render(id);
    }

};