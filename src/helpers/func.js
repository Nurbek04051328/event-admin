import axios from 'axios'
import api from './api'

const months = [
  { value: 0, name: 'Январь' },
  { value: 1, name: 'Февраль' },
  { value: 2, name: 'Март' },
  { value: 3, name: 'Апрель' },
  { value: 4, name: 'Май' },
  { value: 5, name: 'Июнь' },
  { value: 6, name: 'Июль' },
  { value: 7, name: 'Август' },
  { value: 8, name: 'Сентябрь' },
  { value: 9, name: 'Октябрь' },
  { value: 10, name: 'Ноябрь' },
  { value: 11, name: 'Декабрь' }
];

const langs = ['tr', 'uz', 'ru']

const addZero = (v) => (v < 10 ? `0${v}` : `${v}`)

const convertDate = (value = new Date(), type = null) => {
  const date = new Date(value)
  return type == 'full'
    ? `${addZero(date.getDate())} ${months[date.getMonth()].name} ${addZero(date.getFullYear())}, ${addZero(date.getHours())}:${addZero(date.getMinutes())}`
    : `${addZero(date.getDate())} ${months[date.getMonth()].name} ${addZero(date.getFullYear())}`
}

const convertDateShort = (value = new Date(), type = null) => {
  let date = new Date(value)
  return type == 'full'
    ? `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`
    : type == 'hour'
      ? `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
      : `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())}`
}

const generateExcel = async (url) => {
  const res = await api.get(url)
  await download(res.data)
}

const url = import.meta.env.VITE_URL

const download = async (filepath) => {
  const filename = filepath.split('/').at(-1) || ''
  axios({
    url: `${url}/${filepath}`,
    method: 'GET',
    responseType: 'blob'
  }).then((response) => {
    
    const fileURL = window.URL.createObjectURL(new Blob([response.data]))
    const fileLink = document.createElement('a')
    fileLink.href = fileURL
    fileLink.setAttribute('download', filename)
    document.body.appendChild(fileLink)
    fileLink.click()
  })
}

export { convertDate, convertDateShort, months, generateExcel, langs, download }
