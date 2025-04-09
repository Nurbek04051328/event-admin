<template>
  <div class="space-y-4">
    {{ data.attributes }}
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
  </div>
</template>

<script setup>
import { mainStore } from '@/stores/data/default'
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
