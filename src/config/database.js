module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  define: {
    timeStamps: true,
    underscored: true,
    underscoredAll: true
  }
};
