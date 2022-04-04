import React from 'react'
import Grid from '../layout/grid'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default props => {
    return (
        <Grid cols={props.cols} >


            <label htmlFor={props.name}>{props.label}</label>
            <DatePicker
                {...props.input}
                placeholderText={props.placeholder}
                selected={props.selected}
                showTimeSelect dateFormat="Pp"
                
            //showTimeSelect dateFormat="Pp" 



            />


        </Grid>
    )
}