const core = require('@actions/core')
const { apply_patch } = require('./runner.js')

const base_path = core.getInput('base_file_path');
const patch_path = core.getInput('patch_file_path');
const output_path = core.getInput('output_file_path');

apply_patch(base_path, patch_path, output_path)
  .then(() => core.setOutput('state', 'success'))
  .catch(error => core.setFailed(error))


