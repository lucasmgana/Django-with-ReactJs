import { Grid, TextField, Typography, Button } from '@material-ui/core';
import React, { Component, } from 'react';
import { Link } from 'react-router-dom';


export default class CreateRoomPage extends Component{
    constructor(props){
        super(props);
        this.state={
            roomCode: "",
            error: ""
        }
        this.handleTextFildChange = this.handleTextFildChange.bind(this)
        this.roomButtonPressed = this.roomButtonPressed.bind(this)
    }


    handleTextFildChange(e){
        this.setState({
            roomCode: e.target.value,
        })
    }

    roomButtonPressed(){
        console.log(this.state.roomCode)
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };
        fetch ('/api/join-room', requestOptions).then((response) => {
        if (response.ok){
            this.props.history.push(`/room/${this.state.roomCode}`)
        } else {
            this.setState({
                error: "Room not found."
            })
        }
    }).catch((error) => { console.log(error) });
}

    render(){
        return (
            <Grid spacing={1} container align='center'>
                <Grid item xs={12} >
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                    error={this.state.error}
                    label = "Code"
                    placeholder = "Enter room code"
                    value = {this.state.roomCode}
                    helperText= {this.state.error}
                    variant = "outlined" 
                    onChange= {this.handleTextFildChange}
                    />
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='primary' onClick={this.roomButtonPressed}>Enter Room</Button>
                </Grid>

                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='secondary'  to="/" component={ Link }>Back</Button>
                </Grid>
            </Grid>
        )        
    }
}