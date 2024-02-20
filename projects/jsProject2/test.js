

async function fetchFromApi() {
    let response = await fetch("https://worldtimeapi.org/api/timezone/asia/tokyo")
    const obj = await response.json();
    return obj
}

// setInterval(myTestFunc,1000);



function clockFunc(hoursFromApi) {

    setInterval(() => {
        let myClock = new Date()
        let offset = myClock.getTimezoneOffset() / 60
        myClock.setHours(myClock.getHours() + offset + hoursFromApi)
        console.log(myClock.getHours(), myClock.getMinutes(), myClock.getSeconds());


    }, 1000);

}


function extractHoursFromTimeOffset(timeOffset) {
    let matches = timeOffset.match(/[+-]?\d{2}/);

    if (matches) {
        return parseInt(matches[0], 10);
    } else {
        throw new Error("Invalid time offset format");
    }
}



// Example usage
try {
    let hours = extractHoursFromTimeOffset("+02:30");
    console.log("Hours:", hours);  // Outputs: Hours: 2
} catch (error) {
    console.error(error.message);
}



fetchFromApi()



async function controller() {

    let promise = await fetchFromApi()
    console.log("respose ================", promise.utc_offset);
    let numberHoursOffset = extractHoursFromTimeOffset(promise.utc_offset)
    console.log("ChatGPI:", numberHoursOffset);
    clockFunc(numberHoursOffset)




}


controller()