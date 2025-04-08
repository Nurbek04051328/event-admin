<template>
  <div class="flex-1 overflow-auto space-y-[20px] relative pb-8">
    <div class="px-4">
      <div class="title mb-[5px]">{{ t('5.title') }}</div>
      <div class="text mb-[15px]">
        {{ t('5.text') }}
      </div>
    </div>
    <!-- <YandexMap
      style="width: 100%; height: 100vh"
      @map-was-initialized="initMap"
      :settings="{
        location: {
          center: mapCoords,
          zoom: 13
        }
      }"
    >
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />
      <yandex-map-listener :settings="{ onClick: logMapClick }" />

      <YandexMapDefaultMarker
        v-if="markerCoords"
        :settings="{ coordinates: markerCoords }"
        :marker-id="'1'"
        :properties="{ iconColor: 'red', glyph: 'home' }"
      />
    </YandexMap> -->
    <!-- <yandex-map
      v-model="map"
      :settings="{
        location: {
          center: [37.617644, 55.755819],
          zoom: 9,
        },
      }"
      width="100%"
      height="500px"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-default-marker :settings="{ coordinates: [37.617644, 55.755819] }" />
    </yandex-map> -->

    <div
      :class="`absolute duration-300 ease-in ${hintContent?.length > 0 ? 'bottom-4' : '-bottom-44'} bg-main p-4 rounded-2xl mx-auto left-0 right-0 w-11/12 text-white`"
    >
      {{ hintContent }}
    </div>
  </div>

  <div class="p-4 w-full">
    <button
      :class="[statusBtn ? 'btn' : 'btn-disabled', 'mt-auto w-full']"
      @click="statusBtn ? nextPage() : false"
    >
      {{ t('continue') }}
      <ChevronRightIcon class="size-5" />
    </button>
  </div>
</template>
<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const statusBtn = computed(() => {
  return data.value.location.coordinates && data.value.location.address
})

const { t } = useI18n()

import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}

const data = defineModel()

import { shallowRef } from 'vue'

import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapListener
} from 'vue-yandex-maps'

const logMapClick = async (object, event) => {
  try {
    console.log(object, event)
    const { coordinates } = event
    markerCoords.value = [coordinates[0], coordinates[1]]
    console.log(event.coordinates)
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=e8c6c0be-268b-40de-85e7-3a4eb031b22d&geocode=${event.coordinates[0]},${event.coordinates[1]}&format=json`
    )
    const d = await response.json()
    const address =
      d.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData
        .text
    hintContent.value = address // Обновляем подсказку с адресом
    data.value.location = {
      coordinates: [coordinates[0], coordinates[1]],
      address: address.slice()
    }
    console.log(address)
  } catch (error) {
    console.error('Ошибка при получении адреса:', error)
    hintContent.value = 'Ошибка получения адреса'
  }
}

// Реактивные переменные
const map = shallowRef(null)
const mapCoords = ref([69.271814, 41.310933]) // Начальный центр карты
const markerCoords = ref(null) // Координаты маркера (изначально null)
const hintContent = ref('')
const mapInstance = ref(null)

// Инициализация карты
const initMap = (map) => {
  mapInstance.value = map

  // Добавляем обработчик клика по карте
  mapInstance.value.events.add('click', (e) => {
    const coords = e.get('coords') // Получаем координаты клика
    markerCoords.value = coords // Устанавливаем координаты маркера
    hintContent.value = 'Получение адреса...'
    getAddress(coords) // Запрашиваем адрес
  })
}

// Получение адреса по координатам
const getAddress = async (coords) => {
  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=ваш_api_ключ&geocode=${coords[1]},${coords[0]}&format=json`
    )
    const data = await response.json()
    const address =
      data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData
        .text
    hintContent.value = address // Обновляем подсказку с адресом
    console.log(address)
  } catch (error) {
    console.error('Ошибка при получении адреса:', error)
    hintContent.value = 'Ошибка получения адреса'
  }
}

onMounted(async () => {
  console.log(data.value.region)
  let res = await main.getRegions()
  let coors = res.find((r) => r._id == data.value.region)
  console.log(coors, res)
  mapCoords.value = [coors.cordinates.long, coors.cordinates.lat]
})
</script>
<style>
.ymap-container {
  width: 100%;
  flex: 1;
  touch-action: pan-x pan-y; /* Поддержка жестов на сенсорных экранах */
}
</style>
