<script context="module">
  import client from "../../sanityClient";
  import PostItem from "../../components/PostItem.svelte";
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "../../components/serializers";

  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params;

    const post = await client
      .fetch(
        '*[_type == "post" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)',
        { slug }
      )
      .then(posts => {
        return { posts };
      })
      .catch(err => this.error(500, err));
  }
</script>

<script>
  export let posts;
</script>

<style>
  .posts {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 15px;
  }

  @media only screen and (min-width: 992px) {
    .posts {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<svelte:head>
  <title>yeah</title>
</svelte:head>

<h1>yeah</h1>

<div class="posts">
  {#each posts as post}
    <PostItem {post} />
  {/each}
</div>
