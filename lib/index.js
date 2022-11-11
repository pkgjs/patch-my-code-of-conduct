import core from '@actions/core'
import { apply_patch } from "./runner.js";

try {
  const base_path = core.getInput('base_path');
  const patch_path = core.getInput('patch_path');
  const output_path = core.getInput('output_path');

  await apply_patch(base_path, patch_path, output_path);
} catch (error) {
  core.setFailed(error);
}

