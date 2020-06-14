import test from '@mentorioum/support-test'
import {githubNotificationFixtures} from "./fixtures";
import {GithubNotificationRepository} from "./GithubNotificationRepository";

test('creates valid github repository', async t => {
  let notification = githubNotificationFixtures.validGreetingNotification();
  let repository = notification.repository;
  let actual = new GithubNotificationRepository(repository);

  t.is(actual.id, repository.id)
  t.is(actual.name, repository.name)
  t.is(actual.fullName, repository.full_name)

  t.deepEqual(actual.toJSON(), {
    id: actual.id,
    name: actual.name,
    fullName: actual.fullName
  })
})
