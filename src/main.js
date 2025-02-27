import '@/assets/styles/app.scss'
import { createApp } from 'vue'


import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'
import i18n from './i18n/i18n'

import App from './App.vue'
import router from './router'

import headPart from '@/components/default/headPart.vue'
import defaultModal from '@/components/default/defaultModal.vue'
import defaultInput from '@/components/default/defaultInput.vue'
import defaultTextarea from '@/components/default/defaultTextarea.vue'
import defaultSelect from '@/components/default/defaultSelect.vue'
import filterSelect from '@/components/default/filterSelect.vue'
import filterArraySelect from '@/components/default/filterArraySelect.vue'
import dublicatSelect from './components/default/dublicatSelect.vue'
import defaultCheckbox from '@/components/default/defaultCheckbox.vue'
import dialogAgree from '@/components/default/dialogAgree.vue'
import phoneMaska from '@/components/default/phoneMaska.vue'

import VueApexCharts from 'vue3-apexcharts'






const app = createApp(App)

app.component('dialogAgree', dialogAgree)
app.component('headPart', headPart)
app.component('defaultModal', defaultModal)
app.component('defaultInput', defaultInput)
app.component('defaultTextarea', defaultTextarea)
app.component('defaultSelect', defaultSelect)
app.component('filterSelect', filterSelect)
app.component('arraySelect', filterArraySelect)
app.component('dublicatSelect', dublicatSelect)
app.component('defaultCheckbox', defaultCheckbox)
app.component('phoneMaska', phoneMaska)

app.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

app.use(VueApexCharts)





app.use(i18n)
app.use(VueCookies, { expires: '7d' })
app.use(createPinia())
app.use(router)

app.mount('#app')
