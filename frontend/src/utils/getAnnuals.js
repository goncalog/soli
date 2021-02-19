export default function getAnnuals(annualsArray, startYear) {
    let annualsObj = {};
    annualsArray.forEach((amount, i) => {
        if (parseInt(startYear) + i <= new Date().getFullYear()) {
            annualsObj[parseInt(startYear) + i] = amount;
        }
    });

    return annualsObj;
}
