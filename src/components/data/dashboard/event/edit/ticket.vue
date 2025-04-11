<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="font-semibold">Будет ли группа?</div>
          <div class="flex gap-6">
            <input
              type="radio"
              name="includeGroup"
              v-model="data.includeGroup"
              :value="true"
              class="hidden"
              id="yes"
            />
            <label class="flex gap-[10px] cursor-pointer items-center" for="yes">
              <div
                :class="{
                  checked: data.includeGroup,
                  unchecked: !data.includeGroup
                }"
              ></div>
              <div>Да</div>
            </label>
            <input
              type="radio"
              name="includeGroup"
              v-model="data.includeGroup"
              :value="false"
              class="hidden"
              id="no"
            />
            <label class="flex gap-[10px] cursor-pointer items-center" for="no">
              <div
                :class="{
                  checked: !data.includeGroup,
                  unchecked: data.includeGroup
                }"
              ></div>
              <div>Нет</div>
            </label>
          </div>
        </div>
        <div class="space-y-2" v-if="!data.includeGroup">
          <div class="font-semibold">Количество билетов</div>
          <div class="input-box pr-[26px]">
            <input type="number" v-model="data.quantity" class="input-inbox flex-1" />
            <TicketIcon class="size-6" />
          </div>
        </div>
        <div v-else>
          <div>
            <div class="font-semibold">Максимальный размер группы</div>
          </div>
          <div class="space-y-2">
            <div class="font-semibold">Открытые группы</div>
            <customSelect
              v-model="data.size.open"
              :options="
                [...Array(30)].map((a, v) => {
                  return {
                    _id: v + 1,
                    title: v + 1
                  }
                })
              "
              option_title="title"
              name="opengroup"
            />
          </div>
          <div class="space-y-2">
            <div class="font-semibold">Закрытые группы</div>

            <CustomSelect
              v-model="data.size.closed"
              :options="
                [...Array(30)].map((a, v) => {
                  return {
                    _id: v + 1,
                    title: v + 1
                  }
                })
              "
              option_title="title"
              name="closedgroup"
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { TicketIcon } from '@heroicons/vue/24/outline'
import CustomSelect from './layout/customSelect.vue'

const data = defineModel()
</script>
<style lang=""></style>
