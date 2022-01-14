"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
const getResponseData = (data, errMsg) => {
    if (errMsg) {
        return {
            success: false,
            errMsg,
            data,
        };
    }
    return {
        success: true,
        data,
    };
};
exports.getResponseData = getResponseData;
