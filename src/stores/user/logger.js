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
    console.log(params)
    const { data } = await api.get(`${base_url}/user-logger`, { params })
    console.log(data)
    logger.data = [...(data?.userLoggers || [])]
    logger.count = data?.count

    console.log(logger)
  }

  /// Route logs
  const getrouteLoggers = async (params) => {
    console.log(params)
    const { data } = await api.get(`${base_url}/logs`, { params })
    console.log("lllll",data)
    routeLoggers.data = [...(data?.logs || [])]
    routeLoggers.count = data?.count

    console.log(logger)
  }

  const eventLogger = async (params) => {
    console.log(params)
    const { data } = await api.get(`${base_url}/messages`, { params })
    console.log("eventLogger",data)
    eventLoggers.data = [...(data?.messageLoggers || [])]
    eventLoggers.count = data?.count

    console.log(logger)
  }
  const eventworker = async (params) => {
    console.log(params)
    const { data } = await api.get(`${base_url}/messages`, { params })
    console.log("workerLoggers",data)
    workerLoggers.data = [...(data?.messageLoggers || [])]
    workerLoggers.count = data?.count

    console.log(logger)
  }

  const ticketLogger = async (params) => {
    console.log(params)
    logger.data = []
    const { data } = await api.get(`${base_url}/tickets`, { params })
    console.log(data)
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
