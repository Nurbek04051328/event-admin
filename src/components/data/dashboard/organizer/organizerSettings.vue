<template>
  <div
    class="group/text relative ring-1 ring-gray-200 size-7 flex items-center justify-center rounded-full"
    :class="{
      'bg-[#9E55EC] ring-[#9E55EC]': item?.privateSettings.allowPhotoSharing
    }"
  >
    <div
      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
    >
      Разрешение на обмен фотографиями
    </div>
    <CameraIcon
      class="size-4 xm-max:size-3"
      :class="{
        'text-white': item?.privateSettings.allowPhotoSharing,
        'text-[#9E55EC] ring-[#9E55EC]': !item?.privateSettings.allowPhotoSharing
      }"
    />
  </div>
  <div
    class="group/text relative ring-1 ring-gray-200 size-7 flex items-center justify-center rounded-full"
    :class="{
      'bg-[#9E55EC] ring-[#9E55EC]': item?.privateSettings.showParticipants
    }"
  >
    <div
      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
    >
      Видимость списка участников
    </div>
    <UsersIcon
      class="size-4 xm-max:size-3"
      :class="{
        'text-white': item?.privateSettings.showParticipants,
        'text-[#9E55EC] ring-[#9E55EC]': !item?.privateSettings.showParticipants
      }"
    />
  </div>
  <div
    class="group/text relative ring-1 ring-gray-200 size-7 flex items-center justify-center rounded-full"
    :class="{
      'bg-[#9E55EC] ring-[#9E55EC]': item?.privateSettings.locationVisibility
    }"
  >
    <div
      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
    >
      Видимость местоположения мероприятия
    </div>
    <MapPinIcon
      class="size-4 xm-max:size-3"
      :class="{
        'text-white': item?.privateSettings.locationVisibility,
        'text-[#9E55EC] ring-[#9E55EC]': !item?.privateSettings.locationVisibility
      }"
    />
  </div>
  <div
    class="group/text relative ring-1 ring-gray-200 size-7 flex items-center justify-center rounded-full"
    :class="{
      'bg-[#9E55EC] ring-[#9E55EC]': item?.interactionOptions.adult
    }"
  >
    <div
      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
    >
      Возрастное ограничение
    </div>
    <ExclamationTriangleIcon
      class="size-4 xm-max:size-3"
      :class="{
        'text-white': item?.interactionOptions.adult,
        'text-[#9E55EC] ring-[#9E55EC]': !item?.interactionOptions.adult
      }"
    />
  </div>
  <div
    class="group/text relative ring-1 ring-gray-200 size-7 flex items-center justify-center rounded-full"
    :class="{
      'bg-[#9E55EC] ring-[#9E55EC]': item?.interactionOptions.allowShare
    }"
  >
    <div
      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
    >
      Разрешение делиться мероприятием
    </div>
    <ShareIcon
      class="size-4 xm-max:size-3"
      :class="{
        'text-white': item?.interactionOptions.allowShare,
        'text-[#9E55EC] ring-[#9E55EC]': !item?.interactionOptions.allowShare
      }"
    />
  </div>
  <div
    class="group/text relative ring-1 ring-gray-200 size-7 flex items-center justify-center rounded-full"
    :class="{
      'bg-[#9E55EC] ring-[#9E55EC]': item?.interactionOptions.allowSave
    }"
  >
    <div
      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
    >
      Разрешение сохранять мероприятие
    </div>
    <BookmarkIcon
      class="size-4 xm-max:size-3"
      :class="{
        'text-white': item?.interactionOptions.allowSave,
        'text-[#9E55EC] ring-[#9E55EC]': !item?.interactionOptions.allowSave
      }"
    />
  </div>
</template>
<script setup>
defineProps(['item'])
import {
  BookmarkIcon,
  CameraIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  ShareIcon,
  UsersIcon
} from '@heroicons/vue/20/solid'
</script>
<style lang=""></style>
