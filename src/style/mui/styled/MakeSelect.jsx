import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect } from 'react'

function MakeSelect({ title, value, setValue, options, reset = []}) {


    useEffect(() => {
        setValue("")
    }, [...reset])

    return (
        <FormControl sx={{ maxWidth: '500px', minWidth: '250px' }}>
            <InputLabel id="demo-simple-select-label">{title}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value || ""}
                label={title || "اختر"}
                defaultValue={""} // Sets the default value to empty string
                onChange={(e, newValue) => { setValue(e.target.value) }}
            >
                {options?.map((option, i) => {
                    return (
                        <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default memo(MakeSelect)
