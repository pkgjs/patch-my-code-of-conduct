const fs = require('node:fs')
const { execSync } = require('node:child_process')
const { fetch } = require('undici');
const { randomUUID } = require('node:crypto');

async function apply_patch(base_url, template_url, patch_path, output_path, tmp_file_path) {
  if (!fs.existsSync(base_url)) {
    throw new Error(`base_url (${base_url}) does not exist`)
  }
  const base_text = fs.readFileSync(base_url, 'utf-8');
  const template_response = await fetch(template_url);
  tmp_file_path ??= `/tmp/coc-${randomUUID()}.md`;

  if (template_response.status !== 200 && template_response.status !== 201) {
    throw new Error(`template response got ${template_response.status} status code. expected 200 or 201.`)
  }
  const template_text = await template_response.text();

  // Make sure that there is a new line at the end.
  const output_text = `${base_text}\n${template_text.trim()}\n`;
  fs.writeFileSync(tmp_file_path, output_text);

  if (!fs.existsSync(patch_path)) {
    throw new Error(`patch_path (${patch_path}) does not exist`)
  }

  await execSync(`patch -i ${patch_path} ${tmp_file_path} -o ${output_path} --no-backup-if-mismatch`);

  const original_file = output_path + '.orig'
  // Delete `output.md.orig` file, if exists
  if (fs.existsSync(original_file)) {
    fs.rmSync(original_file, { force: true })
  }
}

module.exports = { apply_patch }
