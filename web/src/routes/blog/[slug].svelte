<script context="module">
  import client from "../../sanityClient";
  import PostItem from "../../components/PostItem.svelte";
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "../../components/serializers";

  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params;
    // *[_type=='movie']{title,poster{asset->{path,url}}}
    const filter = '*[_type == "post" && slug.current == $slug][0]';
    const projection = `{
      title,
      body,
      "categories": categories[]->{title, slug},
    }`;

    const query = filter + projection;
    const post = await client
      .fetch(query, { slug })
      .catch(err => this.error(500, err));

    const otherPosts = await client
      .fetch(
        '*[_type == "post" && defined(slug.current) && slug.current != $slug && publishedAt < now()][0...4]|order(publishedAt desc)',
        { slug }
      )
      .catch(err => this.error(500, err));

    return { post, otherPosts };
  }
</script>

<script>
  export let post;
  export let otherPosts;
</script>

<style>
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(img) {
    display: block;
    max-width: 100%;
  }

  .content :global(figure) {
    margin: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  .otherposts-heading {
    margin: 100px 0 20px;
  }
  .otherposts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>
<div>
  <b>Categories:</b>
  {#each post.categories as category}
    <a href="/categories/{category.slug.current}">{category.title}</a>
  {/each}
</div>

<div class="content">
  <BlockContent blocks={post.body} {serializers} />
</div>

<h2 class="otherposts-heading">The latest awesome stuff to read</h2>
<div class="otherposts">

  {#each otherPosts as otherPost}
    <PostItem post={otherPost} />
  {/each}
</div>
