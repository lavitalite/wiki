declare module '@utils/client-svg-register' {
    export function initSvgSymbols(rawOpts?: Omit<LoadSvgSymbolsOptions, 'iconDirs'>): Promise<string[]>;
}
