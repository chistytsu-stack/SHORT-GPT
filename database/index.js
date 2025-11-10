// Export all DB modules
module.exports = {
  mongo: require('./connectDB/mongo'),
  mysql: require('./connectDB/mysql'),
  redis: require('./connectDB/redis')
};