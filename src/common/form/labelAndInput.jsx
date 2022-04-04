import React from 'react'
import Grid from '../layout/grid'
import ReactInputMask from 'react-input-mask'

export default props => {
    return (
        
            <Grid cols={props.cols} >

                <div className='form-group'>

                    <label htmlFor={props.name}>{props.label}</label>
                   
                        
                            
                            <ReactInputMask
                                {...props.input} className='form-control'
                                placeholder={props.placeholder}
                                readOnly={props.readOnly}
                                type={props.type}
                                mask={props.mask}


                            />
                        

                    
                </div>

            </Grid>
        
    )
}