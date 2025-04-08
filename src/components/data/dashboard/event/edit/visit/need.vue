<template>
  <div class="space-y-[20px]">
    <div class="space-y-[10px]">
      <div class="subtitle">{{ t('8.special') }}</div>
      <div class="text">{{ t('8.special_text') }}</div>
    </div>
    <div class="space-y-[10px] mb-[30px]">
      <div class="flex items-start gap-[6px] pl-1" v-for="item of list" :key="item.value">
        <input
          :id="item.value"
          :name="item.value"
          type="checkbox"
          @change="setValues(item.value)"
          :value="item.value"
          :checked="data.communicativeAmenities.some((b) => b.specialNeeds == item.value)"
          class="h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
        />
        <label :for="item.value" class="font-medium text-gray-900">{{
          t(`8.${item.value}`)
        }}</label>
      </div>
    </div>

    <div
      class="space-y-[10px]"
      v-for="(item, index) of list?.filter((i) =>
        data.communicativeAmenities?.some((b) => b.specialNeeds == i?.value),
      )"
      :key="index"
    >
      <div class="subtitle">{{ t(`8.${item.value}_title`) }}</div>
      <div class="text">{{ t(`8.${item.value}_desc`) }}</div>
      <div class="pl-1" v-for="(v, k) of item.children" :key="`${item.value}-${v}`">
        <div class="flex items-start gap-[6px]">
          <input
            type="checkbox"
            :checked="
              data.communicativeAmenities.some(
                (b) => b.specialNeeds == item.value && item.children.some((i) => i.amenities == v),
              )
            "
            @change="setChildren(item.value, v)"
            class="h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
            :value="v"
            :id="`${item.value}-${v}`"
          />
          <label class="font-medium text-gray-900" :for="`${item.value}-${v}`">
            {{ t(`8.${item.value}_${v}_title`) }}
          </label>
        </div>
        <div
          v-if="
            data.communicativeAmenities.some(
              (b) => b.specialNeeds == item.value && b.communicative.some((i) => i.amenities == v),
            )
          "
        >
          <div class="text">
            {{ t(`8.${item.value}_${v}_text`) }}
          </div>
          <div class="relative mt-2 rounded-md shadow-sm">
            <textarea
              :id="`${item.value}-${v}-text`"
              :rows="6"
              :name="`${item.value}-${v}-text`"
              :placeholder="t('3.placeholder_text')"
              :maxlength="200"
              :data-specialNeeds="item.value"
              :data-amenities="v"
              @blur="handleBlur"
              v-model="temp[item.value][v]"
              class="block w-full rounded-2xl resize-none border-0 p-4 shadow-sm ring-1 rbg-white text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
            />
          </div>
          <div class="text-sm mt-2">
            <span class="text-main">{{ temp[item.value][v].length }}</span> / 200
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DefaultTextarea from '../layout/defaultTextarea.vue'
import { comment } from 'postcss'
const { t } = useI18n()

const data = defineModel()

const list = computed(() => {
  return [
    {
      value: 'commun',
      children: ['detailed', 'sign', 'alter', 'deaf', 'des'],
    },
    {
      value: 'mobile',
      children: ['access', 'park', 'ground', 'step', 'wider', 'adap', 'ref'],
    },
    {
      value: 'sensor',
      children: ['no', 'break', 'wait', 'quite'],
    },
  ]
})

const temp = ref({})

const setValues = (val) => {
  let index = data.value.communicativeAmenities?.findIndex((v) => v.specialNeeds == val)
  if (index == -1) {
    data.value.communicativeAmenities.push({
      specialNeeds: val,
      communicative: [],
    })
    temp.value[val] = {}

    return
  }
  data.value.communicativeAmenities.splice(index, 1)
}

const setChildren = (specialNeeds, amenities) => {
  let index = data.value.communicativeAmenities?.findIndex((v) => v.specialNeeds == specialNeeds)
  if (index == -1) {
    let communicative = amenities ? [{ amenities, comment: '' }] : []
    data.value.communicativeAmenities.push({
      specialNeeds,
      communicative,
    })
    return
  }

  let comIndex = data.value.communicativeAmenities[index].communicative.findIndex(
    (v) => v.amenities == amenities,
  )

  if (comIndex == -1) {
    data.value.communicativeAmenities[index].communicative.push({ amenities, comment: '' })

    temp.value[specialNeeds][amenities] = ''

    return
  }

  data.value.communicativeAmenities[index].communicative.splice(comIndex)
  console.log(data.value.communicativeAmenities)
}

const handleBlur = (e) => {
  console.log(e.target)
  let comment = e.target.value
  let specialNeeds = e.target.getAttribute('data-specialNeeds')
  let amenities = e.target.getAttribute('data-amenities')

  console.log(comment)
  console.log(specialNeeds)
  console.log(amenities)

  let index = data.value.communicativeAmenities?.findIndex((v) => v.specialNeeds == specialNeeds)

  let comIndex = data.value.communicativeAmenities[index].communicative.findIndex(
    (v) => v.amenities == amenities,
  )
  if (index != -1 && comIndex != -1) {
    data.value.communicativeAmenities[index].communicative[comIndex].comment = comment
  }
}
</script>
<style lang=""></style>
