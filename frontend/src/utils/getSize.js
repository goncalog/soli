import formatNumber from './formatNumber';

export default function getSize(obj) {
    return `${formatNumber(obj.size_kw)} kW | ${obj.total_cost_currency}${formatNumber(obj.total_cost)}`;
}
