import test from '@mentorioum/support-test'
import {githubNotificationFixtures} from "./fixtures";
import {GithubNotificationSubject} from "./GithubNotificationSubject";

test('creates valid github subject', async t => {
  let notification = githubNotificationFixtures.validGreetingNotification();
  let subject = notification.subject;
  let actual = new GithubNotificationSubject(subject);

  t.is(actual.title, subject.title)
  t.is(actual.type, subject.type)
  t.is(actual.url, subject.url)

  t.deepEqual(actual.toJSON(), {
    title: actual.title,
    type: actual.type,
    url: actual.url
  })
})
