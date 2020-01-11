/* 
 * 接口统一集成模块
 */
import * as login from './modules/login'
import * as sysUser from './modules/sysUser'
import * as sysRole from './modules/sysRole'
import * as sysResource from './modules/sysResource'
import * as sysLog from './modules/sysLog'
import * as sysSqlConf from './modules/sysSqlConf'



// 默认全部导出
export default {
    login,
    sysUser,
    sysRole,
    sysResource,
    sysLog,
    sysSqlConf
}