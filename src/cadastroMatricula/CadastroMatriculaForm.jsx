import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import LabelAndInput from '../common/form/labelAndInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from './CadastroMatriculaAction'
import SelectInput from '../common/form/select'
import axios from 'axios'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from 'reactstrap'

import moment from 'moment'
import ItemList from './itemList'


const URL = 'https://backend-studio-manager.herokuapp.com'
class CadastroMatriculaForm extends Component {
    ref = React.createRef();
    calendarInst = null;
    constructor(props) {
        super(props)
        this.state = {
            alunosMongo: [],
            planosMongo: [],
            salasMongo: [],
            profMongo: [],
            alunoById: [],
            planosById: [],
            profByID: [],
            salasById: [],
            profName: '',
            alunoName: '',
            planoName: '',
            salaName: '',
            duracaoPlano: 0,
            vezesSemana: 0,
            inicioPlano: null,
            fimPlano: null,
            start1: false,
            start2: false,
            start3: false,
            start4: false,
            start5: false,
            start6: false,
            start7: false,
            dom: null,
            seg: null,
            ter: null,
            qua: null,
            qui: null,
            sex: null,
            sab: null,
            cont: 0,
            disabled: false,
        }


        this.handleChange = this.handleChange.bind(this)

    }

    async componentDidMount() {
        const alunosData = await axios.get(`${URL}/alunos`)
        const planosData = await axios.get(`${URL}/planos`)
        const profData = await axios.get(`${URL}/profissionais`)
        const salaData = await axios.get(`${URL}/salas`)

        this.setState({
            start1: false,
            start2: false,
            start3: false,
            start4: false,
            start5: false,
            start6: false,
            start7: false,
            profMongo: profData.data,
            planosMongo: planosData.data,
            salasMongo: salaData.data,
            alunosMongo: alunosData.data,
        })


        for (let i = 1; i <= 10; i++) {
            console.log('teste loop' + i)
            for (let e = 1; e <= 4; e++) {
                console.log('teste dentro do teste')
            }
        }

        const hora = moment()
        hora.set('hour', 2)
        hora.set('minutes', 0)
        hora.set('second', 0);
        hora.set('millisecond', 0);
        console.log('hora:' + new Date(hora))


    }

    async domingo(e) {
        this.setState({ start1: await e.target.checked })
        const today = moment()

        const Sunday = moment()
        Sunday.day('Sunday')
        if (Sunday.get("date") < today.get("date") || Sunday.get("month") < today.get("month")) {
            Sunday.day(8)
            Sunday.day('Sunday')
        }



        if (this.state.start1 === true) {
            this.setState({ cont: this.state.cont + 1 })
            this.setState({ dom: new Date(Sunday) })

        } else {
            this.setState({ cont: this.state.cont - 1 })
            this.setState({ dom: null })

        }


        console.log('Sunday: ' + this.state.dom)
    }

    async domingoHour(e) {

        const hora = moment(this.state.dom)
        hora.set('hour', await e.target.value)
        hora.set('minutes', 0)
        hora.set('second', 0);
        hora.set('millisecond', 0);

        this.setState({ dom: new Date(hora) })

        console.log('Sunday: ' + this.state.dom)
    }

    async segunda(e) {
        this.setState({ start2: await e.target.checked })
        console.log(this.state.start2)

        const today = moment()

        const Monday = moment()
        Monday.day('Monday')
        if (Monday.get("date") < today.get("date") || Monday.get("month") < today.get("month")) {
            Monday.day(7)
            Monday.day('Monday')
        }

        console.log('Monday: ' + new Date(Monday))

        if (this.state.start2 === true) {
            this.setState({ cont: this.state.cont + 1 })
            this.setState({ seg: new Date(Monday) })

        } else {
            this.setState({ cont: this.state.cont - 1 })
            this.setState({ seg: null })

        }

        console.log(this.state.cont)
        console.log(this.state.seg)
    }

    async segundaHour(e) {

        const hora = moment(this.state.seg)
        hora.set('hour', await e.target.value)
        hora.set('minutes', 0)
        hora.set('second', 0);
        hora.set('millisecond', 0);

        this.setState({ seg: new Date(hora) })

        console.log(this.state.seg)
    }

    async terça(e) {
        this.setState({ start3: await e.target.checked })
        console.log(this.state.start3)

        const today = moment()

        const Tuesday = moment()
        Tuesday.day('Tuesday')
        if (Tuesday.get("date") < today.get("date") || Tuesday.get("month") < today.get("month")) {
            Tuesday.day(7)
            Tuesday.day('Tuesday')

        }

        if (this.state.start3 === true) {
            this.setState({ cont: this.state.cont + 1 })
            this.setState({ ter: new Date(Tuesday) })
        } else {
            this.setState({ cont: this.state.cont - 1 })
            this.setState({ ter: null })
        }

        console.log('Tuesday: ' + this.state.ter)
    }
    async terçaHour(e) {

        const hora = moment(this.state.ter)
        hora.set('hour', await e.target.value)
        hora.set('minutes', 0)
        hora.set('second', 0);
        hora.set('millisecond', 0);

        this.setState({ ter: new Date(hora) })

        console.log(this.state.ter)
    }


    async quarta(e) {
        this.setState({ start4: await e.target.checked })
        console.log(this.state.start4)

        const today = moment()

        const Wednesday = moment()
        Wednesday.day('Wednesday')
        if (Wednesday.get("date") < today.get("date") || Wednesday.get("month") < today.get("month")) {
            Wednesday.day(8)
            Wednesday.day('Wednesday')

        }

        if (this.state.start4 === true) {
            this.setState({ cont: this.state.cont + 1 })
            this.setState({ qua: new Date(Wednesday) })
        } else {
            this.setState({ cont: this.state.cont - 1 })
            this.setState({ qua: null })
        }

        console.log('Wednesday: ' + this.state.qua)
    }
    async quartaHour(e) {

        const hora = moment(this.state.qua)
        hora.set('hour', await e.target.value)
        hora.set('minutes', 0)
        hora.set('second', 0);
        hora.set('millisecond', 0);

        this.setState({ qua: new Date(hora) })

        console.log(this.state.qua)
    }


    async quinta(e) {
        this.setState({ start5: await e.target.checked })
        console.log(this.state.start5)

        const today = moment()

        const Thursday = moment()
        Thursday.day('Thursday')
        if (Thursday.get("date") < today.get("date") || Thursday.get("month") < today.get("month")) {
            Thursday.day(8)
            Thursday.day('Thursday')

        }

        if (this.state.start5 === true) {
            this.setState({ cont: this.state.cont + 1 })
            this.setState({ qui: new Date(Thursday) })
        } else {
            this.setState({ cont: this.state.cont - 1 })
            this.setState({ qui: null })
        }
        console.log('Thursday: ' + this.state.qui)
    }
    async quintaHour(e) {

        const hora = moment(this.state.qui)
        hora.set('hour', await e.target.value)
        hora.set('minutes', 0)
        hora.set('second', 0);
        hora.set('millisecond', 0);

        this.setState({ qui: new Date(hora) })

        console.log(this.state.qui)
    }


    async sexta(e) {
        this.setState({ start6: await e.target.checked })
        console.log(this.state.start6)

        const today = moment()

        const Friday = moment()
        Friday.day('Friday')
        if (Friday.get("date") < today.get("date") || Friday.get("month") < today.get("month")) {
            Friday.day(8)
            Friday.day('Friday')

        }

        if (this.state.start6 === true) {
            this.setState({ cont: this.state.cont + 1 })
            this.setState({ sex: new Date(Friday) })
        } else {
            this.setState({ cont: this.state.cont - 1 })
            this.setState({ sex: null })
        }
        console.log('Friday: ' + this.state.sex)
    }
    async sextaHour(e) {

        const hora = moment(this.state.sex)
        hora.set('hour', await e.target.value)
        hora.set('minutes', 0)
        hora.set('second', 0);
        hora.set('millisecond', 0);

        this.setState({ sex: new Date(hora) })

        console.log(this.state.sex)
    }


    async sabado(e) {
        this.setState({ start7: await e.target.checked })
        console.log(this.state.start7)

        const today = moment()

        const Saturday = moment()
        Saturday.day('Saturday')
        if (Saturday.get("date") < today.get("date") || Saturday.get("month") < today.get("month")) {
            Saturday.day(8)
            Saturday.day('Saturday')

        }

        if (this.state.start7 === true) {
            this.setState({ cont: this.state.cont + 1 })
            this.setState({ sab: new Date(Saturday) })
        } else {
            this.setState({ cont: this.state.cont - 1 })
            this.setState({ sab: null })
        }
        console.log('Saturday: ' + this.state.sab)

    }
    async sabadoHour(e) {

        const hora = moment(this.state.sab)
        hora.set('hour', await e.target.value)
        hora.set('minutes', 0)
        hora.set('second', 0);
        hora.set('millisecond', 0);

        this.setState({ sab: new Date(hora) })

        console.log(this.state.sab)
    }





    async changePlano(event) {
        const planoId = await axios.get(`${URL}/planos/${event.target.value}`)
        this.setState({ planosById: planoId.data })
        this.setState({ inicioPlano: new Date() })
        this.setState({ duracaoPlano: this.state.planosById.duracao })


        const data = moment()
        data.add(this.state.duracaoPlano, 'months')
        console.log(data)


        const formatDateEnd = new Intl.DateTimeFormat("pt-br", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(data)

        const formatDateStart = new Intl.DateTimeFormat("pt-br", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(this.state.inicioPlano)

        this.setState({ planoName: this.state.planosById.name })
        this.setState({ vezesSemana: this.state.planosById.vezesSemana })
        this.setState({ fimPlano: formatDateEnd })

        this.props.change("fimPlano", this.state.fimPlano)
        this.props.change("inicioPlano", formatDateStart)
    }


    centralWeeks(scheduleData) {
        if (this.state.dom != null) {
            this.createDom(scheduleData)
        }
        if (this.state.seg != null) {
            this.createSeg(scheduleData)
        }
        if (this.state.ter != null) {
            this.createTer(scheduleData)
        }
        if (this.state.qua != null) {
            this.createQua(scheduleData)
        }
        if (this.state.qui != null) {
            this.createQui(scheduleData)
        }
        if (this.state.sex != null) {
            this.createSex(scheduleData)
        }
        if (this.state.sab != null) {
            this.createSab(scheduleData)
        }

        this.props.change("studio", this.props.user.studio)
        this.props.change("plano", this.state.planoName)
        this.props.change("profissional", this.state.profByID.name)
        this.props.change("sala", this.state.salasById.name)
        this.props.change("aluno", this.state.alunoById.nome)
        this.props.init
    }
    calendarRef = React.createRef();

    async createDom(scheduleData) {
        console.log(scheduleData)
        for (let i = 1; i <= this.state.duracaoPlano; i++) {
            console.log('teste loop' + i)
            for (let e = 1; e <= 4; e++) {
                const formatEnd = moment(await this.state.dom)
                formatEnd.add(1, "hours")
                const start = new Date(this.state.dom);
                const end = new Date(formatEnd);
                const { calendar } = scheduleData;
                const { sala } = scheduleData;
                const schedule = {
                    id: String(Math.random()),
                    title: scheduleData[1],
                    isAllDay: scheduleData.isAllDay,
                    start: start,
                    end: end,
                    category: scheduleData.isAllDay ? "allday" : "time",
                    dueDateClass: "",
                    location: scheduleData.location,
                    customStyle: 'borderWidth: 6px',
                    raw: {
                        class: "public",

                    },
                    borderColor: scheduleData[2],
                    calendarId: scheduleData[0],
                    salaId: scheduleData,
                    state: scheduleData.state,
                    isVisible: scheduleData.isVisible,
                };

                if (calendar) {
                    schedule.calendarId = calendar.id;
                    schedule.color = calendar.color;
                    schedule.bgColor = calendar.bgColor;
                    //schedule.borderColor = calendar.borderColor;
                }

                axios.post(`${URL}/schedules`, schedule)

                const week = moment(this.state.dom)
                week.add(1, 'weeks')
                this.setState({ dom: new Date(week) })
            }
        }
    }

    async createSeg(scheduleData) {
        console.log(scheduleData)
        for (let i = 1; i <= this.state.duracaoPlano; i++) {
            console.log('teste loop' + i)
            for (let e = 1; e <= 4; e++) {
                const formatEnd = moment(await this.state.seg)
                formatEnd.add(1, "hours")
                const start = new Date(this.state.seg);
                const end = new Date(formatEnd);
                const { calendar } = scheduleData;
                const { sala } = scheduleData;
                const schedule = {
                    id: String(Math.random()),
                    title: scheduleData[1],
                    isAllDay: scheduleData.isAllDay,
                    start: start,
                    end: end,
                    category: scheduleData.isAllDay ? "allday" : "time",
                    dueDateClass: "",
                    location: scheduleData.location,
                    customStyle: 'borderWidth: 6px',
                    raw: {
                        class: "public",

                    },
                    borderColor: scheduleData[2],
                    calendarId: scheduleData[0],
                    salaId: scheduleData,
                    state: scheduleData.state,
                    isVisible: scheduleData.isVisible,
                };

                if (calendar) {
                    schedule.calendarId = calendar.id;
                    schedule.color = calendar.color;
                    schedule.bgColor = calendar.bgColor;
                    //schedule.borderColor = calendar.borderColor;
                }
                axios.post(`${URL}/schedules`, schedule)
                const week = moment(this.state.seg)
                week.add(1, 'weeks')
                this.setState({ seg: new Date(week) })
            }
        }
    }

    async createTer(scheduleData) {
        console.log(scheduleData)
        for (let i = 1; i <= this.state.duracaoPlano; i++) {
            console.log('teste loop' + i)
            for (let e = 1; e <= 4; e++) {
                const formatEnd = moment(await this.state.ter)
                formatEnd.add(1, "hours")
                const start = new Date(this.state.ter);
                const end = new Date(formatEnd);
                const { calendar } = scheduleData;
                const { sala } = scheduleData;
                const schedule = {
                    id: String(Math.random()),
                    title: scheduleData[1],
                    isAllDay: scheduleData.isAllDay,
                    start: start,
                    end: end,
                    category: scheduleData.isAllDay ? "allday" : "time",
                    dueDateClass: "",
                    location: scheduleData.location,
                    customStyle: 'borderWidth: 6px',
                    raw: {
                        class: "public",

                    },
                    borderColor: scheduleData[2],
                    calendarId: scheduleData[0],
                    salaId: scheduleData,
                    state: scheduleData.state,
                    isVisible: scheduleData.isVisible,
                };

                if (calendar) {
                    schedule.calendarId = calendar.id;
                    schedule.color = calendar.color;
                    schedule.bgColor = calendar.bgColor;
                    //schedule.borderColor = calendar.borderColor;
                }
                axios.post(`${URL}/schedules`, schedule)
                const week = moment(this.state.ter)
                week.add(1, 'weeks')
                this.setState({ ter: new Date(week) })
            }
        }
    }

    async createQua(scheduleData) {
        console.log(scheduleData)
        for (let i = 1; i <= this.state.duracaoPlano; i++) {
            console.log('teste loop' + i)
            for (let e = 1; e <= 4; e++) {
                const formatEnd = moment(await this.state.qua)
                formatEnd.add(1, "hours")
                const start = new Date(this.state.qua);
                const end = new Date(formatEnd);
                const { calendar } = scheduleData;
                const { sala } = scheduleData;
                const schedule = {
                    id: String(Math.random()),
                    title: scheduleData[1],
                    isAllDay: scheduleData.isAllDay,
                    start: start,
                    end: end,
                    category: scheduleData.isAllDay ? "allday" : "time",
                    dueDateClass: "",
                    location: scheduleData.location,
                    customStyle: 'borderWidth: 6px',
                    raw: {
                        class: "public",

                    },
                    borderColor: scheduleData[2],
                    calendarId: scheduleData[0],
                    salaId: scheduleData,
                    state: scheduleData.state,
                    isVisible: scheduleData.isVisible,
                };

                if (calendar) {
                    schedule.calendarId = calendar.id;
                    schedule.color = calendar.color;
                    schedule.bgColor = calendar.bgColor;
                    //schedule.borderColor = calendar.borderColor;
                }

                axios.post(`${URL}/schedules`, schedule)
                const week = moment(this.state.qua)
                week.add(1, 'weeks')
                this.setState({ qua: new Date(week) })
            }
        }
    }

    async createQui(scheduleData) {
        console.log(scheduleData)
        for (let i = 1; i <= this.state.duracaoPlano; i++) {
            console.log('teste loop' + i)
            for (let e = 1; e <= 4; e++) {
                const formatEnd = moment(await this.state.qui)
                formatEnd.add(1, "hours")
                const start = new Date(this.state.qui);
                const end = new Date(formatEnd);
                const { calendar } = scheduleData;
                const { sala } = scheduleData;
                const schedule = {
                    id: String(Math.random()),
                    title: scheduleData[1],
                    isAllDay: scheduleData.isAllDay,
                    start: start,
                    end: end,
                    category: scheduleData.isAllDay ? "allday" : "time",
                    dueDateClass: "",
                    location: scheduleData.location,
                    customStyle: 'borderWidth: 6px',
                    raw: {
                        class: "public",

                    },
                    borderColor: scheduleData[2],
                    calendarId: scheduleData[0],
                    salaId: scheduleData,
                    state: scheduleData.state,
                    isVisible: scheduleData.isVisible,
                };

                if (calendar) {
                    schedule.calendarId = calendar.id;
                    schedule.color = calendar.color;
                    schedule.bgColor = calendar.bgColor;
                    //schedule.borderColor = calendar.borderColor;
                }

                axios.post(`${URL}/schedules`, schedule)
                const week = moment(this.state.qui)
                week.add(1, 'weeks')
                this.setState({ qui: new Date(week) })
            }
        }
    }

    async createSex(scheduleData) {
        console.log(scheduleData)
        for (let i = 1; i <= this.state.duracaoPlano; i++) {
            console.log('teste loop' + i)
            for (let e = 1; e <= 4; e++) {
                const formatEnd = moment(await this.state.sex)
                formatEnd.add(1, "hours")
                const start = new Date(this.state.sex);
                const end = new Date(formatEnd);
                const { calendar } = scheduleData;
                const { sala } = scheduleData;
                const schedule = {
                    id: String(Math.random()),
                    title: scheduleData[1],
                    isAllDay: scheduleData.isAllDay,
                    start: start,
                    end: end,
                    category: scheduleData.isAllDay ? "allday" : "time",
                    dueDateClass: "",
                    location: scheduleData.location,
                    customStyle: 'borderWidth: 6px',
                    raw: {
                        class: "public",

                    },
                    borderColor: scheduleData[2],
                    calendarId: scheduleData[0],
                    salaId: scheduleData,
                    state: scheduleData.state,
                    isVisible: scheduleData.isVisible,
                };

                if (calendar) {
                    schedule.calendarId = calendar.id;
                    schedule.color = calendar.color;
                    schedule.bgColor = calendar.bgColor;
                    //schedule.borderColor = calendar.borderColor;
                }
                axios.post(`${URL}/schedules`, schedule)
                const week = moment(this.state.sex)
                week.add(1, 'weeks')
                this.setState({ sex: new Date(week) })
            }
        }
    }

    async createSab(scheduleData) {
        console.log(scheduleData)
        for (let i = 1; i <= this.state.duracaoPlano; i++) {
            console.log('teste loop' + i)
            for (let e = 1; e <= 4; e++) {
                const formatEnd = moment(await this.state.sab)
                formatEnd.add(1, "hours")
                const start = new Date(this.state.sab);
                const end = new Date(formatEnd);
                const { calendar } = scheduleData;
                const { sala } = scheduleData;
                const schedule = {
                    id: String(Math.random()),
                    title: scheduleData[1],
                    isAllDay: scheduleData.isAllDay,
                    start: start,
                    end: end,
                    category: scheduleData.isAllDay ? "allday" : "time",
                    dueDateClass: "",
                    location: scheduleData.location,
                    customStyle: 'borderWidth: 6px',
                    raw: {
                        class: "public",

                    },
                    borderColor: scheduleData[2],
                    calendarId: scheduleData[0],
                    salaId: scheduleData,
                    state: scheduleData.state,
                    isVisible: scheduleData.isVisible,
                };

                if (calendar) {
                    schedule.calendarId = calendar.id;
                    schedule.color = calendar.color;
                    schedule.bgColor = calendar.bgColor;
                    //schedule.borderColor = calendar.borderColor;
                }

                axios.post(`${URL}/schedules`, schedule)

                const week = moment(this.state.sab)
                week.add(1, 'weeks')
                this.setState({ sab: new Date(week) })
            }
        }
    }


    async changeInicioPlano(date) {
        this.setState({ inicioPlano: await date })

        const data = new Date(date)
        data.setMonth(data.getMonth() + this.state.duracaoPlano)

        const formatDateEnd = new Intl.DateTimeFormat("pt-br", {
            year: "numeric",
            month: "long",
            day: "2-digit",

        }).format(data)

        const formatDateStart = new Intl.DateTimeFormat("pt-br", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date)


        this.setState({ fimPlano: data })
        this.props.change("fimPlano", formatDateEnd)
        this.props.change("inicioPlano", formatDateStart)


    }

    async changeProf(event) {
        const profId = await axios.get(`${URL}/profissionais/${event.target.value}`)

        this.setState({ profByID: profId.data })
        this.setState({ profName: this.state.profByID.id })
        console.log('prof: ' + this.state.profName)

    }

    async changeAluno(event) {
        const alunoId = await axios.get(`${URL}/alunos/${event.target.value}`)
        this.setState({ alunoById: alunoId.data })

        this.setState({ alunoName: this.state.alunoById.nome })

        console.log('aluno nome: ' + this.state.alunoName)
    }

    async changeSala(event) {
        const salasID = await axios.get(`${URL}/salas/${event.target.value}`)
        this.setState({ salasById: salasID.data })


        this.setState({ salaName: this.state.salasById.borderColor })

        console.log('Sala :' + this.state.salaName)
    }

    handleChange() {

        //this.props.change('id', this.state.id)
        //this.props.change("borderColor", this.state.background)
        this.props.change("studio", this.props.user.studio)
        this.props.change("plano", this.state.planoName)
        this.props.change("profissional", this.state.profByID.name)
        this.props.change("sala", this.state.salasById.name)
        this.props.change("aluno", this.state.alunoById.nome)
        this.props.init
    }

    alunosList() {
        const filterAlunos = this.state.alunosMongo
            .filter((element) => element.ativo === 1)

        return filterAlunos.map((el) => (
            <option value={el._id}>{el.nome}</option>
        ))
    }

    planoslist() {
        return this.state.planosMongo.map((el) => (
            <option value={el._id}>{el.name}</option>
        ))
    }

    profList() {
        const filterProf = this.state.profMongo
            .filter((element) => element.ativo === 1)

        return filterProf.map((el) => (
            <option value={el._id}>{el.name}</option>
        ))
    }

    salaList() {
        const salas = this.state.salasMongo
        return salas.map((el) => (
            <option value={el._id}>{el.name}</option>
        ))
    }
    hoursList() {
        const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0]
        return number.map((nu) => (
            <option value={nu}>{nu}:00h</option>
        ))
    }

    render() {
        const { inicioPlano, start1, start2, start3, start4, start5, start6, start7, cont, vezesSemana, disabled, alunoName, profName, salaName, dom, seg, ter, qua, qui, sex, sab } = this.state
        const { handleSubmit, readOnly } = this.props
        return (

            <div>
                <form role='form' onSubmit={handleSubmit}>
                    <div>

                        <Field name="alunoId" component={SelectInput} label='Aluno' cols='12 4' readOnly={readOnly} onChange={(value) => this.changeAluno(value)}>
                            <option value=""> Selecione o Aluno</option>
                            {this.alunosList()}
                        </Field>

                        <Field name='planoId' component={SelectInput} label='Plano' cols='12 4' readOnly={readOnly} onChange={(value) => this.changePlano(value)}>
                            <option value="">Selecione o Plano</option>
                            {this.planoslist()}
                        </Field>
                        <Field name='profissionalId' component={SelectInput} label='Profissional' cols='12 4' readOnly={readOnly} onChange={(value) => this.changeProf(value)}>
                            <option value="">Selecione o Profissional</option>
                            {this.profList()}
                        </Field>

                        <Field name='salaId' component={SelectInput} label='Sala' cols='12' readOnly={readOnly} onChange={(value) => this.changeSala(value)}>
                            <option value="">Selecione a Sala</option>
                            {this.salaList()}
                        </Field>

                        <Field type='hidden' name='studio' component={LabelAndInput} />
                        <Field type='hidden' name='aluno' component={LabelAndInput} />
                        <Field type='hidden' name='plano' component={LabelAndInput} />
                        <Field type='hidden' name='profissional' component={LabelAndInput} />
                        <Field type='hidden' name='sala' component={LabelAndInput} />
                        <hr />
                        <div style={{ display: 'flex', marginTop: '-100px', alignItems: 'start' }}>

                            <div>
                                <label>Selecione a data do inicio do plano</label>
                                <DatePicker selected={inicioPlano} placeholderText='Inicio Plano' onChange={(event) => this.changeInicioPlano(event)} dateFormat={'dd/MM/yyyy'} />
                            </div>

                            <Field label='Inicio do Plano' name='inicioPlano' readOnly={true} component={LabelAndInput} cols='12 6' />
                            <Field label='Fim do Plano' name='fimPlano' readOnly={true} component={LabelAndInput} cols='12 6' />

                        </div>

                    </div>

                    <label style={{ marginTop: '6px' }} htmlFor="">Selecione os dias e os horarios !!!</label>
                    <div className='weekBox'>

                        <div className='weekDivs' >
                            <label style={{ marginBottom: '-8px' }} htmlFor="">dom</label>
                            <input type="checkbox" checked={start1} onClick={(e) => this.domingo(e)} />

                            <select type="select" hidden={dom != null ? false : true} className='hoursWeek' onChange={(value) => this.domingoHour(value)} >
                                {this.hoursList()}
                            </select>
                        </div>

                        <div className='weekDivs'>
                            <label style={{ marginBottom: '-8px' }} htmlFor="">Seg</label>
                            <input type="checkbox" checked={start2} onClick={(e) => this.segunda(e)} />

                            <select type="select" hidden={seg != null ? false : true} className='hoursWeek' onChange={(value) => this.segundaHour(value)}>
                                {this.hoursList()}
                            </select>
                        </div >

                        <div className='weekDivs'>
                            <label style={{ marginBottom: '-8px' }} htmlFor="">Ter</label>
                            <input type="checkbox" checked={start3} onClick={(e) => this.terça(e)} />

                            <select type="select" hidden={ter != null ? false : true} className='hoursWeek' onChange={(value) => this.terçaHour(value)}>
                                {this.hoursList()}
                            </select>
                        </div>

                        <div className='weekDivs'>
                            <label style={{ marginBottom: '-8px' }} htmlFor="">Qua</label>
                            <input type="checkbox" checked={start4} onClick={(e) => this.quarta(e)} />

                            <select type="select" hidden={qua != null ? false : true} className='hoursWeek' onChange={(value) => this.quartaHour(value)}>
                                {this.hoursList()}
                            </select>
                        </div>

                        <div className='weekDivs'>
                            <label style={{ marginBottom: '-8px' }} htmlFor="">Qui</label>
                            <input type="checkbox" checked={start5} onClick={(e) => this.quinta(e)} />

                            <select type="select" hidden={qui != null ? false : true} className='hoursWeek' onChange={(value) => this.quintaHour(value)}>
                                {this.hoursList()}
                            </select>
                        </div>

                        <div className='weekDivs'>
                            <label style={{ marginBottom: '-8px' }} htmlFor="">Sex</label>
                            <input type="checkbox" checked={start6} onClick={(e) => this.sexta(e)} />

                            <select type="select" hidden={sex != null ? false : true} className='hoursWeek' onChange={(value) => this.sextaHour(value)}>
                                {this.hoursList()}
                            </select>
                        </div>

                        <div className='weekDivs'>
                            <label style={{ marginBottom: '-8px' }} htmlFor="">Sab</label>
                            <input type="checkbox" checked={start7} onClick={(e) => this.sabado(e)} />

                            <select type="select" hidden={sab != null ? false : true} className='hoursWeek' onChange={(value) => this.sabadoHour(value)}>
                                {this.hoursList()}
                            </select>
                        </div>

                        <div style={{ marginLeft: '50px', marginTop: '15px' }}>
                            {cont > vezesSemana ?
                                <div className="callout callout-danger">
                                    <h4>Vezes na semana maior do que cadastrado no plano</h4>
                                    <p>selecione outro plano ou selecione dias igual há: {vezesSemana}x</p>
                                </div>
                                // <p className='text-red'> <strong>vezes na semana maior do que cadatrado no plano selecione outro plano ou selecione dias igual há: {vezesSemana}x</strong></p>
                                :
                                []}

                            {cont < vezesSemana ?
                                //  <p className='text-yellow'>vezes na semana menor do que cadatrado no plano selecione outro plano ou selecione dias igual há: {vezesSemana}x</p>
                                <div className="callout callout-warning">
                                    <h4>Vezes na semana menor do que cadatrado no plano</h4>
                                    <p>elecione outro plano ou selecione dias igual há: {vezesSemana}x.</p>
                                </div>
                                : []}
                        </div>

                    </div>
                    <div>
                    {/* <ItemList cols='12 6' list={credito} readOnly={readOnly}
                        field='credito' legend='Créditos' showStatus={true} />

                    <ItemList cols='12 6' list={debito} readOnly={readOnly}
                        field='debito' legend='Débitos' showStatus={true} /> */}
                    </div>

                    {/* <div className='weekBox'>
                        <div className='weekDivs'>
                            

                        </div>
                        <div className='weekDivs'>
                            <select type="select" >

                            </select>

                        </div>
                        <div className='weekDivs'>
                            <select type="select" >

                            </select>

                        </div>
                        <div className='weekDivs'>
                            <select type="select" >

                            </select>

                        </div>
                        <div className='weekDivs'>
                            <select type="select" >

                            </select>

                        </div>
                        <div className='weekDivs'>
                            <select type="select" >

                            </select>

                        </div>
                        <div className='weekDivs'>
                            <select type="select" >

                            </select>

                        </div>
                    </div> */}

                    <div className='box-footer'>
                        <button
                           // disabled={this.state.cont != vezesSemana || this.state.duracaoPlano === 0 ? true : false}
                            type='submit'
                            className={`btn ${this.props.submitClass}`}
                            onClick={(scheduleData) => this.centralWeeks(scheduleData = [profName, alunoName, salaName])}

                        >
                            {this.props.submitLabel}
                        </button>

                        <button type='button' className='btn btn-danger' onClick={this.props.init}>Cancelar</button>
                        
                    </div>

                </form>
            </div>
        )
    }
}
CadastroMatriculaForm = reduxForm({ form: 'cadastroMatriculaForm', destroyOnUnmount: false })(CadastroMatriculaForm)
const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroMatriculaForm)