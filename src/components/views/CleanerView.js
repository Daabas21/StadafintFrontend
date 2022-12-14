import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

function CleanerView() {

  const[cleanerData, setCleanerData] = useState([])
  const[input, setInput] = useState({name: "", address: "", telnum: "", email: "", password: ""})

  useEffect(() => {
    fetch('http://localhost:8080/cleaner/1')
      .then(res => res.json())
      .then(data => setCleanerData(data))
  },[])

  console.log(cleanerData)

  const handleChange = (e) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async () => {

    console.log(input)

    await fetch('http://localhost:8080/cleaner/1', {
        method: 'PUT',
        body: JSON.stringify(input),
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    let response = await fetch('http://localhost:8080/cleaner/1')
    let body = await response.json()

    setCleanerData(body)
  }

  return (
    <div className="App">
      {cleanerData? <div>
        <p>{cleanerData.name} lives in {cleanerData.address} his telephone {cleanerData.telnum}</p>
      </div> : null}
      <Stack spacing={2} alignItems="center">
        <TextField
            id='name'
            label='Name'
            variant='standard'
            value={input.name}
            name='name'
            onChange={handleChange}
            />
            <TextField
            id='address'
            label='Address'
            variant='standard'
            value={input.address}
            name='address'
            onChange={handleChange}
            />
            <TextField
            id='telnumber'
            label='Tel'
            variant='standard'
            value={input.telnum}
            name='telnum'
            onChange={handleChange}
            />
            <TextField
            id='email'
            label='Email'
            variant='standard'
            value={input.email}
            name='email'
            onChange={handleChange}
            />
            <TextField
            id='password'
            label='NewPassword'
            variant='standard'
            value={input.password}
            name='password'
            onChange={handleChange}
            />
        <Button
            variant='contained'
            color='success'
            onClick={handleSave}
            >Edit</Button>
            <div>
                
            </div>
      </Stack>
    </div>
  );
}

export default CleanerView;
