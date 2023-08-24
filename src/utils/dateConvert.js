import moment from 'moment/moment';
function formatDateToDDMMYYYY(date) {
  // Ensure the input is a valid date
  if (!moment(date).isValid()) {
    return 'Invalid Date';
  }

  // Format the date in "dd-mm-yyyy" format
  return moment(date).format('DD-MM-YYYY');
}
export default formatDateToDDMMYYYY;
