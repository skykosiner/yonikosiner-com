function HandleBlogPosts(posts) {
    const postsArr = posts.split(" ")
    let postHTML = ""
    postsArr.map((post) => {
        // Because Mac's like to create this weird ass .DS_Store file and sometimes
        // I publish stuff from my MacBook not arch linux (btw)
        if (post === "" || post === "DS_Store" || post.includes(".org")) {
            return
        }

        // Split the title of the post by new capital letters such as
        // HelloWorld would become Hello world
        const postTitleArr = post.split(/(?=[A-Z])/)
        let postTitle = ""

        postTitleArr.map((word) => {
            postTitle += " " + word
        })

        postHTML += `<li><a href="/blog/${post}">${postTitle}</a></li/>`
    })

    return postHTML
}

fetch("/getPosts")
    .then(resp => resp.text())
    .then(data => {
        const posts = document.getElementById("posts")
        const body = HandleBlogPosts(data)

        posts.innerHTML = body
    })

fetch("/html/nav.html")
.then(res => res.text())
.then(text => {
    let oldelem = document.getElementById("replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})

fetch("/html/footer.html")
.then(res => res.text())
.then(text => {
    let oldelem = document.getElementById("replace_with_footer");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})
