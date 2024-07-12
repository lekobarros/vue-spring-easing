<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../components/Modal.vue'
import Nav from '../components/Nav/index.vue'

import listEasing from './../../src/data/easing.ts'

// Types
type Spring = {
  mass: number
  stiffness: number
  damping: number
  velocity: number
}

// Data
const easingCubicBezier = ref<string>('cubic-bezier(0, 0, 1, 1)')
const easingCubicBezierDuration = ref<string>('1000')
const easingSpring = ref<Spring>({ mass: 1, stiffness: 200, damping: 20, velocity: 1 })
</script>

<template>
  <main class="mx-auto grid grid-cols-12 grid-rows-8 container min-h-screen">
    <div class="flex flex-col gap-8 py-4 col-span-12 row-span-2">
      <h2 class="text-convenia-500 text-4xl">Cubic Bezier vs Spring</h2>

      <!-- Form cubic-bezier -->
      <form class="flex justify-space gap-16">
        <div class="flex-1">
          <h3 class="text-2xl">Cubic-bezier</h3>
          <p>timing-function / duration (ms)</p>
        </div>

        <div class="flex gap-4">
          <select v-model="easingCubicBezier">
            <option v-for="(cubicBezier, key) in listEasing" :key="key" :value="cubicBezier">
              {{ key }} - {{ cubicBezier }}
            </option>
          </select>

          <input type="text" placeholder="timing" v-model="easingCubicBezierDuration" />
        </div>
      </form>

      <!-- Form Spring -->
      <form action="" class="flex gap-4">
        <div class="flex-1">
          <h3 class="text-2xl">Spring</h3>
          <p>mass / stiffness / damping / velocity</p>
        </div>

        <div class="flex gap-4">
          <input type="text" placeholder="mass" v-model="easingSpring.mass" />
          <input type="text" placeholder="stiffness" v-model="easingSpring.stiffness" />
          <input type="text" placeholder="damping" v-model="easingSpring.damping" />
          <input type="text" placeholder="velocity" v-model="easingSpring.velocity" />
        </div>
      </form>
    </div>

    <div class="col-span-12 row-span-10 grid grid-cols-2 grid-row-1 w-full">
      <div class="relative flex items-center justify-center">
        <Nav :easings="easingCubicBezier" :duration="easingCubicBezierDuration" />
      </div>
      <div class="relative flex items-center justify-center">
        <Nav :spring="easingSpring" />
      </div>
    </div>
  </main>
</template>
