const uriTemplate = require('uri-template');

function uri(template, opts) {
  return uriTemplate.parse(template).expand(opts);
}

function search(robot, uri, opts) {
  return new Promise((resolve, _) => {
    const parsedUri = uri(uri, opts);
    console.info(`Searching ${parsedUri}`)

    robot.http(parsedUri)
      .header('Accept', 'application/json')
      .get()((err, res, body) => {
        resolve(body);
      });
  });
}

module.exports = { uri, search };
