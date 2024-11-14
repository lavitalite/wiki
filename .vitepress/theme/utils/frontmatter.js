const parser = new DOMParser()
const EMPTY_LINK_SELECTOR = 'a[href="/.html"]'


export const excerptToLink = post => {
    // exceprt not exist or transformed
    if(!post.frontmatter.excerpt || post.excerptTransformed) { return }

    const $body =parser.parseFromString(post.frontmatter.excerpt, 'text/html').body
    const $linkToPost = $body.querySelector(EMPTY_LINK_SELECTOR)

    if($linkToPost) {
        $linkToPost.href = url
    } else {
        $body.innerHTML = `<p><a href="${post.url}>${body.children[0].innerHTML}</a></p>`
    }


    post.frontmatter.excerpt = $body.children[0].innerHTML
    post.excerptTransformed = true
}
