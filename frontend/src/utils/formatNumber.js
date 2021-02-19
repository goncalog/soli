export default function formatNumber(number) {
    const arrayDecimal = number.toString().split('.');
    const arrayInt = arrayDecimal[0].toString().split('');
    
    let int; 
    if (parseInt(number) >= 1000000000) {
        int = `${arrayInt.splice(0, arrayInt.length - 9).join('')},${arrayInt.splice(0, arrayInt.length - 6).join('')},${arrayInt.splice(0, arrayInt.length - 3).join('')},${arrayInt.join('')}`;
    } else if (parseInt(number) >= 1000000) {
        int = `${arrayInt.splice(0, arrayInt.length - 6).join('')},${arrayInt.splice(0, arrayInt.length - 3).join('')},${arrayInt.join('')}`;
    } else if (parseInt(number) >= 1000) {
        int = `${arrayInt.splice(0, arrayInt.length - 3).join('')},${arrayInt.join('')}`;
    } else {
        int = arrayInt.join('');
    }

    if (arrayDecimal[1]) {
        return `${int}.${arrayDecimal[1]}`;
    } else {
        return `${int}`;
    }
}
