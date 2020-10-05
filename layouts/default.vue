<template>
  <div class="mx-4 sm:mx-0">
    <nuxt />
  </div>
</template>

<style>
@media screen and (prefers-reduced-motion: reduce), (update: slow) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important; /* Hat tip Nick/cssremedy (https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/#comment-1700170) */
    transition-duration: 0.001ms !important;
  }
}
</style>
