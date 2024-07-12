<template>
  <div
    class="nav"
    :style="computedEasings"
    ref="root"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="nav__container">
      <div>
        <div class="clark">
          <div class="icon"></div>
          <div>
            <h2>Quill</h2>
            <p>Craft Page and Docs</p>
          </div>
        </div>
      </div>
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
import { SpringFrame, CSSSpringEasing, SpringEasing, SpringOutFrame } from 'spring-easing'
import gsap from 'gsap'

// Components
import iconCodeBreaket from './../icons/IconCodeBreaket.vue'
import iconPaperClip from './../icons/IconPaperClip.vue'
import iconWindow from './../icons/IconWindow.vue'

// General State
const root = ref()
const activeTab = ref<number | null>(null)

// Default 1, 100, 15, 0
// Underdamped = 1, 200, 5, 0
// Critically damped = 1, 170, 26, 0
// Overdamped = 1, 170, 40, 0
let [easings, duration] = CSSSpringEasing({
  easing: [SpringFrame, 1, 200, 20, 0],
  numPoints: 100,
  decimal: 5
})

const getEasing = (x, y) => {
  return SpringEasing([x, y], {
    easing: 'spring-out-in(1, 200, 20, 0)',
    numPoints: 100
  })
}

// mass = mass of object
// stiffness = stiffness of spring
// damping = amount to dampen spring motion
// velocity = initial velocity of spring

const computedEasings = computed(() => {
  return {
    '--spring-duration': `${duration}ms`,
    '--spring-easing': `linear(${easings})`
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

const onMouseEnter = () => {
  const { value: el } = root

  // gsap.to(el, {
  //   width: '450px',
  //   height: '320px',
  //   duration: Math.round(duration) / 1000,
  //   ease: 'none'
  // })

  console.log('aqui', el, Math.round(duration) / 1000)
}

const onMouseLeave = () => {
  const { value: el } = root
  console.log('leave')
  // anime({
  //   targets: el,
  //   width: '380px',
  //   height: '40px',
  //   easing: 'spring(1, 200, 20, 0)'
  // })
}
</script>

<style lang="scss">
.nav {
  position: absolute;
  left: 50%;
  // right: 16px;
  bottom: 1.5rem;
  padding: 0.5rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 40px / 1fr;
  gap: 1rem;
  align-items: end;

  width: 380px;
  height: 40px;
  background-color: #ebd1ba;
  border-radius: 16px;
  transform: translateX(-50%);
  overflow: hidden;

  transition-property: width, height;
  transition-timing-function: var(--spring-easing, linear);
  transition-duration: var(--spring-duration, 1000ms);

  // &::before {
  //   position: absolute;
  //   z-index: 5;
  //   inset: 0;
  //   content: '';
  //   background-color: rgba(235, 209, 186, 0.1);
  //   backdrop-filter: blur(16px);
  // }

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
      // transform: translateY(0) scale(1);
      // transition:
      //   opacity 1s ease-out 0.3s,
      //   visibility 0.3s ease-out,
      //   transform 1s ease-out 0.3s;
    }
  }
}

nav {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  left: 0.5rem;
  z-index: 20;
  // grid-area: 2 / 1 / 3 / 2;
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
  // margin-bottom: 16px;
  // padding-bottom: 16px;
  border-bottom: 1px solid #c7ae98;
  opacity: 0;
  visibility: hidden;
  // transform: translateY(100%) scale(0.9);
  // transition:
  //   opacity 0.3s ease-out calc(var(--spring-duration, 1000ms) * 0.75),
  //   visibility 0.3s ease-out calc(var(--spring-duration, 1000ms) * 0.75),
  //   transform 0.3s ease-out calc(var(--spring-duration, 1000ms) * 0.75);
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
