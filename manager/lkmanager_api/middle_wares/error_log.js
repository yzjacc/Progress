import Error_log from './../models/Error'

export default (errLog, req, res, next)=>{
    const error_log = new Error_log({
        // 错误名称
        error_name:  errLog.name,
        // 错误消息
        error_message: errLog.message,
        // 错误堆栈
        error_stack: errLog.stack,
    });

    error_log.save((err, result)=>{
        res.json({
            err_code: 500,
            result: '服务器内部错误!',
            message: errLog.message
        });
    });
}