export const checkString = (
    value: any,
    field: string,
    errors: {message: string, field: string}[]
) => {
    if (typeof value !== 'string') {
        errors.push({message: field + ' not string', field})
        return false
    } else {
        return true
    }
}

export const checkLength = (
    value: string,
    count: number,
    field: string,
    errors: {message: string, field: string}[]
) => {
    if ((value?.length || 0) > count) {
        errors.push({message: 'too long ' + field, field})
        return false
    } else {
        return true
    }
}

export const checkLink = (
    value: string,
    field: string,
    errors: {message: string, field: string}[]
) => {
    if ((value.indexOf?.('.') || -2) < 0) {
        errors.push({message: field + ' not link', field})
        return false
    } else {
        return true
    }
}


