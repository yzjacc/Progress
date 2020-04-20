class LKTool {
    fileToBase64Url(file, callback){
        // 1. 修改图片的信息
        let src = '';
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
        }else {
            src = '';
        }
        // 2. 阅读器已经解析完毕
        reader.onloadend = ()=>{
            src = reader.result;
            // 回调返回
            callback && callback(src);
        }
    }
}

export default LKTool;