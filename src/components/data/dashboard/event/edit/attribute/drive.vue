<template>
  <div class="space-y-2">
    <div class="subtitle">{{ t('6.following_title') }}</div>
    <div class="text">{{ t('6.following_text') }}</div>
    <div class="flex gap-4 flex-wrap">
      <div class="flex items-start gap-[6px] pl-1" v-for="item of listOptions" :key="item.value">
        <input
          :id="item.value"
          :name="`option-${item.value}`"
          type="checkbox"
          :value="item.value"
          @change="setValues(item.value)"
          :checked="data.provide.some((b) => b.eventTransport == item.value)"
          class="hidden h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
        />
        <label
          :for="item.value"
          :class="[
            'font-normal text-gray-900 border-2 rounded-md px-3 py-1 cursor-pointer',
            data.provide.some((b) => b.eventTransport == item.value)
              ? 'border-main bg-main text-white'
              : 'border-gray-200'
          ]"
          >{{ item.title }}</label
        >
      </div>
    </div>
  </div>

  <div v-for="obj of listOptions.filter((t) => t.question)" :key="`who-${obj.value}`">
    <div class="space-y-2" v-if="data.provide.some((b) => b.eventTransport == obj.value)">
      <div class="subtitle">{{ obj.question }}</div>
      <div class="flex gap-4 flex-wrap">
        <div
          class="flex items-start gap-[6px] pl-1"
          v-for="item of whoWill"
          :key="`driving-${item.value}`"
        >
          <input
            :id="`${obj.value}-${item.value}`"
            :name="obj.value"
            type="checkbox"
            :value="item.value"
            @change="setWho"
            :checked="
              data.provide.some(
                (b) => b.eventTransport == obj.value && b.whoWillDrive?.includes(item.value)
              )
            "
            class="hidden h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
          />
          <label
            :for="`${obj.value}-${item.value}`"
            :class="[
              'font-normal text-gray-900 border-2 rounded-md px-3 py-1 cursor-pointer',
              data.provide.some(
                (b) => b.eventTransport == obj.value && b.whoWillDrive?.includes(item.value)
              )
                ? 'border-main bg-main text-white'
                : 'border-gray-200'
            ]"
            >{{ item.title }}</label
          >
        </div>
      </div>
    </div>
  </div>

  <div
    class="space-y-2"
    v-if="data.provide.some((b) => b.eventTransport == 'boat' && b.whoWillDrive?.length > 0)"
  >
    <div class="subtitle">{{ t('6.boat_question') }}</div>
    <div
      class="flex items-start gap-[6px] pl-1"
      v-for="item of boatType"
      :key="`boat-${item.value}`"
    >
      <input
        type="radio"
        name="boattype"
        @change="setBoat('boatType', item.value)"
        :checked="data.provide.some((b) => b.eventTransport == 'boat' && b.boatType == item.value)"
        :value="item.value"
        class="hidden"
        :id="item.value"
      />
      <label class="flex gap-[10px] items-center" :for="item.value">
        <div
          :class="{
            checked: data.provide.some(
              (b) => b.eventTransport == 'boat' && b.boatType == item.value
            ),
            unchecked: !data.provide.some(
              (b) => b.eventTransport == 'boat' && b.boatType == item.value
            )
          }"
        ></div>
        <div>
          {{ item.title }}
        </div>
      </label>
    </div>
  </div>
  <div
    class="space-y-2"
    v-if="data.provide.some((b) => b.eventTransport == 'boat' && b.whoWillDrive?.length > 0)"
  >
    <div class="subtitle">{{ t('6.boat_size') }}</div>
    <div
      class="flex items-start gap-[6px] pl-1"
      v-for="item of boatSize"
      :key="`boatsize-${item.value}`"
    >
      <input
        type="radio"
        name="boatSize"
        @change="setBoat('boatSize', item.value)"
        :checked="data.provide.some((b) => b.eventTransport == 'boat' && b.boatSize == item.value)"
        :value="item.value"
        class="hidden"
        :id="item.value"
      />
      <label class="flex gap-[10px] items-center" :for="item.value">
        <div
          :class="{
            checked: data.provide.some(
              (b) => b.eventTransport == 'boat' && b.boatSize == item.value
            ),
            unchecked: !data.provide.some(
              (b) => b.eventTransport == 'boat' && b.boatSize == item.value
            )
          }"
        ></div>
        <div>
          {{ item.title }}
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const data = defineModel()

const listOptions = computed(() => {
  return [
    {
      title: t('6.driving'),
      value: 'driving',
      question: t('6.driving_question')
    },
    {
      title: t('6.boat'),
      value: 'boat',
      question: t('6.boat_question')
    },
    {
      title: t('6.motorcycle'),
      value: 'motorcycle',
      question: t('6.motorcycle_question')
    },
    {
      title: t('6.flight'),
      value: 'flight',
      question: t('6.flight_question')
    },
    {
      title: t('6.none'),
      value: 'none'
    }
  ]
})

const boatType = computed(() => {
  return [
    {
      title: t('6.boat_motor'),
      value: 'motor'
    },
    {
      title: t('6.boat_sail'),
      value: 'sail'
    },
    {
      title: t('6.boat_canoe'),
      value: 'canoe'
    }
  ]
})

const boatSize = computed(() => {
  return [
    {
      title: t('6.boat_UpTo10'),
      value: 'UpTo10'
    },
    {
      title: t('6.boat_1022'),
      value: '10-22'
    }
  ]
})

const setBoat = (type, val) => {
  let index = data.value.provide?.findIndex((v) => v.eventTransport == 'boat')
  if (index == -1) return false

  data.value.provide[index][type] = val
  console.log(type, val)
}

const whoWill = computed(() => {
  return [
    {
      title: t('6.myself'),
      value: 'myself'
    },
    {
      title: t('6.another'),
      value: 'another'
    },
    {
      title: t('6.forguests'),
      value: 'forguests'
    },
    {
      title: t('6.public'),
      value: 'public'
    }
  ]
})

const setValues = (val) => {
  let index = data.value.provide?.findIndex((v) => v.eventTransport == val)
  if (index == -1) {
    data.value.provide.push({
      eventTransport: val,
      whoWillDrive: [],
      boatType: val == 'boat' ? 'motor' : '',
      boatSize: val == 'boat' ? 'UpTo10' : ''
    })
    return
  }

  data.value.provide.splice(index, 1)

  console.log(data.value.provide)
}

const setWho = (e) => {
  let index = data.value.provide?.findIndex((v) => v.eventTransport == e.target.name)
  if (index == -1) {
    data.value.provide.push({
      eventTransport: e.target.name,
      whoWillDrive: [e.target.value],
      boatType: '',
      boatSize: ''
    })
    return
  }

  if (data.value.provide[index].whoWillDrive?.includes(e.target.value)) {
    data.value.provide[index].whoWillDrive = data.value.provide[index].whoWillDrive.filter(
      (b) => b != e.target.value
    )
    if (data.value.provide[index]?.whoWillDrive?.length == 0) {
      data.value.provide.splice(index, 1)
    }
    return
  }
  data.value.provide[index].whoWillDrive.push(e.target.value)

  console.log(data.value.provide)
}
</script>

<style lang="scss" scoped></style>
