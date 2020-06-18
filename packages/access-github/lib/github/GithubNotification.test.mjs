import test from '@mentorioum/support-test'
import {GithubNotification} from "./GithubNotification";
import {githubNotificationFixtures} from "./fixtures";
import {GithubNotificationSubject} from "./GithubNotificationSubject";
import {GithubNotificationRepository} from "./GithubNotificationRepository";

test('creates valid github notification', async t => {
  let notification = githubNotificationFixtures.validGreetingNotification();
  let actual = new GithubNotification(notification);

  t.is(actual.id, notification.id)
  t.is(actual.reason, notification.reason)
  t.deepEqual(actual.subject, new GithubNotificationSubject(notification.subject))
  t.deepEqual(actual.repository, new GithubNotificationRepository(notification.repository))

  t.deepEqual(actual.toJSON(), {
    id: actual.id,
    reason: actual.reason,
    repository: actual.repository.toJSON(),
    subject: actual.subject.toJSON()
  })
})
