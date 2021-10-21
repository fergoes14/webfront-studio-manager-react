import React from 'react'
import Grid from '../layout/grid'


export default props => {



    return (
        <Grid cols={props.cols} >
            <div  className='form-group'>

            <input
            {...props.input}
            onChange={props.onChange}
            className='form-control'
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            type={props.type}
            onKeyUp={props.onKeyUp}
             />

            </div>
        </Grid>
    )
}