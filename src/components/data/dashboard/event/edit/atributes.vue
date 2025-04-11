<template>
  <div class="space-y-4">
    <attributesList v-model="data" />
    <div class="space-y-2">
      <div class="font-semibold">Описание места</div>
      <defaultTextarea v-model="data.locationDesc" :rows="5" name="locationDesc" />
    </div>
    <div class="space-y-2">
      <div class="space-y-[10px]" v-if="data.guestNeed.giveAnything">
        <div class="font-semibold">Что взять с собой</div>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="(bring, index) of data.guestNeed.bring"
            :key="index"
            class="input-box pr-[25px]"
          >
            <input
              type="text"
              class="input-inbox flex-1"
              v-model="data.guestNeed.bring[index]"
              placeholder="Предмет"
            />
            <button
              class="size-6 transition-all"
              :class="{
                visible: data.guestNeed.bring[index]?.length > 0,
                hidden: data.guestNeed.bring[index]?.length == 0
              }"
              @click="removeBring(index)"
            >
              <XMarkIcon class="size-6" />
            </button>
          </div>
        </div>
        <button @click="addBring">
          + <span class="underline underline-offset-2">Добавить предмет</span>
        </button>
      </div>
    </div>
    <div class="space-y-2">
      <Drive v-model="data" />
    </div>
  </div>
</template>

<script setup>
import attributesList from './attribute/attributes.vue'
import { mainStore } from '@/stores/data/default'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import Drive from './attribute/drive.vue'
const main = mainStore()
const data = defineModel()

const removeBring = (index) => {
  if (index == 0 && data.value.guestNeed.bring?.length == 1) {
    data.value.guestNeed.bring[index] = ''
    return
  }

  data.value.guestNeed.bring.splice(index, 1)
}

const addBring = () => {
  if (data.value.guestNeed.bring.at(-1)?.length == 0) return false
  data.value.guestNeed.bring.push('')
}
</script>

<style lang="scss" scoped></style>
