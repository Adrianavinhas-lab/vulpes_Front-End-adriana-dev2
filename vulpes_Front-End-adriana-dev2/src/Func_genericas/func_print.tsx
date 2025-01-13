export const func_print = (text_label = '', text_to_print:any , flag_error = false) => {
    try {

        if (flag_error === false) {
            console.log(` ${text_label} :  `, text_to_print)
        } else {
            console.log(`Error ${text_label} :  `, text_to_print)

        }

    } catch (e) {
        console.log('Error func_print: ', e)
    }
}


