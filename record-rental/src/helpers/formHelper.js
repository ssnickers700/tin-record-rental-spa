const formMode = {
    NEW: "NEW",
    EDIT: "EDIT"
}

export const formValidationKeys = {
    notEmpty: "notEmpty",
    len_2_60: "len_2_60",
    len_1_60: "len_1_60",
    len_5_60: "len_5_60",
    notEmail: "notEmail",
    formErrors: "formErrors",
    dateFormat: "dateFormat",
    futureDate: "futureDate",
    earlyDate: "earlyDate",
    notNumber: "notNumber",
    notInteger: "notInteger",
    numberRange: "numberRange",
}

export const getValidationErrorKey = (error) => {
    return error ? `validation.${error}` : error
}

export default formMode;