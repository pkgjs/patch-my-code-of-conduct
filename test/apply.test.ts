import {assert, beforeEach, test} from 'vitest';
import path from 'node:path'
import {random_filename, write_file, remove_file, read_file, __dirname} from "./file-operations";
import {apply_patch} from '../lib/runner.js'

beforeEach(async (context) => {
  context.base_url = 'https://raw.githubusercontent.com/pkgjs/patch-my-code-of-conduct/cd136b70909ad4c14d738d0399e09559ca2a3ecd/template/base.md'
  context.template_url = 'https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md';
  context.patch_path = random_filename()
  context.output_path = random_filename()

  await write_file(context.patch_path)
  await write_file(context.output_path)

  return async () => {
    await remove_file(context.patch_path)
    await remove_file(context.output_path)
  }
})

test('should add base as prefix', async (context) => {
  await apply_patch(context.base_url, context.template_url, context.patch_path, context.output_path)
  const output = await read_file(context.output_path)
  assert.isTrue(output.startsWith('This is the beginning of our Code of Conduct.\n'))
})
