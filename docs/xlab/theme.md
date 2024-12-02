```ts
html[data-theme="dark"] {
  color-scheme: dark;
}

html[data-theme="light"] {
  --xy-c-white: #ffffff;
  --xy-c-black: #000000;
  --xy-c-neutral: var(--xy-c-black);
  --xy-c-neutral-inverse: var(--xy-c-white);


  --xy-local-search-bg: var(--xy-c-bg);
  --xy-local-search-result-bg: var(--xy-c-bg);
  --xy-local-search-result-border: var(--xy-c-divider);
  --xy-local-search-result-selected-bg: var(--xy-c-bg);
  --xy-local-search-result-selected-border: var(--xy-c-brand-1);
  --xy-local-search-highlight-bg: var(--xy-c-brand-1);
  --xy-local-search-highlight-text: var(--xy-c-neutral-inverse);
}

html[data-theme="light"] {
  color-scheme: light;
}
```