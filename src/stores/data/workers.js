import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/employee'
import { useFullStore } from '@/stores/usefull/modal'

export const workerStore = defineStore('workerStore', () => {
  const usefull = useFullStore()
  const workers = ref([])
  const workersCount = ref(0)
  const notification = useNotification()

  const getWorkers = async (params) => {
    console.log("params", params);
    
    const { data } = await api.get(base_url, {params})
    console.log('data', data)
    workers.value = data?.employees
    workersCount.value = data?.count
  }

  const addWorker = async (worker, t) => {
    try {
      const res = await api.post(base_url, worker)
      if (res.status == 201) {
        workers.value = [res.data, ...workers.value]
        workersCount.value += 1
        notification.setNotif(true, t('story.add'), 'success')
        usefull.setToggle(false, 0)
      }
    } catch (e) {
      notification.setNotif(true, e.response.data?.message, 'danger')
    }
  }

  const removeWorker = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    workers.value = workers.value.filter((item) => item._id !== id)
    workersCount.value > 0 ? (workersCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveWorker = async (worker, t) => {
    try {
      const { data } = await api.put(`${base_url}`, worker)
      workers.value = workers.value.map((pay) => {
        if (pay._id == data._id) return data
        return pay
      })
      notification.setNotif(true, t('story.update'), 'info')
      usefull.setToggle(false, 0)
    } catch (e) {
      notification.setNotif(true, e.response.data?.message, 'danger')
    }
  }

  const getWorker = async (id) => {
    return await api.get(`${base_url}/${id}`)
  }
  const getInfoWorker = async (id) => {
    return await api.get(`${base_url}/info/${id}`)
  }
  const changeStatusWorker = async ({id, status}) => {
    return await api.get(`${base_url}/status/${id}/${status}`)
  }

  return {
    workers,
    workersCount,
    getWorkers,
    addWorker,
    removeWorker,
    saveWorker,
    getWorker,
    getInfoWorker,
    changeStatusWorker
  }
})
