import crypto from 'node:crypto'
import fs from 'node:fs/promises'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export function random_filename() {
  return "/tmp/" + crypto.randomUUID() + ".txt";
}

export function read_file(filename) {
  return fs.readFile(filename, 'utf-8');
}

export function write_file(filename = random_filename(), data = '') {
  return fs.writeFile(filename, data, 'utf-8');
}

export function remove_file(filename) {
  return fs.rm(filename, { force: true });
}
