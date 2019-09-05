// JSAPI样例
hilink.jsApiSample(
    "deviceName",	//String, 设备名称
    sid,	// Number, Service Id
    true,       // Boolean, 设备状态
    body,	//String, json格式内容
      "jsApiSampleCallback" //String，回调函数名称，该名称需与开发者实际定义的回调函数名保持一致。
    );
    
    // 回调函数样例
    function jsApiSampleCallback(resultStr) {
       console.log(resultStr);
    }
    