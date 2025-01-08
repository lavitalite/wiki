/// <reference types="vite/client" />
function loadSvgSymbols(insertPosition = 'afterbegin') {
  if (document.getElementById('svg-symbol-container')) {
    console.warn('SVG symbols have already been loaded.');
    return;
  }
  const symbolContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  symbolContainer.id = 'svg-symbol-container';
  symbolContainer.style.display = 'none';
  symbolContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  // symbolContainer.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");


  // 利用 import.meta.glob 动态导入所有SVG文件
  const svgModules = import.meta.glob('../assets/*.svg', {
    // as: 'raw',
    query: '?raw',
    import: 'default',
    eager: true
  });
  const symbols: string[] = [];

  Object.entries(svgModules).forEach(([path, content]) => {

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(content as string, 'image/svg+xml');
    svgDoc.querySelectorAll('symbol').forEach(symbol => {
      if (!symbol.id) {
        const filename = path.split('/').pop()!.replace('.svg', '');
        symbol.setAttribute('id', filename);
      }
      symbols.push(symbol.outerHTML);
    });
  });

  symbolContainer.innerHTML = symbols.join('');



  if (insertPosition === 'afterbegin') {
    document.body.insertAdjacentElement('afterbegin', symbolContainer);
  } else {
    document.body.insertAdjacentElement('beforeend', symbolContainer);
  }
}


if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadSvgSymbols('afterbegin'));
  } else {
    loadSvgSymbols('afterbegin');
  }
}
