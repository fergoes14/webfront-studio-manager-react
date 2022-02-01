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
import { create, remove, update } from './cadastroProfActions'

import ListProf from './cadastroProfissionalList'
import CountProf from './countProf'
import FormProf from './CadastroProfForm'

class CadastroProfissional extends Component {


    componentWillMount() {
        this.props.selectTab('listProf')
        this.props.showTabs('listProf', 'createProf')
    }


    render() {
        return (
            <div>
                <ContentHeader title='Profissionais' small='cadastro' />
                <CountProf />
                <Content>

                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='fa fa-bars' target='listProf' />
                            <TabHeader label='Novo' icon='fa fa-plus' target='createProf' />
                            <TabHeader label='Alterar' icon='fa fa-pencil' target='updateProf' />
                            <TabHeader label='Excluir' icon='fa fa-trash-o' target='deleteProf' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='listProf'>
                                <ListProf />
                            </TabContent>
                            <TabContent id='createProf'>
                                <FormProf onSubmit={this.props.create} submitLabel='Adicionar' submitClass='bg-navy margin' />
                            </TabContent>
                            <TabContent id='updateProf'>
                                <FormProf onSubmit={this.props.update} submitLabel='Alterar' submitClass='bg-orange margin' />
                            </TabContent>
                            <TabContent id='deleteProf'>
                                 <FormProf onSubmit={this.props.remove} readOnly={true} submitLabel='Excluir' submitClass='bg-purple margin'  />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ selectTab, showTabs, create,update,remove }, dispatch)
export default connect(null, mapDispatchToProps)(CadastroProfissional)
