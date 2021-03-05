export default function formatTotal(total) {
    return (total < 10) ? Math.round(total * 100) / 100 : Math.round(total);
}
