

//--------------Hook for Reformatting Phone Numbers----------------//
export const formatPhone = (phoneNumber) => {
    let formattedNumber = phoneNumber.split('');
    if(phoneNumber[0] !== '('){
        formattedNumber.unshift('(');
    }
    if(formattedNumber[4] !== ')'){
        formattedNumber.splice(4, 0, ')');
    }
    if(formattedNumber[5]=== ' '){
        formattedNumber.splice(5,1);
    }
    if(formattedNumber[5] === '-'){
        formattedNumber.splice(5, 1);
    }
    if(formattedNumber[8] !== '-'){
        formattedNumber.splice(8, 0, '-');
    }
    formattedNumber = formattedNumber.join('');

    return(formattedNumber);
}