export const errorRequiredText = "Pole jest wymagane";
export const errorsSummaryText = "Formularz zawiera błedy";
export const errorDateFormat = "Data powinna być w formacie yyyy-mm-dd";
export const errorInputClassName = "error-input";
export const datePattern = /(\d{4})-(\d{2})-(\d{2})/;

export function getErrorLengthText(min, max) {
    return `Pole powinno zawierać od ${min} do ${max} znaków`;
}

export function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    return value !== "";
}

export function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    return !((max && length > max) || (min && length < min));
}

export function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(value);
}

export function checkNumber(value) {
    return !(!value || isNaN(value));
}

export function checkInteger(value) {
    if (!checkNumber(value)) {
        return false;
    }
    if (value % 1 !== 0) {
        return false;
    }
    return true;
}

export function checkNumberRange(value, min, max) {
    if (!value || isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value > max || value < min) {
        return false;
    }
    return true;
}

export function checkDate(value) {
    if (!value) {
        return false;
    }
    return datePattern.test(value);
}

export function checkDateIfAfter(value, compareTo) {
    if (!value || !compareTo || !datePattern.test(value) || !datePattern.test(compareTo)) {
        return false;
    }
    if (new Date(value).getTime() <= new Date(compareTo).getTime()) {
        return false;
    }
    return true;
}

export function getNowDate() {
    let dateNow = new Date(),
        day = '' + dateNow.getUTCDate(),
        month = '' + (dateNow.getMonth() + 1),
        year = '' + dateNow.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}


