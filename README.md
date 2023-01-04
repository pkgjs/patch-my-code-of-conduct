# Patch my Code of Conduct

This action adds a prefix to the default Code of Conduct template and applies the necessary templates.

If used with `gr2m/create-or-update-pull-request-action@v1` workflow automatically creates a pull
request with the applied changes.

- Opens a pull request if output file does not exist [(Example)](https://github.com/anonrig/patch-test/pull/1)
- Opens a pull request if patch file is changed [(Example)](https://github.com/anonrig/patch-test/pull/7)

## Example Workflow

```yaml
on: [push]

jobs:
  main_job:
    runs-on: ubuntu-latest
    name: Test Action
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          persist-credentials: false
      - name: Start Patch
        uses: pkgjs/patch-my-code-of-conduct@v1.0.3
        with:
          base_url: 'https://raw.githubusercontent.com/openjs-foundation/cross-project-council/240d047d4f2cb135e6c1ce64b036af7aaf639a01/meetings/2023/2023-01-03.md'
          patch_file_path: './patch'
          output_file_path: './CODE_OF_CONDUCT.md'
      - uses: gr2m/create-or-update-pull-request-action@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          body: "Applied the patch to the base Code of Conduct."
          branch: actions/patch-code-of-conduct  # Custom branch *just* for this Action.
          commit-message: 'doc: update Code of Conduct'
          title: 'doc: update Code of Conduct'
```
