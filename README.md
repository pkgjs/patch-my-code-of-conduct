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
        uses: pkgjs/patch-my-code-of-conduct@v1.3.0
        with:
          base_url: './BASE.md'
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

## Useful Information

### Generate patch file

- Generate a `premable+template.md`
- Generate a `original-expected.md` file

```bash
diff -Naur preamble+template.md original-expected.md > patch
```

### Running patching script

```
patch -i patch preamble+template.md -o expected.md --no-backup-if-mismatch
```
