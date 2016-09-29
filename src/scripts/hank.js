const peopleSearch = require('./search/people');
const foodSearch = require('./search/food');

module.exports = (robot) => {
  // TODO (jamesgorrie): add days
  robot.hear(/whats for lunch( .*)?/i, (res) => {
    const day = res.match[1] ? res.match[1].replace('on', '').trim() : 'today';

    foodSearch(robot, day).then((menus) => {
      res.reply(`Sorry, I seem to have lost my glasses and can't read the menu just now... try again later`);
    });
  });

  robot.hear(/where does (.*) sit/i, (res) => {
    const name = res.match[1];
    peopleSearch(robot, name).then(people => {
      switch (people.length) {
        case 0:
          res.reply(`${name} doesn't work here, or is in hiding.`);
          break;
        case 1:
          const person = people[0];
          if (person.location) {
            res.reply(`${person.name} sits ${person.location}`);
          } else {
            res.reply(`${person.name} apparently is sat nowhere, try looking on the roof.`);
          }
          break;
        default:
          const peopleNames = people.map(person => person.name).join(' or ');
          res.reply(`Which ${name} do you mean? ${peopleNames}`);
          break;
      }
    });
  });
};
