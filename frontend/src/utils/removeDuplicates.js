export default function removeDuplicates(array, prop) {
    let newArray = [];
    let obj = {};
    
    array.forEach((item) => {
        if (!obj[item[prop]]) {
            obj[item[prop]] = 1;
            newArray.push(item);
        }
    }); 

    return newArray;
}
