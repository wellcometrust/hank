const { foodApiUri } = require('../config');
const { search } = require('../util');

const Location = (title, description, categories) => ({name, description, categories});
const Category = (title, description, dishes) => ({name, description, dishes});
const Dish = (title, description, prices) => ({name, description, prices});

function foodSearch(robot, day) {
  return search(robot, foodApiUri, {day}).then((menus) => {
    return {
      rooftops: Location('Rooftops', []),
      cornerstone: Location('Cornerstone', [])
    };
  });
}


module.exports = foodSearch;
