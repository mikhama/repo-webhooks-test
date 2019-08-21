const { MONGOURL } = process.env;

module.exports = {
    url: MONGOURL || 'mongodb://localhost:27017/testa',
}