import jwtDecode from "jwt-decode";
import api from "../Services/api";
import { func_print } from "../Func_genericas/func_print";

export const useApi = () => ({
 
  signin: async (dados: any) => {
    try {

      const response = await api.post("/autentica", dados, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    

      if (response.status === 200) {
        const token: any = jwtDecode(response.data.access_token);

        localStorage.setItem('token', response.data.access_token);
        return { flag: true, data: response, token:token };

      } else if (response.status === 401) {
        localStorage.removeItem("token");
        return { flag: false, data: response };

      } else {
        return { flag: false, data: response };

      }

    } catch (error: any) {

      func_print('error useApi', error, true)

      return { flag: false, data: error.toString() };

    }
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
});