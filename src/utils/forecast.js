const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b0d7ea08d9fc06d1f6d4265b7dcb8e40/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            console.log(body.daily.data);
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. Todays minimum temperature will be ' + body.daily.data[0].temperatureMin + ' and the maximum ' + body.daily.data[0].temperatureMax + '.');
        }
    });
};

module.exports = forecast;