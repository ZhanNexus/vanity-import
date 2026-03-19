import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const DOMAIN = "golang.nett.to";
const REPO_JSON_URL = "https://raw.githubusercontent.com/ZhanNexus/vanity-import/refs/heads/main/repo.json";

serve(async (req) => {
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/").filter(Boolean);

  if (pathParts.length < 2) {
    return new Response("Not Found", { status: 404 });
  }

  const [lang, repoName] = pathParts;

  try {
    const res = await fetch(REPO_JSON_URL);
    const repos = await res.json();

    if (lang === "go") {
      const data = (repos.golang || []).find((r: any) => r.name === repoName);
      if (!data) return new Response("Repo not found", { status: 404 });

      const importPath = `${DOMAIN}/go/${repoName}`;
      const html = `<!DOCTYPE html>
<html>
<head>
    <meta name="go-import" content="${importPath} git https://${data.url}">
</head>
<body>${importPath}</body>
</html>`;

      return new Response(html, { headers: { "content-type": "text/html" } });
    }

    if (lang === "py") {
      const data = (repos.python || []).find((r: any) => r.name === repoName);
      if (!data) return new Response("Repo not found", { status: 404 });
      return Response.redirect(`https://${data.url}`, 302);
    }

    return new Response("Invalid language", { status: 404 });
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
});

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
