<template>
  <span>{{ display }}{{ suffix }}</span>
</template>

<script>
export default {
  name: 'AnimatedNumber',
  props: {
    value: { type: Number, default: 0 },
    duration: { type: Number, default: 900 },
    suffix: { type: String, default: '' },
  },
  data() {
    return { display: 0, raf: null, start: 0, from: 0 }
  },
  watch: {
    value(next, prev) {
      this.animate(prev, next)
    },
  },
  mounted() {
    this.animate(0, this.value)
  },
  beforeDestroy() {
    if (this.raf) cancelAnimationFrame(this.raf)
  },
  methods: {
    animate(from, to) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        this.display = to
        return
      }
      if (this.raf) cancelAnimationFrame(this.raf)
      const begin = performance.now()
      const ease = (t) => 1 - Math.pow(1 - t, 3)
      const step = (now) => {
        const t = Math.min((now - begin) / this.duration, 1)
        this.display = Math.round(from + (to - from) * ease(t))
        if (t < 1) this.raf = requestAnimationFrame(step)
      }
      this.raf = requestAnimationFrame(step)
    },
  },
}
</script>
