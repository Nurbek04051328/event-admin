<template>
  <div
    :class="`box flex text-[${textColor || '#360B64'}] rounded-[26px] p-6 cursor-pointer shadow-sm bg-white/100 hover:shadow text-base gap-6  items-center xs-max:w-full ${bg || 'bg-white'}  `"
  >
    <div class="w-[52px] h-[52px] rounded-full  flex items-center justify-center" :class="`${bgIconColor? bgIconColor : 'bg-[#F3EBFC]'}`">
      <component :is="icon" class="h-9 w-9" aria-hidden="true" :class="`${iconColor? iconColor : 'text-[#9E55EC]'}`" />
    </div>
    <div class="flex flex-col">
      <div 
        class="text-[16px] font-bold lg:text-[13px] lg:break-words lg:max-w-24 md-max:max-w-full"
        :class="`${textColor? textColor : 'text-[#B6A3D0]'}`"
      >
        {{ title }}
      </div>
      <div class="text-[25px] font-bold text-[#483D5B] mt-[8px]" >{{ value || 0}}</div>
    </div>
  </div>
</template>
<script setup>
  defineProps(['title', 'value', 'icon', 'bg', 'textColor', 'iconColor', 'bgIconColor'])
  // defineProps({
  //   title: {
  //     type: String
  //   },
  //   value: {
  //     type: String
  //   },
  //   icon: {
  //     type: String
  //   },
  //   bg: {
  //     type: String
  //   },
  //   textColor: {
  //     type: String
  //   },
  //   hoverBg: {
  //     type: String
  //   },
  //   hoverText: {
  //     type: String
  //   },
  // })
</script>

