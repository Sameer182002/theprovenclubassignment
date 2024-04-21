const { isValidObjectId } = require('mongoose');
const {INDIAN_MOBILE_VALIDATION_REGEX, POSSIBLE_BOOLEAN_VALUES, EMAIL_VALIDATION_REGEX, VALID_URL_REGEX} = require('./constants');


exports.isValidObjectId = function (id) {
    if(typeof id === "number") return false
    return isValidObjectId(id)
}

exports.isValidNumber = function(num){
  if(num != 0 && !num) return false
  return !isNaN(num)
}

exports.isValidIndianPhoneNumber  = function (mobile){
    return INDIAN_MOBILE_VALIDATION_REGEX.test(mobile)
}

exports.checkValidString = function (value) {
  if (typeof value === 'undefined' || value === null || typeof value === 'number') return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}

exports.isValidBoolean = (value) => {
  return POSSIBLE_BOOLEAN_VALUES?.includes(value)
}

exports.isValidArray = (value)=>  Array.isArray(value)


exports.isValidEmail = function(email) {
    return EMAIL_VALIDATION_REGEX.test(email)
}

exports.isValidUrl = function(url){
    if(VALID_URL_REGEX.test(url)){
        return true
      }else{
        return false
      }
  }