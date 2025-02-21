import { defineStore } from 'pinia'
import api from '@/helpers/api'
import { reactive } from 'vue'

const base_url = '/logger'
export const loggerStore = defineStore('loggerStore', () => {
  const logger = reactive({
    data: [],
    count: 0
  })
  const eventLoggers = reactive({
    data: [],
    count: 0
  })
  const workerLoggers = reactive({
    data: [],
    count: 0
  })
  const routeLoggers = reactive({
    data: [],
    count: 0
  })

  //   const usefull = useFullStore()
  //   const notification = useNotification()

  const userLogger = async (params) => {
    const { data } = await api.get(`${base_url}/user-logger`, { params })
    logger.data = [...(data?.userLoggers || [])]
    logger.count = data?.count
    
  }

  /// Route logs
  const getrouteLoggers = async (params) => {
    const { data } = await api.get(`${base_url}/logs`, { params })
    routeLoggers.data = [...(data?.logs || [])]
    routeLoggers.count = data?.count
  }

  const eventLogger = async (params) => {
    const { data } = await api.get(`${base_url}/messages`, { params })
    eventLoggers.data = [...(data?.messageLoggers || [])]
    eventLoggers.count = data?.count
  }
  const eventworker = async (params) => {
    const { data } = await api.get(`${base_url}/messages`, { params })
    workerLoggers.data = [...(data?.messageLoggers || [])]
    workerLoggers.count = data?.count
  }

  const ticketLogger = async (params) => {
    logger.data = []
    const { data } = await api.get(`${base_url}/tickets`, { params })
    logger.data = [...(data?.tickets || [])]
    logger.count = data?.count
  }

  const globalSearch = async (search) => {
    const {data} = await api.get('/route/global-search',{
      params: {
        search
      }
    })
    return data
  }

  return {
    logger,
    globalSearch,
    routeLoggers,
    getrouteLoggers,
    ticketLogger,
    userLogger,
    eventLogger,
    eventLoggers,
    eventworker,
    workerLoggers
  }
})
