<template>
  <div class="space-y-2">
    <div class="font-semibold">Список атрибутов</div>
  </div>
  <div
    v-for="item of attributes"
    :key="item._id"
    class="space-y-2 border-t-[1px] border-gray-300 pt-2"
  >
    <div class="font-semibold">
      {{ item.title }}
    </div>
    <div class="flex gap-4 flex-wrap">
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
            'font-normal text-gray-900 border-2 rounded-md px-3 py-1 cursor-pointer',
            data.attributes.some((b) => b.category == item._id && b.values?.includes(a._id))
              ? 'border-main bg-main text-white'
              : 'border-gray-200'
          ]"
          >{{ a.title }}</label
        >
      </div>
    </div>
  </div>
  <div
    v-for="item of provideAttributes"
    :key="item._id"
    class="space-y-2 border-t-[1px] border-gray-300 pt-2"
  >
    <div class="font-semibold">
      {{ item.title }}
    </div>
    <div class="flex gap-4 flex-wrap">
      <div v-for="a of item.attributes" :key="a._id" class="flex item gap-2">
        <input
          :id="a._id"
          :name="item._id"
          type="checkbox"
          :value="a._id"
          :checked="
            data.provideAttributes.some((b) => b.category == item._id && b.values?.includes(a._id))
          "
          @change="setProvideValues"
          class="hidden h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
        />
        <label
          :for="a._id"
          :class="[
            ' text-gray-900 border-2 rounded-md px-3 py-1 cursor-pointer',
            data.provideAttributes.some((b) => b.category == item._id && b.values?.includes(a._id))
              ? 'border-main bg-main text-white'
              : 'border-gray-200'
          ]"
          >{{ a.title }}</label
        >
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
const provideAttributes = ref([])

const setProvideValues = (e) => {
  let index = data.value.provideAttributes?.findIndex((v) => v.category == e.target.name)
  if (index == -1) {
    data.value.provideAttributes.push({
      category: e.target.name,
      values: [e.target.value]
    })
    return
  }

  if (data.value.provideAttributes[index].values?.includes(e.target.value)) {
    data.value.provideAttributes[index].values = data.value.provideAttributes[index].values.filter(
      (b) => b != e.target.value
    )
    if (data.value.provideAttributes[index]?.values?.length == 0) {
      data.value.provideAttributes.splice(index, 1)
    }
    return
  }
  data.value.provideAttributes[index].values.push(e.target.value)
}

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
  provideAttributes.value = await main.getAtributes({
    slugs: ['food', 'drinks', 'tickets', 'transport', 'inventory']
  })
})
</script>

<style lang="scss" scoped></style>
