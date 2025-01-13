import { useState } from "react";
import { useApi } from "../Hook/useApi";
import { User } from "../Types/User";
import { AuthContext } from "./AuthContext";
import jwtDecode from "jwt-decode";
import { verify_role } from "./../Func_genericas/verify_role";
import { func_print } from "../Func_genericas/func_print";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [user_role, set_user_role] = useState<string | null>(null);
  const [nif_agricultor_from_caderno, setNif_agricultor_from_caderno] = useState<string | null>(null);
  const [nome_agricultor_from_caderno, setNome_agricultor_from_caderno] = useState<string | null>(null);
  const [id_rosto_from_caderno, setid_rosto_from_caderno] = useState<number | null>(null);

  const api = useApi();

  const signin = async (dados: any) => {
    
    try {
      const data: any = await api.signin(dados);
      func_print('data', data)

      if (data.flag === true) {
        setUser(data.token);

        localStorage.setItem("token", data.data.data.access_token);

        return {
          flag: true,
          role: verify_role(data.data.data.access_token),
          error: "",
        };
      } else if (data.flag === false) {
        return { flag: false, role: "", error: data.data };
      } else {
        return { flag: false, role: "", error: data.data };
      }
    } catch (error) {
      func_print("signin", error, true);
      return { flag: false, role: "", error: error };
    }
  };

  const signout = () => {
    // await api.logout();
    setUser(null);
    localStorage.removeItem("token");
    // setToken(null);
    localStorage.clear();
  };
  const func_set_user_role = (role: string) => {
    set_user_role(role);
  };
  const func_set_user = (token_obj: any) => {
    const token: any = jwtDecode(token_obj);

    setUser(token);
  };
  const func_setNif_agricultor_from_caderno = (nif_agri: string) => {
    setNif_agricultor_from_caderno(nif_agri);
  };

  const func_setNome_agricultor_from_caderno = (nome_agri: string) => {
    setNome_agricultor_from_caderno(nome_agri);
  };

  const func_setId_rosto_from_caderno = (id_rosto: number) => {
    setid_rosto_from_caderno(id_rosto);
  };

  return (
    <AuthContext.Provider
      value={{
        user_role,
        user,
        nif_agricultor_from_caderno,
        nome_agricultor_from_caderno,
        id_rosto_from_caderno,
        func_set_user,
        func_set_user_role,
        func_setNif_agricultor_from_caderno,
        func_setNome_agricultor_from_caderno,
        func_setId_rosto_from_caderno,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
