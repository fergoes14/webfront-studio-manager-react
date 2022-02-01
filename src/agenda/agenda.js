import React, { Component, createRef, useCallback } from 'react'
import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import Calendar from './calendar'
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import 'tui-calendar/dist/tui-calendar.css';
import axios from 'axios';
import myTheme from './myTheme';

import ReactModal from 'react-modal';
import { TuiDateRangePicker } from 'tui-date-picker-react'


const URL = 'http://localhost:3000'
class Agenda extends Component {

    ref = React.createRef();
    calendarInst = null;

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            showModal: false,
            checkedCalendars: [],
            filterSchedules: [],
            schedulesMongo: [],
            schedulesFilter: [],
            calendarMongo: [],
            dateRange: '',
            view: 'week',
            modal: false,
            event: null,
            bgShow: [],
            start: null,
            end: null,
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
            ]
        }

        this.onClickNavi = this.onClickNavi.bind(this)
        this.onChangeSelect = this.onChangeSelect.bind(this)
        this.filterColor = this.filterColor.bind(this)
        this.showAll = this.showAll.bind(this)
        this.handleCheckChildElement = this.handleCheckChildElement.bind(this)

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
        this.calendarInst = this.ref.current.getInstance();
        this.setState({ view: this.props.view });
        this.setRenderRangeText();
        this.calendarInst.createSchedules();
        this.setState({ schedulesMongo: scheduleData.data })
        this.setState({ calendarMongo: calendarData.data })
        console.log('schedulesMongo' + this.state.schedulesMongo)
        this.calendarInst.createSchedules(scheduleData);
        this.state.calendarMongo.forEach(element => console.log(element.name));

        this.setState({ checkedCalendars: this.state.calendarMongo.map((element) => ({ ...element, isChecked: true })) })


    }


    changeOpen() {
        this.setState({ open: !this.state.open })
    }
    toggle() {

        // this.setState({modal: !modal});
        this.setState({ event: null })
    }

    async filterColor(event) {

        this.setState({ bgShow: [...this.state.bgShow] = + await event })

        const scheduleFilter = this.state.schedulesMongo.filter(schedulesMongo => schedulesMongo.bgColor != (event));
        this.setState({ schedulesMongo: scheduleFilter })

        console.log('event' + event)
        console.log('schedulesFilter' + this.state.schedulesFilter)
        console.log('bgShow:' + this.state.bgShow)

    }

    handleAllChecked(event) {
        const cloneCheckedCalendars = [...this.state.checkedCalendars];
        cloneCheckedCalendars.forEach(
            (element) => (element.isChecked = event.target.checked)
        );
        this.setState({ checkedCalendars: cloneCheckedCalendars })
        this.filterCalendar(cloneCheckedCalendars);
    };



    handleCheckChildElement(event) {
        console.log('Teste 1')
        const cloneCheckedCalendars = [...this.state.checkedCalendars];
        cloneCheckedCalendars.forEach((element) => {
            if (element.id === event.target.value)
                element.isChecked = event.target.checked;
            console.log('Teste 1')
        });
        this.setState({ checkedCalendars: cloneCheckedCalendars });
        this.filterCalendar(cloneCheckedCalendars);
        console.log('Teste 1')
    };

    async filterCalendar(cloneCheckedCalendars) {
        const scheduleData = await axios.get(`${URL}/schedules`)
        this.setState({ schedulesMongo: scheduleData.data })
        const filterCalendars = cloneCheckedCalendars
            .filter((element) => element.isChecked === false)
            .map((item) => item.id);
        const cloneSchedules = this.state.schedulesMongo.filter((element) => {
            return filterCalendars.indexOf(element.calendarId) === -1;
        });
        this.setState({ schedulesMongo: cloneSchedules })
        // rerender
        // calendarInstRef.current.clear();
        // calendarInstRef.current.createSchedules(cloneSchedules, true);
        // calendarInstRef.current.render();
    };



    showAll(event) {
        this.setState({ bgShow: [] })
        this.componentDidMount(event)
    }

    onClickDayname(res) {
        //  view : week, day
        console.group('onClickDayname');
        console.log(res.date);
        console.groupEnd();
    }

    onAfterRenderSchedule(res) {
        console.group('onAfterRenderSchedule');
        console.log('Schedule Info : ', res.schedule);
        console.groupEnd();
    }

    onBeforeDeleteSchedule(res) {
        console.group('onBeforeDeleteSchedule');
        console.log('Schedule Info : ', res.schedule);
        console.groupEnd();

        const { id, calendarId } = res.schedule;
        axios.delete(`${URL}/schedules/${id}`)
        this.calendarInst.deleteSchedule(id, calendarId);
    }
    onClickSchedule(res) {
        // console.group('onClickSchedule');
        // console.log('MouseEvent : ', res.event);
        // console.log('Calendar Info : ', res.calendar);
        // console.log('Schedule Info : ', res.schedule);
        // console.groupEnd();

    }

    handleOpenModal(event) {
        this.setState({ showModal: event });
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

    changeMethodMonth() {
        this.setState({ method: 'month' })
    }
    onBeforeCreateSchedule() {
        this.handleOpenModal(true)
    }

    hancleCreateSchedule(scheduleData) {

        const start = new Date(scheduleData.start);
        const end = new Date(scheduleData.end);
        const { calendar } = scheduleData;
        const schedule = {
            id: String(Math.random()),
            title: scheduleData.title,
            isAllDay: scheduleData.isAllDay,
            start: start,
            end: end,
            category: scheduleData.isAllDay ? "allday" : "time",
            dueDateClass: "",
            location: scheduleData.location,
            raw: {
                class: "public"
            },
            calendarId: scheduleData.calendarId,
            state: scheduleData.state,
            isVisible: scheduleData.isVisible,
        };

        if (calendar) {
            schedule.calendarId = calendar.id;
            schedule.color = calendar.color;
            schedule.bgColor = calendar.bgColor;
            schedule.borderColor = calendar.borderColor;
        }


        axios.post(`${URL}/schedules`, schedule)
        this.calendarInst.createSchedules([schedule]);

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

    calendarSelect() {
        const calendars = this.state.checkedCalendars || []
        return calendars.map((ca) => (

            <option value={ca.name}>{ca.name}</option>
        ))
    }
    reset() {
        // setCalendarId(calendars[0].id);
        // setAttendeeId(attendees[0].id);
        // setTitle("");
        this.setState({start: new Date()})
        this.setState({end: new Date()})
        // dateRangePickerRef.current.setStartDate(new Date());
        // dateRangePickerRef.current.setEndDate(new Date());
      }




    render() {
        const { dateRange, view, viewModeOptions, schedulesMongo, calendarMongo, schedulesFilter, checkedCalendars } = this.state;
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
                                <button id="btn-new-schedule" type="button" className="btn btn-default btn-block lnb-new-schedule-btn" data-toggle="modal">
                                    New schedule
                                </button>
                            </div>
                            <div id="lnb-calendars" className="lnb-calendars">
                                <div>
                                    <div style={{ marginLeft: '20px', marginTop: '20px' }} className="lnb-calendars-item">
                                        <label>

                                            <input
                                                className="tui-full-calendar-checkbox-square"
                                                type="checkbox"
                                                defaultValue="all"
                                                checked={checkedCalendars.every(
                                                    (element) => element.isChecked === true
                                                )}
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
                            </div>

                        </div>

                        <div style={{ flex: 7 }}>

                            {/* <CustomTuiModal 
                                {...{
                                    isOpen: this.state.modal(),
                                    toggle,
                                    onSubmit:
                                        event.triggerEventName === "mouseup"
                                            ? this.handleCreateSchedule()
                                            : this.handleUpdateSchedule(),
                                    submitText: event.triggerEventName === "mouseup" ? "Save" : "Update",
                                    calendars: formatCalendars,
                                    attendees,
                                    schedule: event.schedule,
                                    startDate: event.start,
                                    endDate: event.end
                                }}
                            /> */}

                            <ReactModal
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                                className="ModalCalendar  "
                                overlayClassName="Overlay"
                                centered
                                style={{ width: '600px', height: '600px' }}
                                toggle={ () =>
                                   this.reset() 
                                }
                            >
                                <div>

                                    <div style={{ display: "flex" }}>

                                        <button onClick={() => this.handleOpenModal(false)}
                                            className="tui-full-calendar-button tui-full-calendar-popup-close"
                                        >

                                            <span className="tui-full-calendar-icon tui-full-calendar-ic-close" />
                                        </button>

                                        <select className=" form-control" style={{ width: '200px' }}>
                                            {this.calendarSelect()}
                                        </select>

                                    </div>
                                    <div className="tui-full-calendar-popup-section" style={{ marginTop: '10px' }}>
                                        <div className="tui-full-calendar-popup-section-item tui-full-calendar-section-location">
                                            <span className="tui-full-calendar-icon tui-full-calendar-ic-title" />
                                            <input
                                                // ref={subjectRef}
                                                style={{ width: '350px' }}
                                                id="tui-full-calendar-schedule-title"
                                                className="tui-full-calendar-content"
                                                placeholder="Subject"
                                            //value={title}
                                            // onChange={(e) => { setTitle(e.target.value);   }}
                                            />
                                        </div>
                                    </div>
                                    <span className="tui-full-calendar-section-date-dash">-</span>

                                    <div className="tui-full-calendar-popup-section" style={{ display: 'flex' }}>
                                         <TuiDateRangePicker
                                            date={new Date()}
                                            start={this.state.start}
                                            end={this.state.end}
                                            format="yyyy/MM/dd HH:mm"
                                            timePicker={{
                                                layoutType: "tab",
                                                inputType: "spinbox"
                                            }}
                                            onChange={(e) => {
                                                this.setState({ start: e[0] })
                                                this.setState({ end: e[1] })
                                                console.log(this.state.start)
                                                console.log(this.state.end)
                                            }}
                                        /> 

                                        <div className="tui-full-calendar-section-button-save">
                                            <button
                                                // onClick={() => {
                                                //     if (!subjectRef.current.value) {
                                                //         subjectRef.current.focus();
                                                //     } else {
                                                //         const event = {
                                                //             calendarId,
                                                //             title,
                                                //             start,
                                                //             end,
                                                //             ...calendars.find((element) => element.id === calendarId)
                                                //         };
                                                //         onSubmit(event);
                                                //     }
                                                // }}
                                                className="tui-full-calendar-button tui-full-calendar-confirm tui-full-calendar-popup-save"
                                            >
                                                <span>Save</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ReactModal>


                            <Calendar
                                usageStatistics={false}
                                calendars={calendarMongo}
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
                                disableClick={false}
                                date='date'
                                allDayView={false}
                                template={false}
                                taskView={false}
                                scheduleView
                                height='100%'
                                width='100%'
                                view={selectedView}
                                theme={myTheme}
                                useDetailPopup={true}
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
                            />
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
}
export default Agenda

