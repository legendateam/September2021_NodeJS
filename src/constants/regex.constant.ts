export const regexConstant = {
    NAME: /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/,
    PHONE: /^(?!.* )([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
    PASSWORD: /^(?!.* )(?=.*\d)(?=.*[A-Z])/,
};
