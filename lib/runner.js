const fs = require('node:fs')
const { execSync } = require('node:child_process')
const { fetch } = require('undici')

async function apply_patch(base_path, patch_path, output_path) {
  if (!fs.existsSync(base_path)) {
    throw new Error(`base_path (${base_path}) does not exist`)
  }
  const base_text = fs.readFileSync(base_path, 'utf-8');

  const template_url = 'https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md';
  const template_response = await fetch(template_url);

  if (template_response.status !== 200 && template_response.status !== 201) {
    throw new Error(`template response got ${template_response.status} status code. expected 200 or 201.`)
  }
  const template_text = await template_response.text();

  const output_text = `${base_text}${template_text}`;
  fs.writeFileSync(output_path, output_text);

  if (!fs.existsSync(patch_path)) {
    throw new Error(`patch_path (${patch_path}) does not exist`)
  }

  await execSync(`patch ${output_path} ${patch_path} -R`);
}

module.exports = { apply_patch }
