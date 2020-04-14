/**
 * 生成UUID
 * @param len 长度
 * @param radix 基数 2进制 8进制 10进制 16进制
 * @returns uuid
 * 调用：var uuidstr = uuid(32,16);//生成32位长度的基数为16进制的uuid
 *  7FEA14A4722E273EE28C3F72E9E9141F
 */
export const uuid = function(len, radix){
    if (!len){
        len = 32;
    }
    if (!radix){
        len = 16;
    }
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}