import  { AxiosResponse } from "axios";
import  api  from "./api";

// /** Link dos logotipos */
export const logos = "http://api.vulpes.pt:8080/static/images/"


// /** Link das facturas */
// export const faturas = "http://api.vulpes.pt:8080/static/docs/"



/** Axios Post  */
export async function post(rota: string, dados: any) {
  const resulte: AxiosResponse = await api.post(rota , dados, {
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${(localStorage.getItem("token") || "") }` },
  });

  // console.log(resulte.status.toString());

  return resulte;
}

export async function post_imagem(rota: string, dados: any) {
  const resulte: AxiosResponse = await api.post(rota , dados, {
    headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${(localStorage.getItem("token") || "") }` },
  });

  // console.log(resulte.status.toString());

  return resulte;
}

/** Axios Get */
export async function get( rota: string) {
 
  const resulte: AxiosResponse = await api.get(rota+"", {
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${(localStorage.getItem("token") || "") }` },
  });

  // console.log(resulte.status.toString());

  return resulte;
}

/** Axios Delete */
export async function del(  id: string) {
 
  const resulte: AxiosResponse = await api.delete( id, {
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${(localStorage.getItem("token") || "") }` },
  });

  // console.log(resulte.status.toString());

  return resulte;
}

export async function del_using_obj(rota: string, dados: any) {
 
  const resulte: AxiosResponse = await api.delete(rota,  {
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${(localStorage.getItem("token") || "") }` },data: dados
  },);

  // console.log(resulte.status.toString());

  return resulte;
}


