const TRAILING_SLASH_RE = /\/$/;
export const removeTrailingSlash = (path) => {
    path.replace(TRAILING_SLASH_RE, '');
};
export function parseURL(parseQuery, location, currentLocation = '/') {
    let path, query = {}, searchString = '', hash = '';
    const hashPos = location.indexOf('#');
    let searchPos = location.indexOf('?');
    // the hash appear before the search, so it's not part of the search string
    if (hashPos < searchPos && hashPos >= 0) {
        searchPos = -1;
    }
    if (searchPos > -1) {
        path = location.slice(0, searchPos);
        searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
        query = parseQuery(searchString);
    }
    if (hashPos > -1) {
        path = path || location.slice(0, hashPos);
        //# keep the # character
        hash = location.slice(hashPos, location.length);
    }
    // no search and no query
    path = resolveRelativePath(path != null ? path : location, currentLocation);
    return {
        fullPath: path + (searchString && '?') + searchString + hash,
        path,
        query,
        hash: decode(hash)
    };
}
