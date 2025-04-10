<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <div class="font-semibold">Список атрибутов</div>
    </div>
    <div v-for="item of attributes" :key="item._id" class="space-y-2">
      <div class="font-semibold">
        {{ item.title }}
      </div>
      <div class="flex gap-4">
        <div v-for="a of item.attributes" :key="a._id" class="flex item gap-2">
          <input
            :id="a._id"
            :name="item._id"
            type="checkbox"
            :value="a._id"
            :checked="
              data.attributes.some((b) => b.category == item._id && b.values?.includes(a._id))
            "
            @change="setValues"
            class="hidden h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
          />
          <label
            :for="a._id"
            :class="[
              'font-medium text-gray-900 border-2 px-3 py-1 cursor-pointer',
              data.attributes.some((b) => b.category == item._id && b.values?.includes(a._id))
                ? 'border-main'
                : 'border-gray-200'
            ]"
            >{{ a.title }}</label
          >
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">Уникальные особенности места</div>
      <defaultTextarea v-model="data.locationDesc" :rows="5" name="locationDesc" />
    </div>
    <div class="space-y-2">
      <div class="space-y-[10px]" v-if="data.guestNeed.giveAnything">
        <div class="font-semibold">Что взять с собой</div>
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
        <button @click="addBring">
          + <span class="underline underline-offset-2">Добавить предмет</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mainStore } from '@/stores/data/default'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { onMounted, ref } from 'vue'
const main = mainStore()
const data = defineModel()
const attributes = ref([])

const setValues = (e) => {
  let index = data.value.attributes?.findIndex(
    (v) => v.category == e.target.name && v.slug == 'location'
  )
  if (index == -1) {
    data.value.attributes.push({
      category: e.target.name,
      values: [e.target.value],
      slug: 'location'
    })
    return
  }

  if (data.value.attributes[index].values?.includes(e.target.value)) {
    data.value.attributes[index].values = data.value.attributes[index].values.filter(
      (b) => b != e.target.value
    )
    if (data.value.attributes[index]?.values?.length == 0) {
      data.value.attributes.splice(index, 1)
    }
    return
  }
  data.value.attributes[index].values.push(e.target.value)

  console.log(e.target.name, e.target.value)
}

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

onMounted(async () => {
  attributes.value = await main.getAtributes({
    slugs: [
      'attachment',
      'place-of-residence',
      'sports-and-fitness-center',
      'government-or-educational-institution',
      'type-of-animals',
      'type-of-event-with-animals'
    ]
  })
})
</script>

<style lang="scss" scoped></style>
