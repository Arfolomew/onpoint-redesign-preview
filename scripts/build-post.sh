#!/bin/bash
# Usage: ./scripts/build-post.sh <slug>
# Reads content/blog/<slug>.md and metadata from posts.json, generates blog/<slug>.html

PROJ="/home/jake/Desktop/Projects/OnPoint"
SLUG="$1"

if [ -z "$SLUG" ]; then
    echo "Usage: build-post.sh <slug>"
    exit 1
fi

MD_FILE="$PROJ/content/blog/$SLUG.md"
if [ ! -f "$MD_FILE" ]; then
    echo "Error: $MD_FILE not found"
    exit 1
fi

# Extract metadata from posts.json
TITLE=$(jq -r ".[] | select(.slug==\"$SLUG\") | .title" "$PROJ/content/blog/posts.json")
DATE=$(jq -r ".[] | select(.slug==\"$SLUG\") | .date" "$PROJ/content/blog/posts.json")
CATEGORY=$(jq -r ".[] | select(.slug==\"$SLUG\") | .category // \"Insight\"" "$PROJ/content/blog/posts.json")
IMAGE=$(jq -r ".[] | select(.slug==\"$SLUG\") | .image // empty" "$PROJ/content/blog/posts.json")
EXCERPT=$(jq -r ".[] | select(.slug==\"$SLUG\") | .excerpt" "$PROJ/content/blog/posts.json")

FORMATTED_DATE=$(date -d "$DATE" "+%B %d, %Y" 2>/dev/null || echo "$DATE")

# Convert markdown to HTML (basic conversion with sed)
BODY=$(cat "$MD_FILE" | \
    sed 's/^### \(.*\)/<h3>\1<\/h3>/' | \
    sed 's/^## \(.*\)/<h2>\1<\/h2>/' | \
    sed 's/^# \(.*\)/<h1>\1<\/h1>/' | \
    sed 's/\*\*\([^*]*\)\*\*/<strong>\1<\/strong>/g' | \
    sed 's/\*\([^*]*\)\*/<em>\1<\/em>/g' | \
    sed 's/!\[\([^]]*\)\](\([^)]*\))/<img src="\2" alt="\1" class="post__img" loading="lazy">/g' | \
    sed 's/\[\([^]]*\)\](\([^)]*\))/<a href="\2">\1<\/a>/g' | \
    sed '/^$/N;s/^\n$//' | \
    awk '
    /^<h[1-6]>/ { print; next }
    /^<img / { print; next }
    /^- / { 
        if (!inlist) { print "<ul>"; inlist=1 }
        sub(/^- /, ""); print "<li>" $0 "</li>"; next 
    }
    inlist && !/^- / { print "</ul>"; inlist=0 }
    /^[[:space:]]*$/ { next }
    /^[^<]/ { print "<p>" $0 "</p>"; next }
    { print }
    END { if (inlist) print "</ul>" }
    ')

# Hero image
HERO_IMG=""
if [ -n "$IMAGE" ]; then
    HERO_IMG="<img class=\"post__hero\" src=\"../$IMAGE\" alt=\"$TITLE\">"
fi

cat > "$PROJ/blog/$SLUG.html" << HTMLEOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="$EXCERPT">
    <meta name="robots" content="index, follow">
    <title>$TITLE — On Point Blog</title>
    <link rel="preconnect" href="https://api.fontshare.com">
    <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=general-sans@400,500,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="icon" type="image/x-icon" href="../assets/favicon.ico">
    <style>
        .post-nav {
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 40px; height: 80px; border-bottom: 1px solid var(--border-line);
            position: fixed; top: 0; left: 0; right: 0; z-index: 100;
            background: rgba(17,17,20,0.9); backdrop-filter: blur(20px);
        }
        .post-nav__back { color: var(--cream); text-decoration: none; font-family: var(--font-body); font-size: 0.9rem; }
        .post-nav__back:hover { color: var(--coral); }
        .post-nav__logo { width: 50px; height: 50px; object-fit: contain; }
        .post { max-width: 720px; margin: 0 auto; padding: 120px 24px 80px; }
        .post__tag { font-family: var(--font-mono, monospace); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: var(--teal); margin-bottom: 16px; }
        .post__title { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; text-transform: uppercase; color: var(--cream); line-height: 1; margin-bottom: 16px; }
        .post__date { font-family: var(--font-body); font-size: 0.85rem; color: rgba(240,230,211,0.4); margin-bottom: 40px; }
        .post__hero { width: 100%; max-height: 400px; object-fit: cover; border-radius: 2px; margin-bottom: 40px; border: 1px solid var(--border-line); }
        .post h2 { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--cream); margin: 48px 0 12px; text-transform: uppercase; letter-spacing: 0.5px; padding-top: 40px; border-top: none; position: relative; }
        .post h2::before { content: ''; display: block; width: 40px; height: 3px; margin-bottom: 16px; border-radius: 2px; }
        .post h2:nth-of-type(5n+1)::before { background: var(--coral); }
        .post h2:nth-of-type(5n+2)::before { background: var(--teal); }
        .post h2:nth-of-type(5n+3)::before { background: var(--purple, #a855f7); }
        .post h2:nth-of-type(5n+4)::before { background: var(--yellow, #f0d060); }
        .post h2:nth-of-type(5n+5)::before { background: linear-gradient(90deg, var(--coral), var(--teal)); }
        .post h3 { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--cream); margin: 32px 0 10px; }
        .post p { font-family: var(--font-body); color: var(--text-body); font-size: 0.95rem; line-height: 1.8; margin-bottom: 16px; }
        .post ul { padding-left: 20px; margin: 12px 0 20px; }
        .post li { font-family: var(--font-body); color: var(--text-body); font-size: 0.95rem; line-height: 1.8; margin-bottom: 6px; }
        .post a { color: var(--coral); text-decoration: none; }
        .post a:hover { text-decoration: underline; }
        .post__img { width: 100%; border-radius: 2px; margin: 24px 0; border: 1px solid var(--border-line); }
        .post__cta { margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border-line); text-align: center; }
        .post__cta p { color: var(--cream); font-size: 1rem; margin-bottom: 16px; }
        .post__cta a { display: inline-block; padding: 14px 32px; background: var(--dark); color: var(--cream); font-family: var(--font-body); font-weight: 600; text-decoration: none; box-shadow: -3px -2px 0 0 #4ecdc4, 3px 2px 0 0 #ff6b6b; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .post__cta a:hover { transform: translate(-3px, -2px); box-shadow: -1px -1px 0 0 #4ecdc4, 3px 2px 0 0 #ff6b6b; text-decoration: none; }
        @media (max-width: 768px) { .post-nav { padding: 0 20px; } .post { padding: 100px 20px 60px; } }
    </style>
</head>
<body>
    <div class="page-grain" aria-hidden="true"></div>
    <nav class="post-nav">
        <a href="../blog.html" class="post-nav__back">← All Posts</a>
        <a href="../index.html"><img class="post-nav__logo" src="../assets/onpoint-pin-3d.svg" alt="On Point"></a>
    </nav>
    <article class="post">
        <div class="post__tag">$CATEGORY</div>
        <h1 class="post__title">$TITLE</h1>
        <div class="post__date">$FORMATTED_DATE</div>
        $HERO_IMG
        $BODY
        <div class="post__cta">
            <p><strong>Ready to grow your business online?</strong></p>
            <a href="../index.html#contact">Get Your Free Strategy Call →</a>
        </div>
    </article>
</body>
</html>
HTMLEOF

echo "Built blog/$SLUG.html"
