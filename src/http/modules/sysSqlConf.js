import axios from '../axios'
/*
* 系统sql语句配置模块
*/

/*SysSqlConfQueryVo sysSqlConfQueryVo = new SysSqlConfQueryVo();

SysSqlConfCustom sysSqlConfCustom = new SysSqlConfCustom();
sysSqlConfCustom.setScCode(this.getScCode());
sysSqlConfCustom.setRecordStatus(SysConst.RecordStatus.ABLE);

sysSqlConfQueryVo.setSysSqlConfCustom(sysSqlConfCustom);
ServerResponse<List<SysSqlConfCustom>> serverResponse = sysSqlConfService.queryObjs(sysSqlConfQueryVo);
List<SysSqlConfCustom> sysSqlConfCustoms = serverResponse.getData();*/

// 根据条件查询记录（非分页）
export const queryAllByCondition = data => {
    return axios({
        url: 'sysSqlConf/queryAllByCondition',
        method: 'post',
        data
    })
}
