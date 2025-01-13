import { createContext } from "react";
import { User } from "../Types/User"

interface signin_interface {
    flag: Boolean,
    role: string

}

export type AuthContextType = {
    user: User | null;
    user_role: string | null;
    nif_agricultor_from_caderno: string | null;
    nome_agricultor_from_caderno: string | null;
    id_rosto_from_caderno: number | null;
    func_set_user_role: (role: string) => void;
    func_set_user: (token_obj: any) => void;
    func_setNif_agricultor_from_caderno: (nif_agri: any) => void;
    func_setNome_agricultor_from_caderno: (nome_agri: any) => void;
    func_setId_rosto_from_caderno: (id_rosto: any) => void;
    
    signin: (dados: any) => Promise<signin_interface>
    signout: () => void;

}

export const AuthContext = createContext<AuthContextType>(null!);