import { func_print } from "./func_print"

export const isValidEmail = (email: any) => {
    try {
        return /\S+@\S+\.\S+/.test(email);

    } catch (e) {
        func_print('verify_role', e, true)
        return false


    }

}