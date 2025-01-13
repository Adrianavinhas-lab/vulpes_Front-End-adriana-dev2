

import * as React from 'react';
import { cores } from './valores_estaticos';

export const aviso_sem_info = () => {

    return ( <div style={{
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '1%',
        paddingBottom: '1%',
        border: `1px solid ${cores.cor2}`,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // color:cores.cor1
        // backgroundColor:'red'
      }}>
        Sem Informação
      </div>)

}
