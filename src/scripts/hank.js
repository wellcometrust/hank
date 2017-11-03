const docker_uri = 'https://registry.hub.docker.com/v2/repositories/wellcome/wellcomecollection/tags/'
const github_root_api = 'https://api.github.com/repos/wellcometrust/wellcomecollection.org/git/commits/'

module.exports = (robot) => {
  robot.respond(/deploy/i, (res) => {
    robot.http(docker_uri).get()((err, _, body) => {
      const docker_json = JSON.parse(body)
      const latest_commit_sha = docker_json.results.filter(result => result.name !== 'test')[0].name
      const github_uri = `${github_root_api}${latest_commit_sha}`

      robot.http(github_uri).get()((err, _, body) => {
        const github_json = JSON.parse(body)
        const github_message = github_json.message
        res.send(`Deploying build ${latest_commit_sha}\n${github_message}`)
      })
    })
  })
}
