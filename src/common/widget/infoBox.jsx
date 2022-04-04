import React from 'react'
import Grid from '../layout/grid'

export default props => {
    return (
        <Grid cols={props.cols}>
            <div className={`box box-${props.color} box-solid`}>
                <div className="box-header with-border">
                    <h3 className="box-title">{props.value}</h3>
                    <div className="box-tools pull-right">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                        </button>
                    </div>

                </div>

                <div className="box-body">
                    {props.children}
                </div>

            </div>
        </Grid>
    )
}