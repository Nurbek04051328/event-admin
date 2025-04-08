<template>
  <div class="flex-1 overflow-auto pb-8">
    <div v-if="step == 0">
      <div class="title mb-[5px]">{{ t('2.title') }}</div>
      <div class="text mb-[35px]">
        {{ t('2.pick') }} <span class="text-main">1</span> {{ t('2.pick_text') }}
      </div>
      <div class="flex flex-wrap gap-4">
        <button
          v-for="cat of categories"
          :key="cat._id"
          class="py-[10px] px-4 rounded-[20px] flex gap-[10px] items-center border-2 font-nt-regular text-base"
          :class="{
            'bg-main border-main text-white':
              (!sub && data.fCategory.category == cat._id) ||
              (sub && data.sCategory.category == cat._id),
            'border-event-100':
              !sub &&
              data.fCategory.category !== cat._id &&
              data.sCategory.category !== cat._id &&
              sub
          }"
          @click="chooseCategory(cat)"
        >
          {{ cat.title }}
          <ChevronRightIcon
            class="size-4"
            :class="{
              'text-white':
                (!sub && data.fCategory.category == cat._id) ||
                (sub && data.sCategory.category == cat._id),
              'text-event-200':
                data.fCategory.category !== cat._id && data.sCategory.category !== cat._id
            }"
          />
        </button>
      </div>
    </div>
    <div v-if="step == 1">
      <div class="title mb-[5px]">{{ t('2.sub_title') }}</div>
      <div class="text mb-[35px]">
        {{ t('2.pick') }} <span class="text-main">1</span> {{ t('2.pick_text') }}
      </div>
      <div class="flex gap-2 items-center text-lg mb-4" @click="step = 0">
        {{
          sub
            ? categories.find((c) => c._id == data.sCategory?.category)?.title
            : categories.find((c) => c._id == data.fCategory?.category)?.title
        }}
        <ChevronDownIcon class="size-4" />
      </div>
      <div class="flex flex-wrap gap-4">
        <button
          v-for="cat of sub
            ? sSubcategories.filter((s) => s._id !== data.fCategory?.subcategory)
            : subcategories.filter((s) => s._id !== data.sCategory?.subcategory)"
          :key="cat._id"
          class="py-[10px] px-4 rounded-[20px] flex gap-[10px] items-center border-event-100 border-2 font-nt-regular text-base text-left"
          @click="chooseSubCategory(cat)"
          :class="{
            'bg-main border-main text-white':
              (!sub && data.fCategory.subcategory == cat._id) ||
              (sub && data.sCategory.subcategory == cat._id),
            'border-event-100': data.fCategory.subcategory !== cat._id
          }"
        >
          {{ cat.title }}
          <ChevronRightIcon class="size-4 text-event-200" />
        </button>
      </div>
    </div>

    <div v-if="step == 2">
      <div class="title mb-[5px]">{{ t('2.sub_title') }}</div>
      <div class="text mb-[35px]">
        {{ t('2.pick') }} <span class="text-main">1</span> {{ t('2.pick_text') }}
      </div>
      <div class="flex items-center gap-4">
        <div class="flex gap-2 items-center text-lg mb-4" @click="step = 0">
          {{ categories.find((c) => c._id == data.fCategory?.category)?.title }}
          <ChevronRightIcon class="size-4" />
        </div>
        <div class="flex gap-2 items-center text-lg mb-4" @click="step = 1">
          {{ subcategories.find((c) => c._id == data.fCategory?.subcategory)?.title }}
          <ChevronDownIcon class="size-4" />
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        <button
          v-for="cat of sub
            ? sChildcategories.filter((s) => s._id !== data.fCategory.x2Subcategory)
            : childcategories.filter((s) => s._id !== data.sCategory.x2Subcategory)"
          :key="cat._id"
          class="py-[10px] px-4 rounded-[20px] flex gap-[10px] items-center border-event-100 border-2 font-nt-regular text-base"
          @click="chooseChildCategory(cat)"
          :class="{
            'bg-main text-white border-main':
              cat._id == data.fCategory.x2Subcategory || cat._id == data.sCategory.x2Subcategory,
            'border-event-100': cat._id !== data.fCategory.x2Subcategory
          }"
        >
          <div
            v-if="cat._id !== data.fCategory.x2Subcategory"
            class="w-3 h-3 rounded-full ring-[1.5px] ring-event-100"
          ></div>
          <CheckCircleIcon v-else class="size-4 text-white" />
          {{ cat.title }}
        </button>
      </div>
    </div>

    <div v-if="step == 3">
      <div class="title mb-[5px]">{{ t('2.title') }}</div>
      <div class="text mb-[35px]">
        {{ t('2.desc') }}
      </div>

      <div class="space-y-4">
        <div
          class="flex justify-between items-center gap-4 mt-20 mb-2 border-b-[1px] border-gray-100 pb-4"
          @click="((step = 0), (sub = false))"
        >
          <div>
            <div class="text-[26px] font-nt-bold text-main break-words leading-6 mb-2">
              {{
                childcategories.find((ch) => data.fCategory.x2Subcategory == ch._id)?.title ||
                subcategories.find((s) => s._id == data.fCategory.subcategory)?.title
              }}
            </div>
            <div class="flex gap-2 items-center text-event-500">
              {{ categories.find((c) => c._id == data.fCategory.category)?.title }}
              <ChevronRightIcon class="size-4" />
              {{
                data.fCategory.x2Subcategory
                  ? subcategories.find((s) => s._id == data.fCategory.subcategory)?.title
                  : ''
              }}
            </div>
          </div>
          <ChevronRightIcon class="size-6 text-gray-500" />
        </div>

        <div
          v-if="data.sCategory?.category && data.sCategory.subcategory"
          class="flex justify-between items-center gap-4 mt-20 mb-2 border-b-[1px] border-gray-100 pb-4"
          @click="((step = 0), (sub = true))"
        >
          <div>
            <div class="text-[26px] font-nt-bold text-main break-words leading-6 mb-2">
              {{
                sChildcategories.find((ch) => data.sCategory.x2Subcategory == ch._id)?.title ||
                sSubcategories.find((s) => s._id == data.sCategory.subcategory)?.title
              }}
            </div>
            <div class="flex gap-2 items-center text-event-500">
              {{ categories.find((c) => c._id == data.sCategory.category)?.title }}
              <ChevronRightIcon class="size-4" />
              {{
                data.fCategory.x2Subcategory
                  ? sSubcategories.find((s) => s._id == data.sCategory.subcategory)?.title
                  : ''
              }}
            </div>
          </div>
          <ChevronRightIcon class="size-6 text-gray-500" />
        </div>

        <button v-else class="text-third mt-[10px]" @click="addScategory">
          + <span class="underline underline-offset-2">{{ t('2.add') }}</span>
        </button>
      </div>
    </div>
  </div>
  <button
    class="mt-auto btn"
    v-if="
      data.fCategory.category &&
      data.fCategory.subcategory &&
      data.fCategory.x2Subcategory &&
      step == 2
    "
    @click="step = 3"
  >
    {{ t('continue') }}
    <ChevronRightIcon class="size-5" />
  </button>
  <button class="mt-auto btn" v-if="step == 3" @click="nextPage">
    {{ t('2.continue') }}
    <ChevronRightIcon class="size-5" />
  </button>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/helpers/api'
import { useI18n } from 'vue-i18n'
import { CheckCircleIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
const { t } = useI18n()

const data = defineModel()

import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}

const categories = ref([])
const subcategories = ref([])
const sSubcategories = ref([])
const childcategories = ref([])
const sChildcategories = ref([])
const step = ref(0)

const sub = ref(false)

const chooseCategory = (cat) => {
  console.log(cat)
  if (sub.value) {
    data.value.sCategory.category = cat._id
    sSubcategories.value = [...cat.subcategories]
  } else {
    data.value.fCategory.category = cat._id
    subcategories.value = [...cat.subcategories]
  }
  step.value = 1
}

const chooseSubCategory = (cat) => {
  console.log(cat)
  if (sub.value) {
    data.value.sCategory.subcategory = cat._id
    data.value.sCategory.x2Subcategory = ''
    if (cat.x2Subcategories?.length > 0) {
      sChildcategories.value = [...cat.x2Subcategories]
      step.value = 2
      return
    }
  } else {
    data.value.fCategory.subcategory = cat._id
    data.value.fCategory.x2Subcategory = ''
    if (cat.x2Subcategories?.length > 0) {
      childcategories.value = [...cat.x2Subcategories]
      step.value = 2
      return
    }
  }

  step.value = 3
}

const chooseChildCategory = (cat) => {
  console.log(cat)
  if (sub.value) {
    console.log(sub.value)
    data.value.sCategory.x2Subcategory = cat._id
    step.value = 3
  } else {
    console.log(sub.value)
    data.value.fCategory.x2Subcategory = cat._id
  }
}

const addScategory = () => {
  sub.value = true
  step.value = 0
}

const getCategories = async () => {
  const res = await api.get('api/default/all-category-info', {
    params: {
      limit: 0
    }
  })
  console.log(res.data)
  categories.value = [...res.data]
  if (
    (data.value.fCategory.category && data.value.fCategory?.subcategory) ||
    data.value.fCategory?.x2Subcategory
  ) {
    subcategories.value = categories.value.find(
      (c) => c._id == data.value.fCategory.category
    )?.subcategories
    childcategories.value =
      subcategories.value.find((c) => c._id == data.value.fCategory?.subcategory)
        ?.x2Subcategories || []
    step.value = 3
  }
}

onMounted(() => {
  getCategories()
})
</script>
<style lang=""></style>
