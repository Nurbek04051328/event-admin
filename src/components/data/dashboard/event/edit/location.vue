<template>
  <div class="space-y-4 flex-1 flex flex-col">
    <div class="flex item gap-6">
      <div class="space-y-2 flex-1">
        <div class="font-semibold">Регион</div>
        <CustomSelect
          :options="regions"
          name="region"
          @change="handleMapCoords"
          v-model="data.region"
          option_title="title"
        />
      </div>
      <div class="space-y-2 flex-1">
        <div class="font-semibold">Адрес</div>
        <input
          v-model="data.location.address"
          class="mt-2 block w-full rounded-2xl border-[1px] pl-4 py-3 pr-10 text-gray-900 ring-0 ring-inset ring-gray-300 focus:outline-0 focus:ring-0 focus:outline-none outline-none sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    <div class="flex-1 space-y-2">
      <div class="font-semibold">Локация мероприятие</div>
      <YandexMap
        style="width: 100%; height: 600px"
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
          v-if="data.location?.coordinates?.length > 0"
          :settings="{
            coordinates: [data.location?.coordinates.at(0), data.location?.coordinates.at(1)]
          }"
          :marker-id="'1'"
          :properties="{ iconColor: 'red', glyph: 'home' }"
        />
      </YandexMap>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { mainStore } from '@/stores/data/default'
const main = mainStore()

const data = defineModel()

import { shallowRef } from 'vue'

import { storeToRefs } from 'pinia'
const { regions } = storeToRefs(main)

import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapListener
} from 'vue-yandex-maps'
import CustomSelect from './layout/customSelect.vue'

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
  console.log("initMap", map);
  
  mapInstance.value = map

  // Добавляем обработчик клика по карте
  mapInstance.value.events.add('click', (e) => {
    const coords = e.get('coords') // Получаем координаты клика
    markerCoords.value = coords // Устанавливаем координаты маркера
    hintContent.value = 'Получение адреса...'
    console.log("coords",coords);
    
    getAddress(coords) // Запрашиваем адрес
  })
}

const handleMapCoords = async () => {
  let coors = regions.value.find((r) => r._id == data.value.region)

  mapCoords.value = [coors.cordinates.long, coors.cordinates.lat]
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
  markerCoords.value = [
    data.value.location?.coordinates.at(1),
    data.value.location?.coordinates.at(0)
  ]
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
