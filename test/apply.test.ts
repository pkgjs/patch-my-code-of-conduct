import {assert, beforeEach, test} from 'vitest';
import path from 'node:path'
import {random_filename, write_file, remove_file, read_file, __dirname} from "./file-operations";
import {apply_patch} from '../lib/runner.js'

beforeEach(async (context) => {
  context.base_path = random_filename()
  context.patch_path = random_filename()
  context.output_path = random_filename()

  await write_file(context.base_path)
  await write_file(context.patch_path)
  await write_file(context.output_path)

  return async () => {
    await remove_file(context.base_path)
    await remove_file(context.patch_path)
    await remove_file(context.output_path)
  }
})

test('should add base as prefix', async (context) => {
  await write_file(context.base_path, 'this is a prefix')
  await apply_patch(context.base_path, context.patch_path, context.output_path)
  const output = await read_file(context.output_path)
  assert.isTrue(output.startsWith('this is a prefix\n'))
})

test('should apply the patch', async (context) => {
  const base_path = path.join(__dirname, '../test/fixture/base.md');
  const patch_path = path.join(__dirname, '../test/fixture/patch.txt');
  const output_path = path.join(__dirname, '../test/fixture/output.md');

  await remove_file(output_path);

  const title = `CHANGED THE TITLE OF COC`
  const patch_text = `--- /dev/null	2022-11-11 18:00:48
+++ output.md	2022-11-11 18:00:32
@@ -43,7 +43,7 @@

 ---

-# ${title}
+# Contributor Covenant Code of Conduct

 ## Our Pledge

`
  await write_file(patch_path, patch_text)

  await apply_patch(base_path, patch_path, output_path)
  const output = await read_file(output_path)
  assert.isTrue(output.includes(title))
})
