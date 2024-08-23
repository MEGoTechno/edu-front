import { useDispatch } from 'react-redux'
import { setGlobalMsg, setUser } from '../toolkit/globalSlice'

// 1- on sending => if cahced, params query
// 2- on recieve => chache, error, loading, return on success


export default function useLazyGetData(getData) {
    // getData(query, prefereCahed)
    const paramsSchema = {
        limit: '', page: '',
        property: 'value', // for research
        sortKey: '', sortValue: '',
        select: 'name -age ...'
    }

    const dispatch = useDispatch()

    const getFromDB = (params, enableCache = true) => {

        return new Promise(async (resolve, reject) => {
            try {
                const result = await getData(params, enableCache)
                if (result.error) {
                    // error ===> invalid jwt
                    if (result.error?.data?.isKick === true) {
                        dispatch(setUser(null))
                        dispatch(setGlobalMsg({ message: "sorry!, you have to log in", severity: "error" }))
                        return;
                    }

                    dispatch(setGlobalMsg({ message: result.error.data?.message || result.error.message || result.error.error, severity: "error" }))
                    return;
                }

                // in success
                resolve(result.data.values)
            } catch (error) {
                console.log('error ==>', error)

                dispatch(setGlobalMsg({ message: error.message, severity: "error" }))
                reject(error)
            }
        })
    }


    return [getFromDB]
}
