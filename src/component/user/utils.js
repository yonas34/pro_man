import moment from 'moment';
export function dateDifference(startDate, endDate){
    return Math.abs(moment(startDate).diff(moment(endDate), 'hours'));
  }
  