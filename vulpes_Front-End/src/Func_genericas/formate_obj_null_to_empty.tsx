export const formate_obj_null_to_empty = (obj: any, aux_tipos: any) => {


    let array_keys = Object.keys(obj)

    let obj_to_return = obj

    array_keys.forEach(key_label => {



        if (aux_tipos[key_label] === 'string') {
            if (obj[key_label] === null || obj[key_label] === undefined) {
                obj_to_return[key_label] = ''
            } else {
                obj_to_return[key_label] = obj[key_label]
            }
        } else if (aux_tipos[key_label] === 'number') {
            if (obj[key_label] === null || obj[key_label] === undefined) {
                obj_to_return[key_label] = 0
            } else {
                obj_to_return[key_label] = obj[key_label]
            }
        } else if (aux_tipos[key_label] === 'boolean') {
            if (obj[key_label] === null || obj[key_label] === undefined) {
                obj_to_return[key_label] = false

            } else {
                obj_to_return[key_label] = obj[key_label]

            }
        } else {
            obj_to_return[key_label] = obj[key_label]

        }
    });

    return obj_to_return

}
