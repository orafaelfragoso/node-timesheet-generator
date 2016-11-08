'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var moment = require('moment');
require('moment-range');

var Timesheet = function () {
  function Timesheet(start, end) {
    _classCallCheck(this, Timesheet);

    this.start = moment(start, 'YYYY-MM-DD');
    this.end = moment(end, 'YYYY-MM-DD');
  }

  _createClass(Timesheet, [{
    key: 'getDateRange',
    value: function getDateRange() {
      var _this = this;

      var timesheetRange = moment.range(this.start, this.end),
          timesheetFinal = [];

      timesheetRange.by('days', function (moment) {
        var arrivalTime = _this._getArrivalTime(),
            departureTime = _this._getDepartureTime(arrivalTime),
            lunchTimeStart = _this._getLunchTimeStart(),
            lunchTimeEnd = _this._getLunchTimeEnd(lunchTimeStart);

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
  }, {
    key: '_getRandomTime',
    value: function _getRandomTime(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: '_getArrivalTime',
    value: function _getArrivalTime() {
      var arrivalHour = this._getRandomTime(9, 10),
          maxMinutes = arrivalHour === 9 ? 59 : 30,
          arrivalMinutes = this._getRandomTime(0, maxMinutes);

      return moment(arrivalHour + ':' + arrivalMinutes, 'HH:mm');
    }
  }, {
    key: '_getLunchTimeStart',
    value: function _getLunchTimeStart() {
      var lunchHour = this._getRandomTime(11, 13),
          lunchMinutes = this._getRandomTime(0, 53);

      return moment(lunchHour + ':' + lunchMinutes, 'HH:mm');
    }
  }, {
    key: '_getLunchTimeEnd',
    value: function _getLunchTimeEnd(lunchTime) {
      var lunchTimeClone = lunchTime.clone();

      return lunchTimeClone.add(1, 'hours');
    }
  }, {
    key: '_getDepartureTime',
    value: function _getDepartureTime(arrivalTime) {
      var arrivalTimeClone = arrivalTime.clone();

      return arrivalTimeClone.add(9, 'hours');
    }
  }]);

  return Timesheet;
}();

exports.default = Timesheet;
;
