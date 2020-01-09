import {config,logLevelObj} from '@/config/config'

/**
 * 自定义日志工具
 * @type {{warn: log.warn, debug: log.debug, error: log.error, info: log.info}}
 */
const log = {
    debug:(params)=>{
        logger(params, logLevelObj.debug)
    },
    info(params){
        logger(params, logLevelObj.info)
    },
    warn(params){
        logger(params, logLevelObj.warn)
    },
    error(params){
        logger(params, logLevelObj.info)
    }
};
const logger = function (params, level) {
    if (config.logLevel<level){
        return;
    }
    switch (level) {
        case logLevelObj.debug:
            // window.console.info(params);
            window.console.log('%cSK日志, 输出: ', 'color:green', params)
            break;
        case logLevelObj.info:
            // window.console.info(params);
            window.console.log('%cSK日志, 输出: ', 'color:blue', params)
            break;
        case logLevelObj.warn:
            window.console.info(params);
            break;
        case logLevelObj.error:
            window.console.error(params);
            break;
    }
};
export default log