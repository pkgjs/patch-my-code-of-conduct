import { assert, beforeEach, test } from 'vitest';
import path from 'node:path'
import fs from 'node:fs'
import { apply_patch } from '../lib/runner.js'

const template = 'https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md'
const preamble = path.join(__dirname, './openjsf/preamble.md')
const patch = path.join(__dirname, './openjsf/patch')
const expected = path.join(__dirname, './openjsf/expected.md')
const original_expected = path.join(__dirname, './openjsf/original-expected.md')

const tmp_file_path = path.join(__dirname, './openjsf/tmp.md')

beforeEach(() => {
  fs.copyFileSync(original_expected, expected)
  fs.rmSync(tmp_file_path, { force: true })
})

test('should create the exact result with expected', async () => {
  await apply_patch(preamble, template, patch, expected, tmp_file_path);

  assert.deepEqual(fs.readFileSync(expected, 'utf-8'), fs.readFileSync(original_expected, 'utf-8'))
})
