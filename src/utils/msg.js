/*Message 消息提示*/
import { Message } from 'element-ui';

export const tip = function (msg) {
    Message(msg);
};
export const success = function (msg) {
    Message({
        message: msg,
        type: 'success'
    });
};
export const warning = function (msg) {
    Message({
        message: msg,
        type: 'warning'
    });
};
export const error = function (msg) {
    Message({
        message: msg,
        type: 'error'
    });
};
