import { func_print } from "./func_print"
import jwtDecode from "jwt-decode";

export const verify_role = (token: any) => {
    try {
        const token_aux: any = jwtDecode(token);
        if (token_aux.roles.includes("admin")) {
            return "admin"
        } else if (token_aux.roles.includes("tecnico")) {
            return "tecnico"
        } else {
            return ''
        }


    } catch (e) {
        func_print('verify_role', e, true)
        return ''


    }

}