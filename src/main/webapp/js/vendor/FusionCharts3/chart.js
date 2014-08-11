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
     * ������xml�еĽڵ�
     * @param tag  node�ı�ǩ�� {String}
     * @param attr node������ {Object}
     * @param isClose node�Ƿ�ر� {Boolean}
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
        chart:{},//��Ӧ<chart>������
        categories:{ 
            attr:{}, //��Ӧ<categories>������
            category:{} //��Ӧ<categories>���ӽڵ�<category>������
        },
        dataset:{
            attr:{},//��Ӧ<dataset>������
            set:{} //��Ӧ<dataset>���ӽڵ�<set>������
        },
        styles:{
        	//��Ӧ<styles>���ӽڵ�<definition>����.definition�����Ԫ����Object���ͣ�
        	//ÿ��Ԫ�ض�Ӧһ��<style>������
            definition:[],
            //��Ӧ<styles>���ӽڵ�<application>����.application�����Ԫ����Object���ͣ�
            //ÿ��Ԫ�ض�Ӧһ��<apply>������
            application:[]
        },
        eachDataset:[],
        xml:""
    },
    _SStyleTemplate:{
        chart:{},//��Ӧ<chart>������
        set:{},
        styles:{
            //��Ӧ<styles>���ӽڵ�<definition>����.definition�����Ԫ����Object���ͣ�
            //ÿ��Ԫ�ض�Ӧһ��<style>������
            definition:[],
            //��Ӧ<styles>���ӽڵ�<application>����.application�����Ԫ����Object���ͣ�
            //ÿ��Ԫ�ض�Ӧһ��<apply>������
            application:[]
        },
        eachSet:[],
        xml:""
    },
   styles:{ },//�洢����õ���ʽ
   /**
    * ���ܣ�����Զ�����ʽ
   	* @param type flashͼ������.eg��MSColumn2D.swf��type = MSColumn2D��
    * @param name Ԥ������ʽ�����֣�Ĭ���ǡ�def��
    * @param style ��ʽ�б����ڶ�ϵ�е�flash��ʽ����ο�Chart.msStyleTemplate
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
     * ���ܣ�����ƶ�flashͼ�ε�Ԥ������ʽ
     * @param type flashͼ������.eg��MSColumn2D.swf��type = MSColumn2D��
     * @param name Ԥ������ʽ�����֣�Ĭ���ǡ�def��
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
     * ���ܣ���xml��<chart>�ڵ� ������Ի����޸�Ԥ���������
     * @param attr �����б�attr��������Object
     */
    addChart:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.chart,attr);
    },
    /**
     *���ܣ���xml��<Categories>�ڵ� ������Ի����޸�Ԥ���������
     * @param attr �����б�attr��������Object
     */
    addCategories:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.categories,attr);
    },
    /**
     *���ܣ���xml��<Category>�ڵ���ӽڵ�<Category> ������Ի����޸�Ԥ���������
     * @param attr �����б�attr��������Object
     */
    addCategory:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.categories.category,attr);
    },
    /**
     *���ܣ���xml��<dataset>�ڵ�������Ի����޸�Ԥ���������
     * @param attr �����б�attr��������Object
     */
    addDataset:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.dataset,attr);
    },
    /**
     *���ܣ���xml��<dataset>���ӽڵ�<set>�ڵ�������Ի����޸�Ԥ���������
     * @param attr �����б�attr��������Object
     */
    addSet:function(){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.dataset.set,attr);
    },
    /**
     * ���ܣ���<chart></chart>�в���xml���͵�����
     * @param xml ��xml��ʽ����
     */
    append:function(xml){
        xml = $.isString(xml) ? xml : "";
        this.selectedStyle.xml = xml ;
    },
    /**
     *���ܣ���������ÿ��dataset�Լ����ӽڵ�<set>������
     * @param array ����ÿ��dataset����ʽ��array������Ԫ�ص���ʽ
     * {
     *      attr:{}��//dataset������,��Ӧxml��<dataset>�е����� ����ѡ��
     *      set:{}��//dataset�ӽڵ�set�����ԣ���Ӧxml��<dataset>�ӽڵ�<set>�е����� ����ѡ��
     *      eachSet:[{},...] //dataset�ӽڵ�ÿ��set������ ����ѡ��
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

       //����xml�ļ���<categories>Ƭ��
        if(json.categories.length > 0)
        {
            attr = style.categories.category ;
            xml.push($.xmlNode("categories",style.categories.attr,false));
            $.each(json.categories,function(k,category){ xml.push($.xmlNode("category", $.extend(category,attr)));  });
            xml.push("</categories>") ;
        }

        //����xml�ļ���<dataset>Ƭ��
        size = json.dataset.length;
        var dsArray = style.eachDataset , dsAttr ,setAttr;
        if(size > 0 ){
            for(var i=0; i<size; i+=1){
                dsAttr = (dsArray.length > i) ? dsArray[i].attr :  style.dataset.attr ;
                attr = $.extend({},style.dataset.attr,dsAttr);
                xml.push($.xmlNode("dataset",attr,false));
                $.each(json.dataset.shift(), function(k,set){//����xml�ļ���<dataset>���ӽڵ�<set>Ƭ��
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

       //����xml�ļ���<styles>Ƭ��
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
     * ���ܣ�����ƶ�flashͼ�ε�Ԥ������ʽ
     * @param type flashͼ������.eg��MSColumn2D.swf��type = MSColumn2D��
     * @param name Ԥ������ʽ�����֣�Ĭ���ǡ�def��
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
     * ���ܣ���xml��<chart>�ڵ� ������Ի����޸�Ԥ���������
     * @param attr �����б�attr��������Object
     */
    addChart:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.chart,attr);

    },
    /**
     *���ܣ���xml��<Categories>�ڵ� ������Ի����޸�Ԥ���������
     * @param attr �����б�attr��������Object
     */
    addSet:function(attr){
        attr = $.isPlainObject(attr) ? attr : { } ;
        $.extend(this.selectedStyle.set,attr);
    },
    /**
     * ���ܣ���<chart></chart>�в���xml���͵�����
     * @param xml ��xml��ʽ����
     */
    append:function(xml){
        xml = $.isString(xml) ? xml : "";
        this.selectedStyle.xml = xml ;
    },
    /**
     *���ܣ���������ÿ��dataset�Լ����ӽڵ�<set>������
     * @param array ����ÿ��dataset����ʽ��array������Ԫ�ص���ʽ
     * {
     *      attr:{}��//dataset������,��Ӧxml��<dataset>�е����� ����ѡ��
     *      set:{}��//dataset�ӽڵ�set�����ԣ���Ӧxml��<dataset>�ӽڵ�<set>�е����� ����ѡ��
     *      eachSet:[{},...] //dataset�ӽڵ�ÿ��set������ ����ѡ��
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

        //����xml�ļ���<set>Ƭ��
        size = json.length ;
        var array = style.eachSet ;
        for(var i=0; i<size;i+=1){
            attr = array.length > i ? array[i] : style.set ;
            attr = $.extend({},attr,json.shift()) ;
            xml.push($.xmlNode("set",attr,true)) ;
        }

        //����xml�ļ���<styles>Ƭ��
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
     * ���ܣ���ʾflashͼ��
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