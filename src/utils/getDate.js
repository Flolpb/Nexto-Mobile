export default function getDate(separator='', d){

    let min = d.getMinutes();
    if(parseInt(min) < 10){
        min = "0"+min;
    }
    let hours = d.getHours() + 1;
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    return `${day}${separator}${month<10?`0${month}`:`${month}`}${separator}${year} ${hours}${separator}${min}`
}
