import React, {useEffect, useState} from "react"
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import API from "../../API/API";
import {Alert, Typography} from "@mui/material";

/*{
"id":1,
"firstName":"German",
"lastName":"Hammes",
"birthDate":"1978-01-21T21:00:00.000+00:00",
"phoneNumber":"+266495493403",
"email":"hiram.lubowitz@hotmail.com",
"city":"West Hyebury",
"state":"New Mexico",
"country":"Georgia",
"churchName":"The Violent Bear It Away",
"isMemberOfChurch":true,
"ministryInChurch":true,
"categoryOfRelationships":"CHURCH"
}
* */
const columns = [
    {field: 'firstName', headerName: 'First name', width: 130},
    {field: 'lastName', headerName: 'Last name', width: 130},
    {field: 'phoneNumber', headerName: 'Phone', width: 130},
    {field: 'email', headerName: 'Email', width: 230},
    {field: 'country', headerName: 'Country', width: 150},
    {field: 'state', headerName: 'State', width: 130},
    {field: 'city', headerName: 'City', width: 150},
    {field: 'categoryOfRelationships', headerName: 'Relationship', width: 150},
    {field: 'churchName', headerName: 'Church name', width: 150},
    {field: 'isMemberOfChurch', headerName: 'MemberOfChurch', width: 150},
    {field: 'ministryInChurch', headerName: 'MinistryInChurch', width: 150},
];


export default function SendSMSPage1({setAlert, setSelectionUsers}) {
    const [users, setUsers] = useState(undefined)
    const [selectionModel, setSelectionModel] = React.useState([]);

    function onSelect(newSelectionModel) {
        setSelectionModel(newSelectionModel);
        let newSelectedUsers = []
        newSelectionModel.map((i) => {
            newSelectedUsers.push(users[i - 1])
        })
        setSelectionUsers(newSelectedUsers)
    }

    useEffect(() => {
        API.getUsers((users) => {
            setUsers(users)
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }, [])

    return (
        <>
            <Typography p={2} textAlign={"center"} variant={"h4"}>
                Select users for send SMS
            </Typography>
            {users !== undefined
                ? <DataGrid
                    sx={{
                        height: "80vh"
                    }}
                    rows={users.filter(user => user.phoneNumber[0] === '+' && user.phoneNumber[1] === '1')}
                    columns={columns}
                    onSelectionModelChange={onSelect}
                    selectionModel={selectionModel}
                    checkboxSelection
                    components={{
                        Toolbar: GridToolbar
                    }}
                />
                : <></>
            }
        </>
    )
}