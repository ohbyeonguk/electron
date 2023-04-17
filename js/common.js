
var total = 0;
var success = 0;
var fail = 0;
var urlArray = [
    {
        "category": "OKPOS",
        "name": "홈페이지",
        "url" : "https://okpos.co.kr",
        "code": 200
    },
    {
        "category": "OKPOS",
        "name": "공용 ASP WEB",
        "url" : "https://asp.netusys.com",
        "code": 200
    },
    {
        "category": "OKPOS",
        "name": "나정통 전용 WEB",
        "url" : "https://nice.okpos.co.kr/login/login_form.jsp",
        "code": 200
    },
    {
        "category": "OKPOS",
        "name": "키정통 전용 WEB",
        "url" : "https://kis.okpos.co.kr/login/login_form.jsp",
        "code": 200
    },
    {
        "category": "나이스오더",
        "name": "앱",
        "url" : "https://api.niceorder.co.kr:8090/api/v1.0/healthCheck",
        "code": 200
    },
    {
        "category": "나이스오더",
        "name": "가맹점용 KDS",
        "url" : "https://api.niceorder.co.kr:8100/api/v1.0/healthCheck",
        "code": 200
    },
    {
        "category": "나이스오더",
        "name": "파트너센터",
        "url" : "https://partner.niceorder.co.kr/login",
        "code": 200
    },
    {
        "category": "단골플러스",
        "name": "에이전트",
        "url" : "https://agent.dgplus.co.kr:4430",
        "code": 404
    },
    {
        "category": "단골플러스",
        "name": "파트너센터",
        "url" : "https://ptn.dgplus.co.kr/home.nice",
        "code": 200
    },
    {
        "category": "단골플러스",
        "name": "키오스크API",
        "url" : "https://api.nxth.io/web/indexLogin",
        "code": 200
    },
    {
        "category": "배달매니저",
        "name": "메인화면",
        "url" : "https://okgo.okpos.co.kr",
        "code": 200
    },
    {
        "category": "배달매니저",
        "name": "API",
        "url" : "https://api.niceorder.co.kr:8090/api/v1.0/healthCheck",
        "code": 200
    },
    {
        "category": "배달매니저",
        "name": "메시지서버",
        "url" : "https://dum.okpos.co.kr/api/healthCheckRabbitMq",
        "code": 200
    },
    {
        "category": "오늘얼마",
        "name": "앱",
        "url" : "https://maapp.okpos.co.kr:8080/healthCheck",
        "code": 200
    }
]
function statusCheck() {
    total = 0;
    success = 0;
    fail = 0;
    var categoryCount = 0;
    var rowCount = 1;
    // 방어코드 개념
    if ($("#tbl tr").length == urlArray.length) {
        for(var i = 0; i < urlArray.length; i++ ){
            statusFn(i, urlArray[i]);
        }
        var now = new Date();
        $('h2 #time').html(dateFormat(now));
    } else {
        $("#tbl").empty();
        for(var i = 0; i < urlArray.length; i++ ){

            var rowTdid = ''
            var html = '';
            html += '<tr>';
                
            if (i == 0) {
                categoryCount = 1
                html += '<td id="category_'+categoryCount+'" rowspan="1">'+urlArray[i].category+'</td>';
            } else {
                if (urlArray[i].category == urlArray[i-1].category) {
                    rowCount += 1;
                } else {
                    document.getElementById("category_"+categoryCount).setAttribute("rowspan",rowCount)
                    categoryCount += 1;
                    html += '<td id="category_'+categoryCount+'">'+urlArray[i].category+'</td>';
                    rowCount = 1;
                }
            }
            html += '<td>'+urlArray[i].name+'</td>';
            html += '<td>'+urlArray[i].url+'</td>';
            html += '<td>'+urlArray[i].code+'</td>';
            html += '<td id="status_'+ i +'">'+'</td>';
            html += '</tr>';
            $("#tbl").append(html);
            statusFn(i, urlArray[i])
        }
        var now = new Date();
        $('h2 #time').html(dateFormat(now));
    }
    
}
/**
 * Ajax 요청 후 상태값 표시 
 * @param index : i
 * @param urlData : 
 */
function statusFn(index, urlData) {
    total += 1
    $.ajax({
        url: urlData.url,
        jsonp: "$jsonp",
        dataType: "json",
        error: function(request){
            // console.log("==================================================================")
            if (request.status == urlArray[index].code) {
                $('#status_'+index).addClass('lv')
                success += 1
            } else {
                $('#status_'+index).addClass('lvError')
                fail += 1
            }
            // console.log(index)
            // console.log(request)
            // console.log(request.status)
            // console.log(request.statusText)
            // console.log("==================================================================")
            $('#total').html(total);
            $('#success').html(success);
            $('#fail').html(fail);
        }
    })
}
function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}