const { peopleApiUri } = require('../config');
const { search } = require('../util');

const Person = (name, description, location) => ({name, description, location});

function peopleSearch(robot, q) {
  return search(robot, peopleApiUri, {q});
}


module.exports = peopleSearch;
