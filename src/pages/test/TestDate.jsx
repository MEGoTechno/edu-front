import React from 'react'
import RowInfo from '../../components/ui/RowInfo'
import TabInfo from '../../components/ui/TabInfo'
import InfoInCircle from '../../components/ui/InfoInCircle'

function TestDate() {

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', }
    const shortOptions = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short', }

    const ar = new Date(2003, 10, 11).toLocaleDateString("ar-EG", shortOptions)
    return (
        <div>
            <h1>complete date :</h1> <p>{new Date(2003, 10, 11).toLocaleDateString("en", dateOptions)}</p>
            <h1>complete short :</h1>
            <RowInfo title={'date'} desc={ar} icon={'icona'} />
            <TabInfo title={'date'} count={ar} icon={'||'} i={1} />
            <InfoInCircle title={'date'} count={ar} icon={'||'} i={1} />
        </div>
    )
}

export default TestDate
