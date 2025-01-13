import * as CryptoJS from 'crypto-js';


export const converter_valor_para_hash = (inputValue: number | string) => {
   
    const valor_hash = CryptoJS.MD5(inputValue.toString()).toString()
   
    return valor_hash;
};

