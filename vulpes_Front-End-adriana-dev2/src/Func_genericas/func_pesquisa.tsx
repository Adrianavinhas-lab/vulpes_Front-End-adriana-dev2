import moment from "moment";
import { func_print } from "./func_print";

export const handler_pesquisa = (lista: any, lista_key: Array<string>, string_para_pesquisar: string) => {
    try {
        func_print('string_para_pesquisar', string_para_pesquisar)
        let aux_list: any = []
        if (string_para_pesquisar.length === 0) {
            return lista
        } else {
            lista.forEach((el: any) => {
                lista_key.forEach((key: any) => {
                    
                    if ((el[key].toString()).toLowerCase().includes(string_para_pesquisar.toString().toLowerCase())) {
                        aux_list.push(el)
                    } else if (moment(new Date((el[key]).toString())).format('DD/MM/YYYY') !== undefined && moment(new Date((el[key])).toString()).format('DD/MM/YYYY').includes(string_para_pesquisar.toString().toLowerCase())) {
                        aux_list.push(el)
                    }
                })
            });
            let list_to_return: any = Array.from(new Set(aux_list));//[... new Set(aux_list)]
            return list_to_return
        }
    } catch (error) {
        func_print('handler_pesquisa', error, true)
        return []
    }
}