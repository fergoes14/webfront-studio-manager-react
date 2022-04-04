import React from 'react'
import Grid from '../layout/grid'


export default props => {



    return (
        <Grid cols={props.cols} >
            <div>

                <label htmlFor={props.name}>{props.label}</label>

                <select className='form-control' {...props.input} readOnly={props.readOnly}>
                   {props.children}
                </select>

            </div>
        </Grid>
    )
}


