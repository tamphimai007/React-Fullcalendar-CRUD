/*
1. ข้อมูลใน mongoDB มี
   - วันที่
   - ข้อมูลอื่นๆๆๆๆๆๆ บลาๆๆๆๆๆๆๆ
2. ต้องการ query ข้อมูล โดยเลือก
   - start
   - end
3. นำข้อมูลที่ได้จากการ query มาแสดงบนปฏิทิน
*/

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick

import moment from "moment";

import { Row, Col, Card, Modal, Tag } from "antd";

// Import Functions
import { queryDate } from "../functions/fullcalendar";

const Index1 = () => {
  const roitaiEl = useRef(null);
  const [value, setValue] = useState({
    datestart: "",
    dateend: "",
  });

  const [event, setEvent] = useState([]);

  const onChangeValue = (e) => {
    // console.log(e.target.value);
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
    queryDate(value)
      .then((res) => {
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          data[i].title = data[i].name;
          data[i].start = data[i].datestart;
        }
        roitaiEl.current._calendarApi.gotoDate(data[0].start);
        setEvent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickLi = (e) =>{
    console.log(e.target.getAttribute("d"))
    const t = e.target.getAttribute("d")
    roitaiEl.current._calendarApi.gotoDate(t);

  }

  return (
    <>
      <Row>
        <Col span={6}>
          <Card>
            {/* Code */}
            <form onSubmit={handleSubmit}>
              <label>Start</label>
              <input type="date" onChange={onChangeValue} name="datestart" />

              <label>End</label>
              <input type="date" onChange={onChangeValue} name="dateend" />

              <button type="submit">Query</button>
            </form>
          </Card>
          {event == 0 ? (
            "ไม่มีข้อมูล"
          ) : (
            <ul>
              {event.map((item, index) => (
                <li 
                key={index} 
                d={item.start}
                onClick={handleClickLi}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </Col>
        <Col span={18}>
          <FullCalendar
            ref={roitaiEl}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={event}
          />
        </Col>
      </Row>
    </>
  );
};

export default Index1;
