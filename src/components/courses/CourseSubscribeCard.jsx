import React, { useEffect, useState } from 'react'
import CardCourse from '../ui/CardCourse'
import RowInfo from '../ui/RowInfo'
import { AiFillPoundCircle } from 'react-icons/ai'
import Separator from '../ui/Separator'
import TabInfo from '../ui/TabInfo'
import { FilledHoverBtn } from '../../style/mui/btns/buttonsStyles'
import WrapperHandler from '../../tools/WrapperHandler'
import { Link } from '@mui/material'
import Loader from '../../style/mui/loaders/Loader'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { useDispatch, useSelector } from 'react-redux'
import { useSubscribeMutation, useGetOneUserCourseQuery } from '../../toolkit/apis/userCoursesApi'
import usePostData from '../../hooks/usePostData'
import { setUser } from '../../toolkit/globalSlice'
import { getFullDate } from '../../settings/constants/dateConstants'
import { useNavigate } from 'react-router-dom'

function CourseSubscribeCard({ course }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.global)

    const { data } = useGetOneUserCourseQuery({ course: course._id })


    const [isSubscribed, setSubscribed] = useState(false)
    const [userCourse, setUserCourse] = useState(null)

    const [open, setOpen] = useState(false)
    const [sendData, status] = useSubscribeMutation()
    const [subscribeFc] = usePostData(sendData)

    const subscribe = async () => {
        if (!user) {
            return navigate('/login')
        }
        const res = await subscribeFc({ course: course._id })
        dispatch(setUser({ ...user, wallet: res.wallet }))
        setUserCourse(res.userCourse)
    }

    useEffect(() => {
        if (data?.values) {
            setSubscribed(true)
            setUserCourse(data.values)
        }
    }, [data])

    return (
        <CardCourse img={'/assets/3rd.jpg'} title={course.name} borderColor="transparent">
            {isSubscribed ? <TabInfo count={getFullDate(userCourse.createdAt)} i={1} title={'اشتركت فى'} /> :
                <>
                    <RowInfo title={'سعر الكورس'} desc={`${course.price} جنيها`} icon={<AiFillPoundCircle size={'1.25rem'} />} />
                    {course.discount && (
                        <>
                            <Separator sx={{ width: '100px', borderWidth: '2px', mr: 'auto' }} />
                            <TabInfo title={'discount'} count={course.discount + ' $'} icon={<AiFillPoundCircle size={'1.5rem'} />} i={0} sx={{ mr: 'auto' }} />
                        </>
                    )}

                    <FilledHoverBtn sx={{ mt: '16px', width: '100%' }} onClick={() => setOpen(true)} disabled={status.isLoading} > {status.isLoading ? <Loader color={'orange'} /> : "subscribe now"} </FilledHoverBtn>

                    <Link href="#" underline="hover" mr={'auto'}>
                        سياسه شراء الكورسات
                    </Link>

                    <WrapperHandler status={status} showSuccess={true} />
                </>}
            <ModalStyled action={subscribe} open={open} setOpen={setOpen} title={'هل انت متاكد من الاشتراك بهذا الكوورس ؟'} desc={user ? `سيتم خصم ${course.discount || course.price} من محفظتك` : 'please, make account first!'} />
        </CardCourse>
    )
}

export default CourseSubscribeCard
