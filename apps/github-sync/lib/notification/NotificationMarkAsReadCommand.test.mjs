import test from '@mentorioum/support-test'
import {StubNotificationAccess} from "@mentorioum/access-github";
import {NotificationMarkAsReadCommand} from "./NotificationMarkAsReadCommand";
import {StubLogger} from "@mentorioum/core-infra-stub";

test.beforeEach(async t => {
  t.context.notificatons = new StubNotificationAccess();
  t.context.log = new StubLogger()
});

test('marks as read', async t => {
  const {log} = t.context;
  const marksAsRead = new NotificationMarkAsReadCommand(log)


  await marksAsRead.execute({notification})
})
