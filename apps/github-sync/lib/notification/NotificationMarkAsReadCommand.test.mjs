import test from '@mentorioum/support-test'
import {GithubNotification, githubNotificationFixtures, StubNotificationAccess} from "@mentorioum/access-github";
import {NotificationMarkAsReadCommand} from "./NotificationMarkAsReadCommand";
import {StubLogger} from "@mentorioum/core-infra-stub";
import {AssertionError} from "assert";

test.beforeEach(async t => {
  t.context.notifications = new StubNotificationAccess();
  t.context.log = new StubLogger()
});

test('creates command', async t => {
  t.throws(() => {
    new NotificationMarkAsReadCommand()
  },{instanceOf: AssertionError})

  t.throws(() => {
    new NotificationMarkAsReadCommand(t.context.notifications)
  },{instanceOf: AssertionError})
})

test('marks as read', async t => {
  const {log, notifications} = t.context;
  const notification = new GithubNotification(
    githubNotificationFixtures.validGreetingNotification()
  ).toJSON()
  const marksAsRead = new NotificationMarkAsReadCommand(notifications,log)

  await marksAsRead.execute({notification})

  t.is(notifications.stubs.markAsRead.callCount, 1)
  t.is(notifications.stubs.markAsRead.getCall(0).args[0], notification.id)
})
