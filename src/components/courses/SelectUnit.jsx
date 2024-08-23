import React, { memo, useEffect, useMemo, useState } from 'react'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { useLazyGetUnitsQuery } from '../../toolkit/apis/unitsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import TabInfo from '../ui/TabInfo'
import { lang } from '../../settings/constants/arlang'
import WrapperHandler from '../../tools/WrapperHandler'
import { Alert } from '@mui/material'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'

function SelectUnit({ grade = 0, value, setValue, reset = [] }) {

  const [units, setUnits] = useState([])
  const [counts, setCounts] = useState('loading ...')

  const [getData, status] = useLazyGetUnitsQuery()
  const [getUnits] = useLazyGetData(getData)

  useEffect(() => {

    const trigger = async () => {
      const unitsRes = await getUnits({ grade: grade ? grade : 'all' }, false)
      console.log(unitsRes)
      setUnits(unitsRes.units)
      setCounts(unitsRes.count)
    }

    trigger()

  }, [grade])


  if (status.isLoading) return <LoaderWithText />

  if (status.isSuccess && units.length === 0) return <Alert variant="filled" severity="warning">
    No units in this grade
  </Alert>

  return (
    <>
      <TabInfo count={counts} i={1} title={lang.CHOOSE_UNIT} />

      <MakeSelect title={lang.CHOOSE_UNIT} reset={reset} value={value} setValue={setValue} options={makeArrWithValueAndLabel(units, { value: '_id', label: 'name' })} />
    </>
  )
}

export default memo(SelectUnit)
