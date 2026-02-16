// Vercel Serverless Function — proxies the latest Substack post
// Endpoint: /api/latest-post
// Caches for 10 minutes to avoid hammering Substack

export default async function handler(req, res) {
    try {
        const response = await fetch('https://fabdolan.substack.com/api/v1/posts?limit=1');
        if (!response.ok) throw new Error('Substack API returned ' + response.status);

        const posts = await response.json();
        if (!posts || posts.length === 0) throw new Error('No posts found');

        const post = posts[0];
        const data = {
            title: post.title,
            url: post.canonical_url || ('https://fabdolan.substack.com/p/' + post.slug),
            date: post.post_date
        };

        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({
            title: 'Read the latest from X Becomes Software',
            url: 'https://fabdolan.substack.com',
            error: true
        });
    }
}
