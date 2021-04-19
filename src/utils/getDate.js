export default function getDate(d){

    let min = d.getMinutes();
    min.toString().length === 1 && (min = '0' + min.toString());

    let hours = d.getHours();
    hours.toString().length === 1 && (hours = '0' + hours.toString());

    let day = d.getDate();
    day.toString().length === 1 && (day = '0' + day.toString());

    let month = d.getMonth() + 1;
    month.toString().length === 1 && (month = '0' + month.toString());

    let year = d.getFullYear();

    return [`${day}/${month}/${year}`, `${hours}:${min}`];
}
