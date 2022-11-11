# Patch my Code of Conduct

This action adds a prefix to the default Code of Conduct template and applies the necessary templates.

## Example usage

```yaml
uses: @anonrig/patch-my-code-of-conduct@v1
with:
  base_path: './base.md'
  patch_path: './patch_file'
  output_path: '../../CODE_OF_CONDUCT.md'
```
