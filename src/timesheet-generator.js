'use strict';

const moment = require('moment');
require('moment-range');

export default class Timesheet {
  
  constructor(start, end) {
    this.start = moment(start, 'YYYY-MM-DD');
    this.end = moment(end, 'YYYY-MM-DD');
  }

  getDateRange() {
    const timesheetRange = moment.range(this.start, this.end),
          timesheetFinal = [];

    timesheetRange.by('days', (moment) => {
      let arrivalTime     = this._getArrivalTime(),
          departureTime   = this._getDepartureTime(arrivalTime),
          lunchTimeStart  = this._getLunchTimeStart(),
          lunchTimeEnd    = this._getLunchTimeEnd(lunchTimeStart);

      timesheetFinal.push({
        day: moment.format('DD/MM/YYYY'),
        times: {
          arrival: arrivalTime.format('HH:mm'),
          lunchStart: lunchTimeStart.format('HH:mm'),
          lunchEnd: lunchTimeEnd.format('HH:mm'),
          departure: departureTime.format('HH:mm')
        }
      });
    });

    return timesheetFinal;
  }

  _getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  _getArrivalTime() {
    let arrivalHour     = this._getRandomTime(9, 10),
        maxMinutes      = arrivalHour === 9 ? 59 : 30,
        arrivalMinutes  = this._getRandomTime(0, maxMinutes);

    return moment(arrivalHour + ':' + arrivalMinutes, 'HH:mm');
  };

  _getLunchTimeStart() {
    let lunchHour     = this._getRandomTime(11, 13),
        lunchMinutes  = this._getRandomTime(0, 53);

    return moment(lunchHour + ':' + lunchMinutes, 'HH:mm');
  };

  _getLunchTimeEnd(lunchTime) {
    let lunchTimeClone = lunchTime.clone();

    return lunchTimeClone.add(1, 'hours');
  };

  _getDepartureTime(arrivalTime) {
    let arrivalTimeClone = arrivalTime.clone();

    return arrivalTimeClone.add(9, 'hours');
  };

};
