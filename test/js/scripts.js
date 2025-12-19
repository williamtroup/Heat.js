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
    console.log( `Statistic clicked for: ${JSON.stringify( colorRange )}, Count: ${count}, Year: ${year}` );
}

function onWeekDayClick( day, count, year ) {
    console.log( `Week day clicked for: ${day}, Count: ${count}, Year: ${year}` );
}

function onMonthClick( day, count, year ) {
    console.log( `Month clicked for: ${day}, Count: ${count}, Year: ${year}` );
}

function addStartUpBasicData( dayIncrease = 500, totalDays = 8000 ) {
    document.addEventListener( "DOMContentLoaded", () => addBasicData( dayIncrease, totalDays ) );
}

function addBasicData( dayIncrease = 500, totalDays = 8000, typeName = null, refresh = true, heatMapId = "heat-map-1" ) {
    const date = new Date( new Date().getFullYear(), 0, 1 );

    for ( let dayNumber = 0; dayNumber < totalDays; dayNumber++ ) {
        const daysToIncrease = Math.floor( Math.random() * dayIncrease );
        let newDate = new Date( date );

        newDate.setDate( newDate.getDate() + daysToIncrease );

        $heat.addDate( heatMapId, newDate, typeName, false );
    }
    
    if ( refresh ) {
        $heat.refreshAll();
    }
}