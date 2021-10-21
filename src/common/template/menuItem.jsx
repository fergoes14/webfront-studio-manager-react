import React from 'react'
import { Link } from 'react-router-dom'

export default props =>{
    return(
        <li>
            <Link to={props.path}>
                <i className={props.icon}></i> <span>{props.label}</span>
            </Link>
        </li>
    )
}