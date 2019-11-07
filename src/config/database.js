module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint-gostack',
  define: {
    timeStamps: true,
    underscored: true,
    underscoredAll: true
  }
};
