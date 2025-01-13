// import { get } from "../Services/tokenConfig";



// export const getCabecalhoFitossanitaria = async(id: any) => {


//     try {
//       let res = await get(`/get_reg_fitossanitaria_cabecalho__rosto/${id}`);

//       if (res.status === 200) {
//         const sortedData = res.data.result.sort((a: any, b: any) => {
//           if (a.zona_homo < b.zona_homo) return -1;
//           if (a.zona_homo > b.zona_homo) return 1;
//           return 0;
//         });

//         setCabecalhos(sortedData);
//         setIdCabecalho(sortedData[0].id_registo_fitocabe);

//         await getInfoVariasTabelas(sortedData[0].id_registo_fitocabe);
//       }
//       setIsLoading(false);

//     } catch (error) {
//       func_print("getCabecalhoFitossanitaria", error, true);
//       setMessage("Erro ao efetuar a sua operação!");
//       setOpenSnackError(true);
//       setIsLoading(false);
//     }
//   }

export {}