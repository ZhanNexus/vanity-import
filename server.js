const express = require("express")
const fs = require("fs")

const app = express()

const DOMAIN = "zhan.nett.to"
const repos = JSON.parse(fs.readFileSync("./repo.json"))

function findRepo(type, name) {
    const list = repos[type] || []
    return list.find(r => r.name === name)
}

app.get("/:lang/:repo", (req, res) => {

    const { lang, repo } = req.params

    if (lang === "go") {

        const data = findRepo("golang", repo)
        if (!data) return res.status(404).send("repo not found")

        const importPath = `${DOMAIN}/go/${repo}`

        return res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="go-import" content="${importPath} git https://${data.url}">
</head>
<body>
${importPath}
</body>
</html>
`)
    }

    if (lang === "py") {

        const data = findRepo("python", repo)
        if (!data) return res.status(404).send("repo not found")

        return res.redirect(`https://${data.url}`)
    }

    res.status(404).send("invalid language")
})

app.listen(3000, () => {
    console.log("Server running")
})
