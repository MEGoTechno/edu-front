import { Box, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { ErrorMessage, FastField, Field, useField } from 'formik'
import React, { useMemo } from 'react'

import MakeFieldArray from './MakeFieldArray'
import MakeRadio from './components/MakeRadio'
import MakeFile from './components/MakeFile'

import { getValues } from './constants/getValue'
import { getInputName } from './constants/getInputName'
import MakeTitle from './components/MakeTitle'
import { hasError } from './constants/hasError'
import MakeChunk from './MakeChunk'
import MakeSelect from './components/MakeSelect'
import MakeSelectRef from './components/MakeSelectRef'
import MakeChoosed from './components/MakeChoosed'
import MakeFullDate from './components/MakeFullDate'
import Text from '../text/Text'


const m = '6px 0'
export default function MakeInput({ input, props, nestedInputName, style }) {
    //nestedInputName in case used by field array

    const inputName = getInputName(nestedInputName, input)
    const value = getValues(inputName, props)

    // const inputName = useMemo(() => nestedInputName || input.name, [input])
    // const [field, meta, helpers] = useField(inputName)
    // const { value } = meta;
    // const { setValue } = helpers;

    if (input.type === "chunk") {
        return <MakeChunk inputName={inputName} input={input} props={props} values={value} />
    }

    if (input?.type === "header") {
        return <Box>
            <MakeTitle title={input.title} />
        </Box>
    }

    if (input?.type === "array") {
        return <MakeFieldArray inputName={inputName} input={input} props={props} values={value} />
    }

    if (input?.type === "radio") { // done
        return (
            <Box>
                <MakeRadio inputName={inputName} input={input} props={props} />
            </Box>
        )
    }

    if (input?.type === "file") {
        return (
            <MakeFile inputName={inputName} input={input} props={props} value={value} />
        )
    }

    if (input.type === 'fullDate') {
        return <Box m={"10px 0"}>
            <MakeFullDate inputName={inputName} props={props} value={value} input={input} />
        </Box>
    }

    if (input.type === "select") { //done

        return (
            <Box m={m} width={'100%'}>
                <MakeSelect props={props} inputName={inputName} input={input} value={value} />
            </Box>
        )
    }

    if (input.type === "choosed") { //bad

        return (
            <MakeChoosed props={props} inputName={inputName} input={input} value={value} />
        )
    }

    if (input.type === "selectRef") {
        return <MakeSelectRef inputName={inputName} input={input} props={props} value={value} />
    }

    if (input.type === 'editor') {
        return <div style={{ width: '100%' }}>
            <Text defaultData={getValues(inputName, props)} setText={(text) => props.setFieldValue(inputName, text)} />
        </div>
    }

    return (
        <FastField
            as={TextField}
            sx={{
                m: "6px 0",
                display: input.hidden && "none",
                width: input.width ? input.width : "100%",
                direction: input.direction || 'ltr'
            }}

            // style={style}

            name={inputName}
            type={input.type ? input.type : "text"}
            label={
                <Box display={"flex"} alignItems={"center"} gap={".5rem"} sx={{
                    direction: 'ltr'
                }}>
                    {input.icon && input.icon}
                    <Typography variant='overline'>
                        {input.label}
                    </Typography>
                </Box>}
            error={hasError(props, inputName) ? true : false}
            helperText={hasError(props, inputName) ? < ErrorMessage name={inputName} /> : input.helperText || ""}

            placeholder={input.placeholder && input.placeholder}
            variant={input.variant ? input.variant : "outlined"}
            color='success'

            required={input.required || false}
            disabled={input.disabled ? true : false}
            hidden={input.hidden && true}
            defaultValue={input.defaultValue && input.defaultValue}

            multiline={input.rows && true}
            rows={
                input.rows || undefined
            }
            InputProps={input.endIcon && {
                endAdornment: (
                    <InputAdornment position="end">
                        {input.endIcon}
                    </InputAdornment>
                ),
            }}
        />
    )
}


// normal, nested
// types ===>>>  text,