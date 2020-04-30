<script context="module">
  import client from "../../sanityClient";
  import PostItem from "../../components/PostItem.svelte";
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "../../components/serializers";

  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params;

    const category = await client
      .fetch('*[_type == "category" && slug.current == $slug][0]', { slug })
      .catch(err => this.error(500, err));

    const categoryId = category._id;

    const posts = await client
      .fetch(
        '*[_type == "post" && defined(slug.current) && categories[]._ref == $categoryId && publishedAt < now()]|order(publishedAt desc)',
        { slug, categoryId }
      )
      .catch(err => this.error(500, err));

    return { category, posts };
  }
</script>

<script>
  export let category;
  export let posts;
  $: numberOfPosts = posts.length;
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
  <title>{category.title}</title>
</svelte:head>

<h1>{category.title}</h1>
{#if numberOfPosts > 1}
  <p>There are {posts.length} awesome posts to read in this category!</p>
{/if}

<div class="posts">
  {#each posts as post}
    <PostItem {post} />
  {/each}
</div>
