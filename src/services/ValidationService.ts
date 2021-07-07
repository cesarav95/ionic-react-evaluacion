
const validateEmail = (email: string) => {
    const regex = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
    return regex.test(email);
}
const validateDataUser = (value: string) => {
    const regex = /.{6}/
    return regex.test(value);
}

export {validateEmail, validateDataUser};