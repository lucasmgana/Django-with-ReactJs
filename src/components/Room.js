import React, { Component, } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class Room extends Component {
    constructor(props){
        super(props);
        this.state={
            voteToSkip: 2,
            guestCanPause: false,
            isHost: false
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    }

    getRoomDetails(){
        fetch('/api/get-room?code='+this.roomCode)
        .then((response)=>{
            if(!response.ok){
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            response.json();
        }).then((data) => {
                this.setState({
                    voteToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
            })
        })
    }


    leaveButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        };

        fetch('/api/leave-room', requestOptions).then(
            (_response)=> {
                this.props.leaveRoomCallback;
                this.props.history.push("/");
            })
    }


    render(){
        return (
            <Grid container spacing={1}>
            <Grid item align='center' xs={12}>
                <Typography component='h4' variant='h4'>
                    code: {this.roomCode}
                </Typography>
            </Grid>
            <Grid item align='center' xs={12}>
                <Typography component='h6' variant='h6'>
                    Vote to skip: {this.state.voteToSkip}
                </Typography>
            </Grid>
            <Grid item align='center' xs={12}>
                <Typography component='h6' variant='h6'>
                    Guest can pause: {this.state.guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item align='center' xs={12}>
                <Typography component='h6' variant='h6'>
                    is Host: {this.state.isHost.toString()}
                </Typography>
            </Grid>
            <Grid item align='center' xs={12}>
                <Button onClick={this.leaveButtonPressed} color='secondary' variant='contained' component={Link} to='/'>
                    Leave Room
                    </Button>
            </Grid>
            </Grid>
        )
    }
}