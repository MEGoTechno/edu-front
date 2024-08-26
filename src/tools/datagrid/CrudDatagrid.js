import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Grid, useTheme } from '@mui/material';
import ModalStyled from '../../style/mui/styled/ModalStyled';



// editing = {bgcolor, }
// req {...filter, ...(sort => sortKey, sortValue), select,  limit, page}
// * in main fc return {values, count}
// only for listen
//filter params +> object has filter keys
// when update done forget to return the new object to rows


function CrudDatagrid({ filterParams = [], reset, columns, editing, fetchFc, loading, updateFc, deleteFc }) {

    const [isOpen, setOpenModal] = useState(false)
    const [deleteId, setDeleteId] = useState("")


    const theme = useTheme()
    const [rows, setRows] = useState([])

    const [filter, setFilter] = useState()
    const [sort, setSort] = useState()

    // for pagination settings
    const [pageState, setPageState] = useState({
        isLoading: false,
        rowCount: 0
    })

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5, // =limit
    });

    // filtering
    const onFilterChange = React.useCallback((filterModel) => {

        const filtered = {}
        filterModel?.items.map((item) => {
            filtered[item.field] = item.value || ""
            return filtered
        })
        setFilter(filtered)
    }, []);

    useEffect(() => {
        if (filterParams.length !== 0) {
            setFilter(filterParams)
        }
    }, [...Object.values(filterParams)])

    // for sorting
    const handleSortModelChange = React.useCallback((sortModel) => {
        if (sortModel.length > 0) {
            setSort({
                sortkey: sortModel[0].field,
                sortValue: sortModel[0].sort === 'desc' ? -1 : 1
            })
        }
    }, []);




    // for editing settings #####
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        await deleteFc(id)
        setRows(rows.filter((row) => row._id !== id));
        setPageState(pre => { return { ...pre, rowCount: pre.rowCount - 1 } })
    };


    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        // const editedRow = rows.find((row) => row.id === id);
        // if (editedRow.isNew) {
        //     setRows(rows.filter((row) => row.id !== id));
        // }
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = async (newRow) => {

        const res = await updateFc(newRow)
        const updatedRow = { ...res, isNew: true };

        setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
        return updatedRow;
    };

    const modifiedColumns = useMemo(() => {
        return [...columns, {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={1}
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(params.id)}
                        />,
                        <GridActionsCellItem
                            key={2}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(params.id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={1}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(params.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={1}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => {
                            setDeleteId(params.id)
                            setOpenModal(true)
                        }}
                        color="inherit"
                    />,
                ];
            },
        }]
    }, [columns, rowModesModel])

    // running main fc in  changing 
    useEffect(() => {

        const triggerFetch = async () => {
            setPageState(pre => {
                return {
                    ...pre, isLoading: true
                }
            })

            const res = await fetchFc(
                { ...sort, ...filter, limit: paginationModel.pageSize, page: paginationModel.page + 1 }
            )

            //res = {values, count}
            setRows(res.values)
            setPageState(pre => { return { isLoading: false, rowCount: res.count } })
        }

        triggerFetch()

    }, [paginationModel.page, paginationModel.pageSize, sort, filter, reset])


    // hide columns 
    const hideColumns = useMemo(() => {
        const inVisibleModels = {}
        editing?.hideColumns?.map(ele => inVisibleModels[ele] = false)
        return inVisibleModels

    }, [editing?.hideColumns])


    // slots
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Grid container spacing={2}>
                    {
                        editing?.showSlots?.includes("columns") &&
                        <Grid item>
                            <GridToolbarColumnsButton />
                        </Grid>
                    }
                    {
                        editing?.showSlots?.includes("filter") &&
                        <Grid item>
                            <GridToolbarFilterButton />
                        </Grid>
                    }
                    {
                        editing?.showSlots?.includes("density") &&
                        <Grid item>
                            <GridToolbarDensitySelector />
                        </Grid>
                    }
                    {
                        editing?.showSlots?.includes("export") &&
                        <Grid item>
                            <GridToolbarExport />
                        </Grid>
                    }
                </Grid>
            </GridToolbarContainer>
        );
    }
    return (
        <>
            <DataGrid
                rows={rows || []}
                columns={modifiedColumns}
                loading={pageState?.isLoading || loading || false}
                rowCount={pageState?.rowCount} // ===> total for server (.length)
                getRowId={(param) => param._id}

                pageSizeOptions={[5, 10, 50, 100]}

                // for pagination
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel} // controls ==> currntPage, pageSize

                // for search
                onFilterModelChange={onFilterChange}

                //for sorting
                sortingMode="server"
                onSortModelChange={handleSortModelChange}

                //for edit
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(err) => console.log(err)} // make err
                editMode="row"


                //slots
                slots={{
                    toolbar: CustomToolbar
                }}

                // Hide columns status and traderName, the other columns will remain visible
                // columnVisibilityModel={hideColumns || []}
                sx={{
                    bgcolor: 'background.default',
                    height: '70vh',
                    width: '100%',
                    color: 'neutral.0',
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: theme.shadows[1],
                    "&  .muirtl-yrdy0g-MuiDataGrid-columnHeaderRow": {
                        bgcolor: 'background.alt', my: '8px', color: 'neutral.0' //28323D
                    }
                }}

            />

            <ModalStyled open={isOpen} setOpen={setOpenModal} title={'هل انت متاكد من الحذف  ؟'} action={handleDeleteClick(deleteId)} />
        </>

    )
}

export default CrudDatagrid
