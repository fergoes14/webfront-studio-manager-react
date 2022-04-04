import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tabs/tabs'
import TabsHeader from '../common/tabs/tabsHeader'
import TabsContent from '../common/tabs/tabsContent'
import TabHeader from '../common/tabs/tabHeader'
import TabContent from '../common/tabs/tabContent'
import { selectTab, showTabs } from '../common/tabs/tabActions'

import List from './billingCycleList'


import Form from './billingCycleForm'
import { create, update, remove, init } from './billingCyclesAction'
import CountBilling from './countBilling'

class CadastroAluno extends Component {

    componentWillMount() {
        this.props.init()
    }

    render() {
        return (
            <div>
                
                <ContentHeader title='Financeiro' small='cadastro' />
                <CountBilling/>
                <Content>
                    <Tabs>
                        <TabsHeader>

                            <TabHeader label='Listar' icon='fa fa-bars' target='tabList' />
                            <TabHeader label='Novo' icon='fa fa-plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='fa fa-pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='fa fa-trash-o' target='tabDelete' />
                            <TabHeader label='Evolução' icon='fa fa-line-chart' target='tabEvo' />
                        </TabsHeader>

                        <TabsContent>

                            <TabContent id='tabList'>
                                <List />
                            </TabContent>

                            <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.create} submitLabel='Adicionar' submitClass='bg-navy margin' />
                            </TabContent>

                            <TabContent id='tabUpdate'>
                                <Form onSubmit={this.props.update} submitLabel='Alterar' submitClass='bg-orange margin' />
                            </TabContent>

                            <TabContent id='tabDelete'>
                                <Form onSubmit={this.props.remove} readOnly={true} submitLabel='Excluir' submitClass='bg-purple margin' />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ selectTab, showTabs, init, create, update, remove, }, dispatch)
export default connect(null, mapDispatchToProps)(CadastroAluno)
