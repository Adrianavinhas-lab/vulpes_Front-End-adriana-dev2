

import * as React from 'react';
import { Button, Modal } from '@mui/material';
import { CustomTextField } from '../../../Styles/theme/customThemeprovider';
import CloseIcon from "@mui/icons-material/Close";
import { IAnexo5Cab } from '../../../Interfaces/anexos/anexo5';
import { cores } from '../../../Func_genericas/valores_estaticos';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import { ICabecalho } from '../../../Interfaces/anexos/anexo1/analise_e_foliar1_1_3';


export const Modal_editar_lista_especie_ou_lote = (
    open_modal_editar_lista_especie_ou_lote: boolean,
    set_open_modal_editar_lista_especie_ou_lote: any,
    string_nova_especie_ou_lote_homogenio: any,
    set_string_nova_especie_ou_lote_homogenio: any,
    handle_create_especie_ou_lote_homogenio: any,
    especie_ou_lote_homegenio_lista: ICabecalho[],
    handle_delete_especie_ou_lote_homogenio: any,
    handle_edit_especie_ou_lote_homogenio: any,
    set_obj_to_edit_especies_lote: any,
    set_string_editada_especie_ou_lote: any,
    obj_to_edit_especies_lote: any,
    string_editada_especie_ou_lote: string
) => {



    return (<Modal
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}

        open={open_modal_editar_lista_especie_ou_lote}

    >
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: 'white',

            width: '50%',
            height: 600,

            flexDirection: 'column',

            borderRadius: 5,
        }} >


            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%'
            }}>

                <Button
                    sx={{ color: "#AAAAAA" }}
                    size="large"
                    onClick={() => {
                        set_open_modal_editar_lista_especie_ou_lote(false)

                        set_obj_to_edit_especies_lote(undefined)

                        set_string_nova_especie_ou_lote_homogenio('')
                        set_string_editada_especie_ou_lote('')
                    }}
                >
                    <CloseIcon />
                </Button>
            </div>
            <div style={{
                width: '90%',
                flex: 0.9,


            }}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',

                }}>

                    <CustomTextField
                        label="Nova especie ou lote homogénio"

                        value={string_nova_especie_ou_lote_homogenio === undefined ? '' : string_nova_especie_ou_lote_homogenio}
                        onChange={(e: any) => {
                            set_string_nova_especie_ou_lote_homogenio(e.target.value)
                        }}
                    />

                    <Button

                        onClick={() => handle_create_especie_ou_lote_homogenio()}
                        sx={{
                            marginLeft: 3,
                            marginTop: 2,
                            marginBottom: 1,
                            background: "#c94f1e",
                            color: "white",
                        }}
                    >
                        Criar
                    </Button>
                </div>

                <div style={{

                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 20,
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    width: '100%',
                    height: 400





                }}>
                    <div style={{
                        margin: 3,
                        fontSize: 15,

                    }}>
                        Editar lista de especie ou lote homogénio:
                    </div>


                    {especie_ou_lote_homegenio_lista.map((elem: ICabecalho, index: number) => (
                        <div
                            key={index}
                            onClick={() => { }}
                            style={{
                                textAlign: 'center',
                                margin: 3,

                                borderRadius: 12,
                                display: 'flex',
                                flexDirection: 'row'

                                // backgroundColor: elem.id_reproducao === especie_ou_lote_homegenio_selecionada?.id_reproducao ? "#c94f1e" : "#f2d1c2",
                            }}
                        >
                            <div style={{
                                flex: 0.6,
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: cores.cor5,
                                marginRight: 2,
                                marginLeft: 2,
                                color: 'white',
                                fontSize: 18,
                                alignItems: 'center'



                            }}>
                                {

                                    obj_to_edit_especies_lote !== undefined && obj_to_edit_especies_lote.id_reproducao === elem.id_anexo_um_cabecalho ?
                                        <CustomTextField
                                            value={string_editada_especie_ou_lote}
                                            onChange={(e: any) => {
                                                set_string_editada_especie_ou_lote(e.target.value)
                                            }}
                                        />
                                        :
                                        elem.zona_homo
                                }

                            </div>
                            <div style={{
                                flex: 0.2,
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: cores.cor5,
                                marginRight: 2,
                                marginLeft: 2,

                            }}>

                                {
                                    obj_to_edit_especies_lote !== undefined && obj_to_edit_especies_lote.id_reproducao === elem.id_anexo_um_cabecalho ?
                                        <Button
                                            sx={{ color: cores.cor1 }}
                                            size="large"
                                            onClick={() => { handle_edit_especie_ou_lote_homogenio(elem) }}
                                        >
                                            <UploadIcon />
                                        </Button>
                                        :
                                        <Button
                                            sx={{ color: cores.cor1 }}
                                            size="large"

                                            onClick={() => { set_obj_to_edit_especies_lote(elem) }}
                                        >
                                            <EditIcon />
                                        </Button>

                                }


                            </div>
                            <div style={{
                                flex: 0.2,
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: cores.cor5,
                                marginRight: 2,
                                marginLeft: 2,

                            }}>
                                {
                                    obj_to_edit_especies_lote !== undefined && obj_to_edit_especies_lote.id_reproducao === elem.id_anexo_um_cabecalho ?

                                        <Button
                                            sx={{ color: cores.cor1 }}

                                            size="large"
                                            onClick={() => {
                                                set_obj_to_edit_especies_lote(undefined)

                                                set_string_editada_especie_ou_lote('')

                                            }}
                                        >
                                            <CloseIcon />
                                        </Button>
                                        :

                                        <Button
                                            sx={{ color: cores.cor1 }}

                                            size="large"
                                            onClick={() => { handle_delete_especie_ou_lote_homogenio(elem.id_anexo_um_cabecalho) }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                }

                            </div>
                        </div>
                    ))}
                </div>

            </div>




        </div>
    </Modal >)

}
