<template>
  <div class="space-y-[20px]">
    <div class="space-y-4">
      <div class="font-semibold">
        Подходит ли мероприятие для людей с особыми потребностями? (опционально)
      </div>
    </div>
    <div class="space-y-4 mb-[30px]">
      <div class="space-y-4 pl-1" v-for="(item, index) of list" :key="item.value">
        <div>
          <input
            :id="item.value"
            :name="item.value"
            type="checkbox"
            @change="setValues(item.value)"
            :value="item.value"
            :checked="data.communicativeAmenities.some((b) => b.specialNeeds == item.value)"
            class="h-4 hidden w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
          />
          <label
            :for="item.value"
            class="font-medium text-gray-900"
            :class="[
              'font-normal text-gray-900 border-2 rounded-md px-3 py-1 cursor-pointer',
              data.communicativeAmenities.some((b) => b.specialNeeds == item.value)
                ? 'border-main bg-main text-white'
                : 'border-gray-200'
            ]"
            >{{ settingsTitles[`${item.value}`] }}</label
          >
        </div>
        <div
          class="space-y-[10px] border-[1px] border-gray-300 p-4"
          v-if="data.communicativeAmenities.some((c) => c.specialNeeds == item.value)"
          :key="index"
        >
          <div class="pl-1" v-for="(v, k) of item.children" :key="`${item.value}-${v}`">
            <div class="flex items-start gap-[6px]">
              <input
                type="checkbox"
                :checked="
                  data.communicativeAmenities
                    .find((b) => b.specialNeeds == item.value)
                    ?.communicative?.some((b) => b.amenities == v)
                "
                @change="setChildren(item.value, v)"
                class="h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
                :value="v"
                :id="`${item.value}-${v}`"
              />
              <label class="font-medium text-gray-900" :for="`${item.value}-${v}`">
                {{ settingsTitles[`${item.value}_${v}_title`] }}
              </label>
            </div>
            <div
              v-if="
                data.communicativeAmenities
                  .find((b) => b.specialNeeds == item.value)
                  ?.communicative?.some((b) => b.amenities == v)
              "
            >
              <div class="text">
                {{ settingsTitles[`${item.value}_${v}_text`] }}
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
                  :value="
                    data.communicativeAmenities
                      .find((b) => b.specialNeeds == item.value)
                      ?.communicative?.find((b) => b.amenities == v)?.comment
                  "
                  @blur="handleBlur"
                  class="block w-full rounded-2xl resize-none border-0 p-4 shadow-sm ring-1 rbg-white text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-[10px]">
      <div class="subtitle">{{ settingsTitles['activity_title'] }}</div>

      <div class="grid grid-cols-4 gap-2">
        <button
          class="transition-all py-[10px] rounded-[20px] items-center border-2 font-nt-regular text-sm"
          v-for="skill of activity"
          :key="skill"
          @click="data.activity = skill"
          :class="{
            'bg-main text-white': data.activity === skill,
            'border-event-100': data.activity != skill
          }"
        >
          {{ settingsTitles[`${skill}`] }}
        </button>
      </div>
    </div>
    <div class="space-y-[10px]">
      <div class="subtitle">{{ settingsTitles['skill_title'] }}</div>

      <div class="grid grid-cols-4 gap-2">
        <button
          class="transition-all py-[10px] rounded-[20px] items-center border-2 font-nt-regular text-sm"
          v-for="skill of skills"
          :key="skill"
          @click="data.skill = skill"
          :class="{
            'bg-main text-white': data.skill === skill,
            'border-event-100': data.skill != skill
          }"
        >
          {{ settingsTitles[`${skill}`] }}
        </button>
      </div>
    </div>
    <div class="space-y-[10px]">
      <div class="subtitle">{{ settingsTitles['add_title'] }}</div>
      <defaultTextarea
        v-model="data.additionalRequirements"
        :placeholder="settingsTitles['add_placeholder']"
        :rows="5"
        name="additionalRequirements"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { settingsTitles } from '@/helpers/vars'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const data = defineModel()

const list = computed(() => {
  return [
    {
      value: 'commun',
      children: ['detailed', 'sign', 'alter', 'deaf', 'des']
    },
    {
      value: 'mobile',
      children: ['access', 'park', 'ground', 'step', 'wider', 'adap', 'ref']
    },
    {
      value: 'sensor',
      children: ['no', 'break', 'wait', 'quite']
    }
  ]
})

const activity = ['easy', 'moderate', 'high', 'extreme']
const skills = ['initial', 'medium', 'advanced', 'expert']

const setValues = (val) => {
  let index = data.value.communicativeAmenities?.findIndex((v) => v.specialNeeds == val)
  if (index == -1) {
    data.value.communicativeAmenities.push({
      specialNeeds: val,
      communicative: []
    })

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
      communicative
    })
    return
  }

  let comIndex = data.value.communicativeAmenities[index].communicative.findIndex(
    (v) => v.amenities == amenities
  )

  if (comIndex == -1) {
    data.value.communicativeAmenities[index].communicative.push({ amenities, comment: '' })
    return
  }
  console.log('last')
  data.value.communicativeAmenities[index].communicative.splice(comIndex, 1)
  console.log(data.value.communicativeAmenities)
}

const handleBlur = (e) => {
  let comment = e.target.value
  let specialNeeds = e.target.getAttribute('data-specialNeeds')
  let amenities = e.target.getAttribute('data-amenities')

  let index = data.value.communicativeAmenities?.findIndex((v) => v.specialNeeds == specialNeeds)

  let comIndex = data.value.communicativeAmenities[index].communicative.findIndex(
    (v) => v.amenities == amenities
  )
  if (index != -1 && comIndex != -1) {
    data.value.communicativeAmenities[index].communicative[comIndex].comment = comment
  }
}
</script>
<style lang=""></style>
