const core = require('@actions/core')
const { apply_patch } = require('./runner.js')

const base_url = core.getInput('base_url');
const template_url = core.getInput('template_url');
const patch_path = core.getInput('patch_file_path');
const output_path = core.getInput('output_file_path');

apply_patch(base_url, template_url, patch_path, output_path)
  .then(() => core.setOutput('state', 'success'))
  .catch(error => core.setFailed(error))


