function sqlDate(date) {
    const 
        d = !date ? new Date() : new Date(date),
        year = d.getFullYear()
    let
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return `${[year, month, day].join('-')} 23:59:59`;
}

export {
    sqlDate
}