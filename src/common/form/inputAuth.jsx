import React from 'react'
import If from '../operador/if'

export default props =>(
    <If test={!props.hide}>
        <div className='form-group has-feedback'>
            <input
            {...props.input}
            
            className='form-control'
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            type={props.type}
            value={props.value2}
            ref={props.ref1}
            />
            <span className={`glyphicon glyphicon-${props.icon} form-control-feedback `}></span>
        </div>
    </If>
)
