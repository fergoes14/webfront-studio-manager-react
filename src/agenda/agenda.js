import React, { Component, createRef, useCallback } from 'react'
import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import Calendar from './calendar'
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import 'tui-calendar/dist/tui-calendar.css';
import axios from 'axios';
import myTheme from './myTheme';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'


import ReactModal from 'react-modal';
import { TuiDateRangePicker } from 'tui-date-picker-react'
import { convertCompilerOptionsFromJson } from 'typescript';


const URL = 'https://backend-studio-react.herokuapp.com'
class Agenda extends Component {

    ref = React.createRef();
    calendarInst = null;

    constructor(props) {
        super(props)
        this.state = {
            teste: null,
            open: false,

            showModal: false,
            showDetailModal: false,

            checkedCalendars: [],
            calendarMongo: [],
            calendarId: '',
            calendarById: [],
            calendarName: '',
            checkedSalas: [],
            salasMongo: [],
            salas: '',
            filterSchedules: [],
            schedulesMongo: [],
            location: '',
            schedulesFilter: [],
            scheduleId: '',
            scheduleTitle: '',
            scheduleColor: '',
            scheduleId: '',
            alunosMongo: [],
            dateRange: '',
            view: 'week',
            modal: false,
            event: null,
            bgShow: [],
            title: '',
            start: null,
            end: null,
            startDetail: '',
            endDetail: '',
            dateRangePickerRef: null,
            viewModeOptions: [
                {
                    title: 'Mensal',
                    value: 'month'
                },
                {
                    title: 'Semanal',
                    value: 'week'
                },
                {
                    title: 'Diário',
                    value: 'day'
                }
            ],
            options: [
                { value: 'Presença', label: 'Presença' },
                { value: 'Falta', label: 'Falta' },

            ]
        }

        this.onClickNavi = this.onClickNavi.bind(this)
        this.onChangeSelect = this.onChangeSelect.bind(this)
        //this.filterColor = this.filterColor.bind(this)

        this.handleCheckChildElement = this.handleCheckChildElement.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
        this.handleStart = this.handleStart.bind(this)
        this.handleEnd = this.handleEnd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)

    }

    setRenderRangeText() {
        const view = this.calendarInst.getViewName();
        const calDate = this.calendarInst.getDate();
        const rangeStart = this.calendarInst.getDateRangeStart();
        const rangeEnd = this.calendarInst.getDateRangeEnd();
        let year = calDate.getFullYear();
        let month = calDate.getMonth() + 1;
        let date = calDate.getDate();
        let dateRangeText = '';
        let endMonth, endDate, start, end;

        switch (view) {
            case 'month':
                dateRangeText = `${year}-${month}`;
                break;
            case 'week':
                year = rangeStart.getFullYear();
                month = rangeStart.getMonth() + 1;
                date = rangeStart.getDate();
                endMonth = rangeEnd.getMonth() + 1;
                endDate = rangeEnd.getDate();

                start = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
                end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${endDate < 10 ? '0' : ''
                    }${endDate}`;
                dateRangeText = `${start} ~ ${end}`;
                break;
            default:
                dateRangeText = `${year}-${month}-${date}`;
        }

        this.setState({ dateRange: dateRangeText });
    }


    calendarRef = React.createRef();

    async componentDidMount() {

        const scheduleData = await axios.get(`${URL}/schedules`)
        const calendarData = await axios.get(`${URL}/profissionais`)
        const alunosData = await axios.get(`${URL}/alunos`)
        const salasData = await axios.get(`${URL}/salas`)
        this.calendarInst = this.ref.current.getInstance();
        this.setState({ view: this.props.view });
        this.setRenderRangeText();
        this.calendarInst.createSchedules();
        this.setState({ salasMongo: salasData.data })
        this.setState({ schedulesMongo: scheduleData.data })
        this.setState({ calendarMongo: calendarData.data })
        this.setState({ alunosMongo: alunosData.data })
        console.log('schedulesMongo' + this.state.schedulesMongo)
        this.calendarInst.createSchedules(scheduleData);
        this.state.calendarMongo.forEach(element => console.log(element.name));

        this.setState({ checkedCalendars: this.state.calendarMongo.map((element) => ({ ...element, isChecked: true })) })
        this.setState({ checkedSalas: this.state.salasMongo.map((element) => ({ ...element, isChecked: true })) })

        console.log('salas' + JSON.stringify(this.state.checkedSalas))

        this.setState({ start: new Date() })
        this.setState({ end: new Date() })

    }



    handleAllChecked(event) {
        const cloneCheckedCalendars = [...this.state.checkedCalendars];
        cloneCheckedCalendars.forEach(
            (element) => (element.isChecked = event.target.checked)
        );

        const cloneCheckedsalas = [...this.state.checkedSalas];
        cloneCheckedsalas.forEach(
            (element) => (element.isChecked = event.target.checked)
        );


        this.setState({ checkedCalendars: cloneCheckedCalendars })
        this.setState({ checkedSalas: cloneCheckedsalas })
        this.filterCalendar(cloneCheckedCalendars);
        this.filterCalendar(cloneCheckedsalas);
    };

    handleCheckChildSalas(event) {

        const cloneCheckedSalas = [...this.state.checkedSalas];
        cloneCheckedSalas.forEach((element) => {
            if (element.id === event.target.value)
                element.isChecked = event.target.checked;

        });
        this.setState({ checkedSalas: cloneCheckedSalas });
        this.filterCalendar(cloneCheckedSalas);

    };

    handleCheckChildElement(event) {

        const cloneCheckedCalendars = [...this.state.checkedCalendars];
        cloneCheckedCalendars.forEach((element) => {
            if (element.id === event.target.value)
                element.isChecked = event.target.checked;
        });

        this.setState({ checkedCalendars: cloneCheckedCalendars });
        this.filterCalendar(cloneCheckedCalendars);

    };



    async filterCalendar(cloneCheckedCalendars) {

        console.log(cloneCheckedCalendars[0].title)
        const scheduleData = await axios.get(`${URL}/schedules`)
        this.setState({ schedulesMongo: scheduleData.data })

        //CALENDARIO 
        const filterCalendars = (cloneCheckedCalendars[0].title == 'prof' ? cloneCheckedCalendars : this.state.checkedCalendars)
            .filter((element) => element.isChecked === false)
            .map((item) => item.id);

        const cloneSchedules = this.state.schedulesMongo.filter((element) => {
            return filterCalendars.indexOf(element.calendarId) === -1;
        })

        this.setState({ schedulesMongo: cloneSchedules })


        //SALAS
        const filterSalas = (cloneCheckedCalendars[0].title == 'Salas' ? cloneCheckedCalendars : this.state.checkedSalas)
            .filter((element) => element.isChecked === false)
            .map((item) => item.borderColor);

        const cloneSchedulesSalas = this.state.schedulesMongo.filter((element) => {
            return filterSalas.indexOf(element.borderColor) === -1;
        })

        this.setState({ schedulesMongo: cloneSchedulesSalas })

    };








    onClickDayname(res) {
        // view : week, day

        //console.group('onClickDayname');
        // console.log(res.date);
        //console.groupEnd();
    }

    onAfterRenderSchedule(res) {
        ////console.group('onAfterRenderSchedule');
        //console.log('Schedule Info : ', res.schedule);
        //console.groupEnd();
    }


    onClickSchedule(res) {

        this.setState({ scheduleTitle: res.schedule.title })
        this.setState({ scheduleColor: res.schedule.bgColor })
        this.setState({ startDetail: new Date(res.schedule.start) })
        this.setState({ endDetail: new Date(res.schedule.end) })

        this.setState({ calendarId: res.schedule.calendarId })
        this.setState({ scheduleId: res.schedule.id })
        this.setState({ location: res.schedule.location })

        this.handleOpenDetailModal(true)

        console.log("schedule id" + this.state.calendarId)
        console.log("schedule id" + this.state.scheduleId)

        console.log('Schedule Info : ', res.schedule.id);
        console.log('Schedule Info : ', new Date(res.schedule.start));
        console.log('Schedule Info : ', res.schedule);

        console.groupEnd();

    }

    handleOpenModal(event) {
        this.setState({ showModal: event });
    }
    handleOpenDetailModal(event) {
        this.setState({ showDetailModal: event });
    }
    onClickTimezonesCollapseBtn(timezonesCollapsed) {
        // view : week, day
        console.group('onClickTimezonesCollapseBtn');
        console.log('Is Collapsed Timezone? ', timezonesCollapsed);
        console.groupEnd();

        const theme = {};
        if (timezonesCollapsed) {
            theme['week.daygridLeft.width'] = '200px';
            theme['week.timegridLeft.width'] = '200px';
        } else {
            theme['week.daygridLeft.width'] = '100px';
            theme['week.timegridLeft.width'] = '100px';
        }

        this.calendarInst.setTheme(theme);
    }

    onChangeSelect(ev) {
        this.setState({ view: ev.target.value });
        this.setRenderRangeText();
    }

    onClickNavi(event) {
        if (event.target.tagName === 'BUTTON') {
            const { target } = event;
            let action = target.dataset ? target.dataset.action : target.getAttribute('data-action');
            action = action.replace('move-', '');

            this.calendarInst[action]();
            this.setRenderRangeText();

        }
    }

    handleClickNextButton = () => {
        const calendarInstance = this.calendarRef.current.getInstance();

        calendarInstance.next();
    };
    onBeforeDeleteSchedule() {
        //console.group('onBeforeDeleteSchedule');
        //console.log('Schedule Info : ', res.schedule);
        //console.groupEnd();

        axios.delete(`${URL}/schedules/${this.state.scheduleId}`)
        this.calendarInst.deleteSchedule(this.state.scheduleId, this.state.calendarId);
    }
    onBeforeUpdateSchedule(event) {
        const start = new Date(event.start);
        const end = new Date(event.end);

        const { calendar } = event;
        const { schedule } = event;
        const changes = {
            id: event.id,
            title: event.title,
            isAllDay: event.isAllDay,
            start: start,
            end: end,
            category: event.isAllDay ? "allday" : "time",
            dueDateClass: "",
            location: event.location,
            raw: {
                class: "public"
            },
            calendarId: event.calendarId,
            state: event.state,
        }
        if (calendar) {
            changes.calendarId = calendar.id;
            changes.color = calendar.color;
            changes.bgColor = calendar.bgColor;
            changes.borderColor = calendar.borderColor;
        }

        console.log("event" + JSON.stringify(schedule))
        this.calendarInst.updateSchedule(schedule.id, schedule.calendarId, changes);
        axios.put(`${URL}/schedules/${schedule.id}`, changes)
    }

    onBeforeUpdateScheduleState(event) {



        const { calendar } = event;
        const { schedule } = event;
        const changes = {

            location: event[0],

        }
        if (calendar) {
            changes.calendarId = calendar.id;
            changes.color = calendar.color;
            changes.bgColor = calendar.bgColor;

        }

        console.log("event" + JSON.stringify(schedule))
        this.calendarInst.updateSchedule(event[2], event[1], changes);
        axios.put(`${URL}/schedules/${event[2]}`, changes)
    }

    hancleCreateSchedule(scheduleData) {

        // const start = new Date(scheduleData.start);
        // const end = new Date(scheduleData.end);
        const { calendar } = scheduleData;
        const { sala } = scheduleData;
        const schedule = {
            id: String(Math.random()),
            title: scheduleData[2],
            isAllDay: scheduleData.isAllDay,
            start: scheduleData[0],
            end: scheduleData[1],
            category: scheduleData.isAllDay ? "allday" : "time",
            dueDateClass: "",
            location: ".",
            customStyle: 'borderWidth: 6px',
            raw: {
                class: "public",

            },
            body:
                'Fernando'
            ,

            borderColor: scheduleData[4],
            calendarId: scheduleData[3],
            salaId: scheduleData[5],
            state: scheduleData.state,
            isVisible: scheduleData.isVisible,
        };

        if (calendar) {
            schedule.calendarId = calendar.id;
            schedule.color = calendar.color;
            schedule.bgColor = calendar.bgColor;
            schedule.name = calendar.name
            //schedule.borderColor = calendar.borderColor;
        }



        axios.post(`${URL}/schedules`, schedule)
        this.calendarInst.createSchedules([schedule]);

    }

    changeMethodMonth() {
        this.setState({ method: 'month' })
    }
    onBeforeCreateSchedule(event) {
        this.handleOpenModal(true)
        this.setState({ start: event.start.toDate() })
        this.setState({ end: event.end.toDate() })

    }


    renderRows() {
        const list = this.state.checkedCalendars || []
        return list.map((ca) => (
            <tr key={ca._id}>
                <td>
                    <label>
                        <input
                            type="checkbox"
                            className="tui-full-calendar-checkbox-round"
                            defaultValue={ca.id}
                            checked={ca.isChecked}
                            onChange={(e) => this.handleCheckChildElement(e)}
                        />
                        <span
                            style={{
                                borderColor: ca.bgColor,
                                backgroundColor: ca.isChecked
                                    ? ca.bgColor
                                    : "transparent"
                            }}
                        />
                    </label>

                </td>
                <td>{ca.name}</td>
            </tr>
        ))
    }

    renderSalas() {
        const list = this.state.checkedSalas || []
        return list.map((ca) => (
            <tr key={ca._id}>
                <td>
                    <label>
                        <input
                            type="checkbox"
                            className="tui-full-calendar-checkbox-round"
                            defaultValue={ca.id}
                            checked={ca.isChecked}
                            onChange={(e) => this.handleCheckChildSalas(e)}
                        />
                        <span
                            style={{
                                borderColor: ca.borderColor,
                                backgroundColor: ca.isChecked
                                    ? ca.borderColor
                                    : "transparent"
                            }}
                        />
                    </label>

                </td>
                <td>{ca.name}</td>
            </tr>
        ))
    }

    calendarSelect() {
        const calendars = this.state.checkedCalendars || []
        return calendars.map((ca) => (

            <option value={ca._id}>{ca.name}</option>
        ))
    }
    salasSelect() {
        const salas = this.state.salasMongo || []
        return salas.map((ca) => (

            <option value={ca.borderColor}>{ca.name}</option>
        ))
    }

    alunosSelect() {
        const alunos = this.state.alunosMongo || []
        return alunos.map((ca) => (
            
            <option value={ca.nome}>{ca.nome}</option>
        ))
    }


    async handleTitle(event) {
        this.setState({ title: await event.target.value })
        console.log(this.state.title)
    }

    async handleStart(date) {
        this.setState({ start: await date })
        console.log(this.state.start)
    }

    async handleEnd(date) {
        this.setState({ end: await date })
        console.log(this.state.end)
    }

    async handleCalendar(event) {
        const profId = await axios.get(`${URL}/profissionais/${await event.target.value}`)
        this.setState({ calendarById: profId.data })
        this.setState({ calendarId: this.state.calendarById.id })
        this.setState({ calendarName: this.state.calendarById.name })
        console.log(this.state.calendarId)
    }

    async handleSalas(event) {
        this.setState({ salas: await event.target.value })
        console.log(this.state.salas)
    }

    async handleLocation(event) {
        this.setState({ location: await event.target.value })

    }


    handleSubmit(event) {
        console.log(event)

    }



    render() {
        const { dateRange, view, viewModeOptions, schedulesMongo, salas, calendarMongo, location, calendarName, scheduleId, start, end, title, schedulesFilter, checkedCalendars, checkedSalas, calendarId } = this.state;
        const selectedView = view || this.props.view;
        console.log('teste' + schedulesFilter)
        return (
            <div>
                <Content>
                    <div>
                        <select className='select-calendar' onChange={this.onChangeSelect} value={view}>
                            {viewModeOptions.map((option, index) => (
                                <option className='select-calendar' value={option.value} key={index}>
                                    {option.title}
                                </option>
                            ))}
                        </select>
                        <span>
                            <button
                                type="button"
                                className="btn btn-default btn-sm move-today button-calendar"
                                data-action="move-today"
                                onClick={this.onClickNavi}
                            >
                                Today
                            </button>
                            <button
                                type="button"
                                className="btn btn-default btn-sm move-day button-calendar"
                                data-action="move-prev"
                                onClick={this.onClickNavi}
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                className="btn btn-default btn-sm move-day button-calendar"
                                data-action="move-next"
                                onClick={this.onClickNavi}
                            >
                                Next
                            </button>
                        </span>
                        <span className="render-range"> <strong>* {dateRange} *</strong> </span>
                    </div>

                    <div id="top">

                    </div>
                    <div className='container-color-picker'>


                        <div id="lnb" style={{ flex: 1, backgroundColor: '#fffafa', borderRight: '1px solid black', paddingTop: '10px' }}>
                            <div className="lnb-new-schedule" style={{ marginRight: '10px' }}>
                                <button onClick={() => this.handleOpenModal(true)} id="btn-new-schedule" type="button" className="btn btn-default btn-block lnb-new-schedule-btn" data-toggle="modal">
                                    Agendar
                                </button>
                            </div>
                            <div id="lnb-calendars" className="lnb-calendars">
                                <div>
                                    <div style={{ marginLeft: '20px', marginTop: '20px' }} className="lnb-calendars-item">
                                        <label >

                                            <input
                                                className="tui-full-calendar-checkbox-square"
                                                type="checkbox"
                                                defaultValue="all"
                                                checked={
                                                    checkedCalendars.every((element) => element.isChecked)
                                                    &&
                                                    checkedSalas.every((element) => element.isChecked) === true
                                                }
                                                onChange={(event) => this.handleAllChecked(event)}
                                            />
                                            <span />
                                            <strong>Mostrar Todos</strong>

                                        </label>
                                    </div>
                                </div>

                                <div id="calendarList" className="lnb-calendars-d1 dataTables_wrapper form-inline dt-bootstrap">
                                    <table className='table'>
                                        <thead>
                                            <tr>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderRows()}
                                        </tbody>

                                    </table>
                                </div>

                                <hr />


                                <div>
                                    <h3 style={{ fontSize: '20px', textAlign: 'center' }}>Salas</h3>
                                </div>

                                <div id="calendarList" className="lnb-calendars-d1 dataTables_wrapper form-inline dt-bootstrap">
                                    <table className='table'>
                                        <thead>
                                            <tr>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderSalas()}
                                        </tbody>

                                    </table>
                                </div>

                            </div>

                        </div>

                        <div style={{ flex: 7 }}>

                            <ReactModal
                                isOpen={this.state.showDetailModal}
                                contentLabel="Minimal Modal Example"
                                className="ModalDetailCalendar  "
                                overlayClassName="Overlay"
                                centered
                                style={{ border: '1px solid red', }}

                            >
                                <div display={{ display: 'flex' }}>
                                    <button onClick={() => this.handleOpenDetailModal(false)}
                                        className="tui-full-calendar-button tui-full-calendar-popup-close">
                                        <span className="tui-full-calendar-icon tui-full-calendar-ic-close" />
                                    </button>
                                    <div>
                                        <h3>{this.state.scheduleTitle}</h3>
                                        <hr style={{
                                            marginTop: '-10px',
                                            borderWidth: '3px',
                                            borderColor: this.state.scheduleColor,

                                        }} />
                                    </div>

                                    <div style={{ display: 'flex', alignContent: 'center' }}>





                                        {/* <div style={{width:'25px', height:'25px'}} className='icon'>
                                            <i  className='fa fa-thumbs-o-up'></i>

                                        </div> */}
                                        <div className={location === "Presença" ? "info-box bg-green" : location === 'Falta' ? "info-box bg-red" : location === 'Desmarcado' ? "info-box bg-yellow" : "info-box bg-aqua"} style={{ height: '90px' }}>

                                            <span className="info-box-icon">
                                                <i className={location === 'Presença' ? "fa fa-thumbs-o-up" : location === 'Falta' ? "fa fa-thumbs-o-down" : location === 'Desmarcado' ? "fa fa-calendar-times-o" : 'fa fa-refresh'}></i></span>
                                            <div className="info-box-content">

                                                <select className='form-control' onChange={(value) => this.handleLocation(value)}>
                                                    <option value='.'>select...</option>
                                                    <option value='Presença'>Presença</option>
                                                    <option value='Falta'>Falta</option>
                                                    <option value='Desmarcado'>Desmarcado</option>
                                                </select>

                                                {/* <span className="info-box-text">{location}</span> */}
                                                <span className="info-box-number">{location}</span>

                                                {/* <span className="progress-description">
                                                {location}
                                                </span>  */}
                                            </div>

                                        </div>

                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <p>
                                            {new Intl.DateTimeFormat("pt-br", {
                                                year: "numeric",
                                                month: "long",
                                                day: "2-digit",
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            }).format(this.state.startDetail)}
                                        </p>
                                        <div style={{ marginLeft: '5px', marginRight: '5px' }}>
                                            -
                                        </div>
                                        <p>
                                            {new Intl.DateTimeFormat("en-GB", {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            }).format(this.state.endDetail)}
                                        </p>
                                    </div>
                                    <div className="tui-full-calendar-section-button-save" style={{ marginTop: '30px' }}>
                                        <button
                                            onClick={() => this.onBeforeDeleteSchedule(this.handleOpenDetailModal(false))}
                                            className="tui-full-calendar-button tui-full-calendar-confirm tui-full-calendar-popup-save"
                                        >
                                            <span>delete</span>
                                        </button>

                                        <button
                                            style={{ marginRight: '66px', backgroundColor: "#00a4ff" }}
                                            onClick={(scheduleData) => this.onBeforeUpdateScheduleState(scheduleData = [location, calendarId, scheduleId], this.handleOpenDetailModal(false))}
                                            className="tui-full-calendar-button tui-full-calendar-confirm tui-full-calendar-popup-save"
                                        >
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </div>
                            </ReactModal>

                            <ReactModal
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                                className="ModalCalendar  "
                                overlayClassName="Overlay"
                                centered
                                style={{ width: '600px', height: '600px' }}

                            >
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <button onClick={() => this.handleOpenModal(false)}
                                            className="tui-full-calendar-button tui-full-calendar-popup-close"
                                        >

                                            <span className="tui-full-calendar-icon tui-full-calendar-ic-close" />
                                        </button>

                                        <select className=" form-control" style={{ width: '200px' }} onChange={(value) => this.handleCalendar(value)}>
                                            <option value='calendario'>Profissional</option>
                                            {this.calendarSelect()}
                                        </select>

                                        <select className=" form-control" style={{ width: '200px', marginLeft: '10px' }} onChange={(value) => this.handleSalas(value)}>
                                            <option>Salas</option>
                                            {this.salasSelect()}
                                        </select>
                                    </div>

                                    <div className="tui-full-calendar-popup-section" style={{ marginTop: '10px' }}>

                                        {/* <label htmlFor='title'>
                                                <input
                                                    name='title'
                                                    id='title'
                                                    // ref={subjectRef}
                                                    type="text"
                                                    //style={{ width: '350px' }}
                                                    //id="tui-full-calendar-schedule-title"
                                                    className="tui-full-calendar-content"
                                                    placeholder="Subject"
                                                    value={this.state.title}
                                                    onChange={this.handleTitle}
                                                />
                                            </label> */}
                                        <select className=" form-control" onChange={(value) => this.handleTitle(value)}>
                                            <option>Aluno</option>
                                            <option value='LIVRE'>LIVRE</option>
                                            {this.alunosSelect()}
                                        </select>


                                    </div>
                                    <span className="tui-full-calendar-section-date-dash">-</span>

                                    <div style={{ display: 'flex' }}>

                                        <DatePicker selected={this.state.start} showTimeSelect dateFormat="Pp" onChange={(date) => this.handleStart(date)} />
                                        <div style={{ marginLeft: '5px', marginRight: '5px' }}>
                                            -
                                        </div>
                                        <DatePicker selected={this.state.end} showTimeSelect dateFormat="Pp" onChange={(date) => this.handleEnd(date)} />

                                        <div className="tui-full-calendar-section-button-save">
                                            <button

                                                onClick={(scheduleData) => this.hancleCreateSchedule(scheduleData = [start, end, title, calendarId, salas, calendarName], this.handleOpenModal(false))}
                                                //  onClick={() => {
                                                //          const event = {

                                                //              title,
                                                //              start,
                                                //              end,

                                                //          };
                                                //          onSubmit(event);
                                                //      }
                                                //  }
                                                className="tui-full-calendar-button tui-full-calendar-confirm tui-full-calendar-popup-save"
                                            >
                                                <span>Save</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </ReactModal>


                            <Calendar
                                template={{
                                    milestone: function (schedule) {
                                        return <span style={{ color: 'red' }}><i className="fa fa-flag"></i>{+ schedule.title}</span>;
                                    },

                                }}
                                usageStatistics={false}
                                calendars={checkedCalendars}
                                schedules={schedulesMongo}
                                week={{
                                    daynames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                                    showTimezoneCollapseButton: true,
                                    timezonesCollapsed: true,
                                    allDayView: true,
                                    hourStart: 0,
                                    hourEnd: 24,
                                }}

                                month={{
                                    daynames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                                    startDayOfWeek: 0,
                                }}
                                showSlidebar={false}
                                disableClick={true}
                                date='date'
                                allDayView={false}
                                taskView={false}
                                scheduleView
                                height='100%'
                                width='100%'
                                view={selectedView}
                                theme={myTheme}
                                useDetailPopup={false}
                                useCreationPopup={false}
                                defaultView="week"
                                disableDblClick={true}
                                isReadOnly={false}
                                ref={this.ref}
                                onAfterRenderSchedule={this.onAfterRenderSchedule.bind(this)}
                                onBeforeDeleteSchedule={this.onBeforeDeleteSchedule.bind(this)}
                                onClickDayname={this.onClickDayname.bind(this)}
                                onClickSchedule={this.onClickSchedule.bind(this)}
                                onClickTimezonesCollapseBtn={this.onClickTimezonesCollapseBtn.bind(this)}
                                onBeforeUpdateSchedule={this.onBeforeUpdateSchedule.bind(this)}
                                onBeforeCreateSchedule={this.onBeforeCreateSchedule.bind(this)}
                                customStyle={{ borderRadius: '15px' }}
                            />
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
}
export default Agenda

