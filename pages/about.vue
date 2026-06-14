<template>
  <div class="about anim-fade-in">
    <section class="hero surface-card">
      <span class="hero__badge">
        <Icon name="sparkles" :size="14" /> Nuxt.js · learning project
      </span>
      <h1 class="hero__title">
        A calm place to track<br />
        <span class="hero__grad">everything you need to do.</span>
      </h1>
      <p class="hero__sub">
        Tasks is a small kanban board built with Nuxt, Vuex and Tailwind — now
        with a premium, fully-themeable interface. Add tasks, drag them across
        your workflow, and your board is saved right in the browser.
      </p>
      <div class="hero__cta">
        <NuxtLink to="/todos" class="btn btn-primary">
          Open the board <Icon name="arrow-right" :size="18" />
        </NuxtLink>
        <NuxtLink to="/addTask" class="btn btn-ghost">
          <Icon name="plus" :size="18" /> New task
        </NuxtLink>
      </div>
    </section>

    <section class="features stagger">
      <article v-for="f in features" :key="f.title" class="feature surface-card">
        <span class="feature__icon" :style="{ background: f.soft, color: f.color }">
          <Icon :name="f.icon" :size="22" />
        </span>
        <h3>{{ f.title }}</h3>
        <p>{{ f.body }}</p>
      </article>
    </section>

    <section class="stack surface-card">
      <span class="stack__label">Built with</span>
      <div class="stack__chips">
        <span v-for="t in tech" :key="t" class="chip stack__chip">{{ t }}</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      features: [
        {
          title: 'Drag & drop board',
          body: 'Move tasks between To do, In progress and Completed with smooth, physical motion.',
          icon: 'board',
          color: 'var(--c-todo)',
          soft: 'var(--c-todo-soft)',
        },
        {
          title: 'Saved automatically',
          body: 'Your tasks persist in localStorage, so the board is exactly how you left it.',
          icon: 'check-circle',
          color: 'var(--c-done)',
          soft: 'var(--c-done-soft)',
        },
        {
          title: 'Light & dark',
          body: 'A carefully tuned palette for both modes, switchable any time from the top bar.',
          icon: 'moon',
          color: 'var(--c-progress)',
          soft: 'var(--c-progress-soft)',
        },
      ],
      tech: ['Nuxt.js', 'Vue', 'Vuex', 'Tailwind CSS', 'SCSS', 'i18n', 'PWA'],
    }
  },
}
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 920px;
  margin: 0 auto;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 44px clamp(24px, 5vw, 48px);
  border-radius: var(--r-xl);
}
.hero::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -80px;
  width: 360px;
  height: 360px;
  border-radius: 9999px;
  background: var(--accent-grad);
  opacity: 0.16;
  filter: blur(40px);
  animation: float-orb 11s ease-in-out infinite;
}
.hero::after {
  content: '';
  position: absolute;
  bottom: -140px;
  left: -60px;
  width: 280px;
  height: 280px;
  border-radius: 9999px;
  background: radial-gradient(circle, var(--c-progress) 0%, transparent 70%);
  opacity: 0.1;
  filter: blur(44px);
  animation: float-orb-2 13s ease-in-out infinite;
}
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: 9999px;
  padding: 6px 13px;
  margin-bottom: 18px;
}
.hero__title {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4.4vw, 2.9rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.025em;
}
.hero__grad {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero__sub {
  margin: 16px 0 0;
  max-width: 560px;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
.hero__cta {
  display: flex;
  gap: 12px;
  margin-top: 26px;
  flex-wrap: wrap;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.feature {
  padding: 22px;
  border-radius: var(--r-lg);
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}
.feature:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.feature__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}
.feature h3 {
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 600;
  margin-bottom: 6px;
}
.feature p {
  margin: 0;
  font-size: 0.87rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

.stack {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 18px 22px;
  border-radius: var(--r-lg);
}
.stack__label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.stack__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.stack__chip {
  background: var(--surface-2);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  font-size: 0.78rem;
  padding: 6px 12px;
}

@media (max-width: 760px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
