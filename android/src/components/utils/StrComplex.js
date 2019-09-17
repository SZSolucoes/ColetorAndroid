
export const leftStr = (intNum) => {
    const strNum = intNum.toString();
    const strNumLength = strNum.length;

    if (strNumLength === 3) {
        return strNum;
    } else if (strNumLength === 2) {
        return `0${strNum}`;
    } else if (strNumLength === 1) {
        return `00${strNum}`;
    } 

    return '000';
};

