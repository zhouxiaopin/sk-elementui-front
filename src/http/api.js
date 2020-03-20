/* 
 * 接口统一集成模块
 */
import * as Login from './modules/login'
import * as SysUser from './modules/sysUser'
import * as SysRole from './modules/sysRole'
import * as SysPermis from './modules/sysPermis'
import * as SysResource from './modules/sysResource'
import * as SysLog from './modules/sysLog'
import * as SysSqlConf from './modules/sysSqlConf'
import * as SysDict from './modules/sysDict'



// 默认全部导出
export default {
    Login,
    SysUser,
    SysRole,
    SysPermis,
    SysResource,
    SysLog,
    SysSqlConf,
    SysDict
}