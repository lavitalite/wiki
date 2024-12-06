```ts
:root,
:root[data-theme=dark] {

  --theme-c-bg-depth-1: #FFFFFF;
  --theme-c-bg-depth-2: #FAFAFA;
  --theme-c-bg-depth-3: #E5E5E5;
  --theme-c-bg-depth-4: #1717170d;
}


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
```ts
window.matchMedia("(prefers-color-scheme: dark)").matches&&document.documentElement.classList.add("dark");
```