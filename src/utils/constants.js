const INDIAN_MOBILE_VALIDATION_REGEX = /^(\+91|0)?([6-9]\d{9})$/

const POSSIBLE_BOOLEAN_VALUES = [
    true, false, 'true', 'false'
]

const EMAIL_VALIDATION_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const VALID_URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/
const JWT_PRIVATE_KEY = 'wtkzuROIoBbFlRkE97Lt7JgbBnkOHSp99asdjkndka61997'

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 10000
const ONE_DAY_IN_MS = 24 * 60 * 60 * 10000
module.exports={
    INDIAN_MOBILE_VALIDATION_REGEX ,
    POSSIBLE_BOOLEAN_VALUES,
    EMAIL_VALIDATION_REGEX,
    VALID_URL_REGEX,
    JWT_PRIVATE_KEY,
    SEVEN_DAYS_IN_MS,
    ONE_DAY_IN_MS
}