<script>
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "../components/serializers";
  import getImageUrl from "../getImageUrl";
  import formatDate from "../formatDate";

  export let post;
</script>

<style>
  .post-item {
    display: flex;
    align-items: flex-end;
    height: 400px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 2px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.63);
    opacity: 1;
    transition: 0.2s ease;
    backface-visibility: hidden;
  }

  .post-item:hover {
    opacity: 0.8;
    box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.63);
  }
  .post-item__footer {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    justify-items: flex-start;
    width: 100%;
    background: white;
    padding: 15px;
    height: 132px;
    max-height: 132px;
  }

  .post-item__title {
    color: hotpink;
  }

  .post-item__date {
    font-size: smaller;
    align-self: end;
  }
</style>

<a
  class="post-item"
  rel="prefetch"
  href="blog/{post.slug.current}"
  style="background-image: url('{getImageUrl(post.mainImage).width(600)}')">
  <div class="post-item__footer">
    <h3 class="post-item__title">{post.title}</h3>
    <BlockContent blocks={post.excerpt} {serializers} />
    <span class="post-item__date">({formatDate(post.publishedAt)})</span>
  </div>
</a>
