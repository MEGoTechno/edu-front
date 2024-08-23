import { useDispatch } from 'react-redux'
import { setGlobalMsg, setUser } from '../toolkit/globalSlice'

export default function usePostData(sendData) {
  const dispatch = useDispatch()
  let data

  const trigger = (values, isMultiPart, params) => {

    data = values

    // removing spacing
    Object.keys(data).forEach(key => {
      if ((data[key] !== "_id" || data[key] !== "id") && !data?._id) {
        if (typeof data[key] === "string") {
          data[key] = data[key].trim()
        }
      }
    })
    // if multipart request into multer ...
    let formData = data
    if (isMultiPart) {
      formData = new FormData()
      Object.keys(data).forEach(key => formData.append(key, data[key]))
    }

    return new Promise(async (resolve, reject) => {

      try {
        const res = await sendData(formData, params)

        if (res.error) {
          // error ===> invalid jwt or not user
          if (res.error?.data?.isKick === true) {
            dispatch(setUser(null))
            return;
          }
          //global error 
          dispatch(setGlobalMsg({ message: res?.error?.data?.message || res?.error?.message, severity: "error" }))
          return;
        }

        // in success
        if (res.data?.message) {
          dispatch(setGlobalMsg({ message: res.data?.message, severity: "success" }))
        }
        resolve(res?.data?.values)

      } catch (error) {
        dispatch(setGlobalMsg({ message: error.message, severity: "error" }))
        reject(error)
      }
    })
  }

  return [trigger]
}
