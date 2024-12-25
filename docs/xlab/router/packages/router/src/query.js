export function parseQuery(search) {
    const query = {};
    if (search === '' || search === '?')
        return query;
    const hasLeadingIM = search[0] === '?';
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
    return query;
}
export function stringfyQuery(query) {
}
