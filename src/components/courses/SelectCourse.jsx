import React, { useEffect, useMemo, useState } from 'react'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { useLazyGetUnitsQuery } from '../../toolkit/apis/unitsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { useLazyGetCoursesQuery } from '../../toolkit/apis/coursesApi'
import TabInfo from '../ui/TabInfo'
import { lang } from '../../settings/constants/arlang'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { Alert } from '@mui/material'
import { StyledBtn } from '../../style/mui/btns/buttonsStyles'

function SelectCourse({ unit = 0, value, setValue, reset, setCourses, courses }) {

    const [count, setCount] = useState('loading ...')

    const [getData, status] = useLazyGetCoursesQuery()
    const [getCourses] = useLazyGetData(getData)

    useEffect(() => {

        const trigger = async () => {
            const coursesRes = await getCourses({ unit: unit !== 0 ? unit : 'all' }, false)
            setCourses(coursesRes.courses)
            setCount(coursesRes.count)
        }

        trigger()

    }, [unit])

    if (status.isLoading) return <LoaderWithText />

    if (status.isSuccess && courses.length === 0) return <Alert variant="filled" severity="warning">
        No units in this grade
    </Alert>



    return (
        <>
            {/* <StyledBtn disabled={!unit} onClick={() => setCourseModal(true)}> {lang.CREATE_COURSE}</StyledBtn> */}

            <TabInfo count={count} i={1} title={lang.CHOOSE_COURSE} />
            <MakeSelect title={lang.CHOOSE_COURSE} reset={reset} value={value} setValue={setValue} options={makeArrWithValueAndLabel(courses, { value: '_id', label: 'name' })} />
        </>
    )
}

export default SelectCourse
