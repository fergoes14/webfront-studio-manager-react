import React from 'react'

export default function TuiCalendar() {

  async function  filterCalendar(cloneCheckedCalendars) {
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

    return (
        <div>

        </div>
    )
}
