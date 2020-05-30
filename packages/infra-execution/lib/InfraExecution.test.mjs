import test from '@mentorioum/support-test'
import {InfraExecution} from "./InfraExecution";
import {AssertionError} from "assert";

test('attach to lifecycle', async t => {
 t.throws(()=> {
   new InfraExecution()
 }, {instanceOf: AssertionError})
})

