<script context="module">
  import PostItem from "../components/PostItem.svelte";
  import client from "../sanityClient";

  export function preload({ params, query }) {
    return client
      .fetch(
        '*[_type == "post" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)'
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
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>
<div class="posts">
  {#each posts as post}
    <PostItem {post} />
  {/each}
</div>
