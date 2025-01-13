

import * as React from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Modal } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { IconButton } from '@mui/material';


export const alert_mensagem = (open_modal_operacao_realizada: any, texto: any, flag_sucesso: any, flag_close: any = false, set_open_modal_operacao_realizada: any = '') => {



    return (<Modal
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}

        open={open_modal_operacao_realizada}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '4%',

            flexDirection: 'column',

            borderRadius: 5,
        }} >

            {
                flag_close === true ?
                    <IconButton onClick={() => {
                        set_open_modal_operacao_realizada(false)
                    }}>
                        <CancelOutlinedIcon
                            sx={{}}
                        ></CancelOutlinedIcon>
                    </IconButton>
                    : <></>
            }
            <div style={{

                paddingBottom: '5%',

            }}>
                {texto.toString()}
            </div>
            {
                flag_sucesso === true ?
                    <CheckCircleOutlinedIcon
                        fontSize="large"
                        sx={{ color: 'green' }}
                    ></CheckCircleOutlinedIcon>
                    :
                    <CancelOutlinedIcon
                        fontSize="large"
                        sx={{ color: 'red' }}
                    ></CancelOutlinedIcon>

            }



        </div>
    </Modal>)

}
