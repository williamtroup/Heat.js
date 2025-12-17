( () => {
    document.addEventListener( "DOMContentLoaded", () => {
        document.title += ` - v${$heat.getVersion()}`;
        document.getElementById( "header" ).innerText += ` - v${$heat.getVersion()}`;
    } );
} )();

function onMapDayClick( date, count, isHoliday ) {
    console.log( `Day clicked for: ${date.toString()}, Count: ${count}, Is Holiday: ${isHoliday.toString()}` );
}

function onStatisticClick( colorRange, count, year ) {
    console.log( `Statistic clicked for: ${JSON.stringify(colorRange)}, Count: ${count}, Year: ${year}` );
}

function onWeekDayClick( day, count, year ) {
    console.log( `Week day clicked for: ${day}, Count: ${count}, Year: ${year}` );
}

function onMonthClick( day, count, year ) {
    console.log( `Month clicked for: ${day}, Count: ${count}, Year: ${year}` );
}