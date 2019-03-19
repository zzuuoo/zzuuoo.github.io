function utc2beijing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp/1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp+8*60*60;

    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime; // 2017-03-31 16:02:06
} 
    $(function(){    
        $.ajax({    
            //请求方式    
            type:"GET",    
            //文件位置    
            url:"https://api.github.com/repos/zzuuoo/blog/issues",  
            //返回数据格式为json,也可以是其他格式如    
            dataType: "json",    
            //请求成功后要执行的函数，拼接html    
            success: function(data){    
                var converter = new showdown.Converter(); //初始化转换器
                // var htmlcontent  = converter.makeHtml(content); //将MarkDown转为html格式的内容
				var str;
                $.each(data,function(i,n){   
					str="<div class=\"fh5co-entry padding\">"
					+"<img src=\"images/project-8.jpg\" alt=\"Free HTML5 Bootstrap Template by \">"
					+"<div><span class=\"fh5co-post-date\">  ";  
					str+=utc2beijing(n.created_at)+"</span>"
					str+="<h2><a href=\"./blog/general_blog.html"+"?url="+n.url+"\">"+n.title+"</a></h2>";  
                    // str+="<p>"+converter.makeHtml(n.body)+"</p>";  
					str+="</div></div>";    
				$("#blog_content").append(str);    
				console.log(str)
                });    
                
            }    
        });    
    });    