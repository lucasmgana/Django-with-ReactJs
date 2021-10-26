import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import { RadioGroup } from '@material-ui/core';


export default class RoomJoinPage extends Component {
    defaultVotes = 2;
    constructor(props){
        super(props);
        this.state= {
            guestCanPause: true,
            votesToSkip: this.defaultVotes
        }
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    }

    handleVotesChange(e){
        this.setState({
            votesToSkip: e.target.value
        })
    }

    handleGuestCanPauseChange(e){
        this.setState({
            guestCanPause: e.target.value === 'true' ? true: false,
        })
    }

    handleRoomButtonPressed(e){
        const requestOptions={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                guest_can_pause:this.state.guestCanPause,
                votes_to_skip:this.state.votesToSkip 
            })
        };
        fetch('/api/create', requestOptions).then((response) => response.json()).then(
            (data) => this.props.history.push('/room/'+data.code)
        )
    }



    render(){
        return (
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <Typography component="h4" variant="h4">
                Create a Room
              </Typography>
            </Grid>

            <Grid item xs={12} align="center">
              <FormControl component="fieldset">
                <FormHelperText>
                  <div align="center">Guest Control of Playback State</div>
                </FormHelperText>
                <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" /> }
                    label="Play/Pause"
                    labelPlacement="bottom"
                  />

                  <FormControlLabel
                    value="false"
                    control={<Radio color="secondary"/>}
                    label="No control"
                    labelPlacement="bottom"                      
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} align='center'>
                <FormControl>
                <TextField required={true} type='number' onChange={this.handleVotesChange} defaultValue={this.defaultVotes} inputProps={{
                    min: 1,
                    style: {textAlign: 'center'}
                }} />
                <FormHelperText> 
                    <div align='center'>
                        Vote required to skip
                    </div>
                </FormHelperText>
                </FormControl>
                </Grid> 

                <Grid item xs={12} align="center">
                    <Button color="secondary" variant='contained' onClick={this.handleRoomButtonPressed}>
                        Create a Room
                    </Button>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button color='primary' to="/" component={ Link } variant='contained'>
                        Back
                    </Button>
                </Grid>
          </Grid>
        );
        
    }
}