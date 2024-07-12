<template>
  <div class="nav" :style="computedEasings" ref="root">
    <div class="nav__container">
      <img
        src="https://ih1.redbubble.net/image.5071106655.9650/flat,750x,075,f-pad,750x1000,f8f8f8.u4.webp"
        width="180"
        height="180"
        alt="Eu tbm qro ser semantico"
      />
      <!-- <div>
        <div class="clark">
          <div class="icon"></div>
          <div>
            <h2>Quill</h2>
            <p>Craft Page and Docs</p>
          </div>
        </div>
      </div> -->
    </div>

    <nav>
      <ul class="navbar-nav">
        <li v-bind="getBindTab(0)" @click="setActiveTab(0)"><icon-window /> Apps</li>
        <li v-bind="getBindTab(0)" @click="setActiveTab(0)"><icon-code-breaket /> Components</li>
        <li v-bind="getBindTab(0)" @click="setActiveTab(0)"><icon-paper-clip /> Notes</li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { SpringFrame, CSSSpringEasing } from 'spring-easing'

// Components
import iconCodeBreaket from './../icons/IconCodeBreaket.vue'
import iconPaperClip from './../icons/IconPaperClip.vue'
import iconWindow from './../icons/IconWindow.vue'

// Props
type Spring = {
  mass: number
  stiffness: number
  damping: number
  velocity: number
}

const props = defineProps<{
  easings?: string
  spring?: Spring
  duration?: string
}>()

// General State
const root = ref()
const activeTab = ref<number | null>(null)

// Default 1, 100, 15, 0
// Underdamped = 1, 200, 5, 0
// Critically damped = 1, 170, 26, 0
// Overdamped = 1, 170, 40, 0

// mass = mass of object
// stiffness = stiffness of spring
// damping = amount to dampen spring motion
// velocity = initial velocity of spring

// Computed
const computedEasings = computed(() => {
  const isEasings = props.easings
  const isSpring = props.spring

  if (isEasings) {
    return {
      '--spring-duration': `${props?.duration || 1000}ms`,
      '--spring-easing': props.easings
    }
  } else if (isSpring) {
    const { mass, stiffness, damping, velocity } = props.spring

    const [easings, duration] = CSSSpringEasing({
      easing: [SpringFrame, mass, stiffness, damping, velocity],
      numPoints: 100
    })

    return {
      '--spring-duration': `${duration}ms`,
      '--spring-easing': `linear(${easings})`
    }
  }

  return {
    '--spring-duration': `1000ms`,
    '--spring-easing': `linear`
  }
})

// Methods
const setActiveTab = (tab: number) => {
  activeTab.value = tab
}

const getBindTab = (tab: number) => {
  return {
    class: [
      'navbar-nav__child',
      {
        'navbar-nav__child--active': activeTab.value === tab
      }
    ]
  }
}
</script>

<style lang="scss">
.nav {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  padding: 0.5rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px / 1fr;
  gap: 1rem;
  align-items: end;

  width: calc(380px + 2rem);
  height: calc(40px + 2rem);
  background-color: #ebd1ba;
  border-radius: 16px;
  transform: translateX(-50%);
  overflow: hidden;

  transition-property: width, height;
  transition-timing-function: var(--spring-easing, linear);
  transition-duration: var(--spring-duration, 1000ms);

  &:after {
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    height: 72px;
    background-color: #ebd1ba;
  }

  &:hover {
    grid-template-rows: 1fr 40px;
    width: 464px;
    height: 320px;

    .nav__container {
      opacity: 1;
      visibility: visible;

      & > img {
        opacity: 1;
        visibility: visible;
        transform: scale(1.1) rotate(25deg);
      }
    }
  }
}

nav {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  z-index: 20;
}

.navbar-nav {
  display: flex;
  justify-content: center;
  gap: 16px;
  list-style-type: none;
  margin: 0;
  padding: 0;

  &__child {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
    background-color: transparent;
    border-radius: 16px;
    transition: all 0.3s ease-out;

    &:hover,
    &.active {
      color: #fff;
      background-color: #000;
    }
  }
}

.nav__container {
  grid-area: 1 / 1 / 2 / 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #c7ae98;
  opacity: 0;
  visibility: hidden;
  // transform: translateY(100%) scale(0.9);
  // transition:
  //   opacity 0.3s ease-out calc(var(--spring-duration, 1000ms) * 0.75),
  //   visibility 0.3s ease-out calc(var(--spring-duration, 1000ms) * 0.75),
  //   transform 0.3s ease-out calc(var(--spring-duration, 1000ms) * 0.75);

  & > img {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.5) rotate(-25deg);

    transition-property: all;
    transition-timing-function: var(--spring-easing, linear);
    transition-duration: var(--spring-duration, 1000ms);
    transition-delay: 300ms;
  }
}

// Others
.icon {
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 3px;
  display: inline-block;
}

.clark {
  display: flex;
  align-items: center;
  gap: 16px;

  h2 {
    margin-bottom: 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    line-height: 1;
  }

  p {
    color: #664932;
    font-size: 16px;
    line-height: 1;
  }
}
</style>
