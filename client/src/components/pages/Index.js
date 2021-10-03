import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction" // needed for dayClick

import moment from 'moment'

import { Row, Col, Card, Modal, Tag } from 'antd';

// Functions
import {
    createEvent,
    listEvent,
    updateEvent,
    removeEvent,
    handleCurrentMonth,
    updateImage
} from '../functions/fullcalendar';

import './Index.css'

const Index = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [values, setValues] = useState({
        title: '',
        start: '',
        end: '',
        color: ''
    })
    const [events, setEvents] = useState([])
    const [currentEvent, setCurrentEvent] = useState([])

    const [id, setId] = useState('')
    const [file, setFile] = useState('')
    const [image, setImage] = useState('')

    const department = [
        { id: '1', name: 'แผนกบัญชี', color: 'red' },
        { id: '2', name: 'แผนกการเงิน', color: '#55A9F7' },
        { id: '3', name: 'แผนกไอที', color: '#1DCF0E' },
    ]
    useEffect(() => {
        loadData()
        drag()
    }, [])
    const loadData = () => {
        listEvent()
            .then(res => {
                setEvents(res.data)
            }).catch(err => {
                console.log(err)
            })
    }
    const drag = () => {
        let dragable = document.getElementById("external-event")
        new Draggable(dragable, {
            itemSelector: ".fc-event",
            eventData: function (eventEl) {
                let id = eventEl.getAttribute("id")
                let title = eventEl.getAttribute("title")
                let color = eventEl.getAttribute("color")

                return {
                    id: id,
                    title: title,
                    color: color
                }
            }
        })
    }
    const handleClick = (info) => {
        showModal1()
        const id = info.event._def.extendedProps._id
        setId(id)
        setImage(info.event._def.extendedProps.filename)
    }

    const handleRemove = () => {
        removeEvent(id)
            .then(res => {
                //code
                loadData()
                console.log(res)
            }).catch(err => {
                //error
                console.log(err)
            })
        setIsModalVisible1(false);
    }




    const handleFile = (e) => {
        const fileInput = e.target.files[0]
        setFile(fileInput)
    }





    const handleRecieve = (eventInfo) => {
        console.log(eventInfo)
        let value = {
            id: eventInfo.draggedEl.getAttribute("id"),
            title: eventInfo.draggedEl.getAttribute("title"),
            color: eventInfo.draggedEl.getAttribute("color"),
            start: eventInfo.dateStr,
            end: moment(eventInfo.dateStr).add(+1, "days").format('YYYY-MM-DD')
        }
        console.log('value', value)
        createEvent(value)
            .then(res => {
                // loadData()
            }).catch(err => {
                console.log(err)
            })
    }
    const currentMonth = (info) => {
        const m = info.view.calendar.currentDataManager.data.currentDate
        const mm = moment(m).format('M')
        handleCurrentMonth({ mm })
            .then(res => {
                setCurrentEvent(res.data)
            }).catch(err => {
                console.log(err)
            })
    }
    const handleSelect = (info) => {
        showModal();
        console.log(info)
        setValues({
            ...values,
            start: info.startStr,
            end: info.endStr
        })
    }
    // Handle Change Resize
    const handleChange = (info) => {
        // console.log(info.event._def.extendedProps._id)
        // console.log(info.event.startStr, info.event.endStr)
        const values = {
            id: info.event._def.extendedProps._id,
            start: info.event.startStr,
            end: info.event.endStr
        }
        updateEvent(values)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }





    const onChangeValues = (e) => {
        console.log(e.target.value)
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        console.log(values)
        createEvent(values)
            .then(res => {
                setValues({ ...values, title: '' })
                loadData()

            }).catch(err => {
                console.log(err)
            })
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setValues({ ...values, title: '' })
        setIsModalVisible(false);
    };


    const showModal1 = () => {
        setIsModalVisible1(true);
    };
    const handleOk1 = () => {
        console.log(id, file)
        const formData = new FormData();
        formData.append('id', id)
        formData.append('file', file)
        updateImage(formData)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        setIsModalVisible1(false);
    };
    const handleCancel1 = () => {
        setIsModalVisible1(false);
        setImage('')
    };


    console.log(currentEvent)

    const d = moment(new Date()).format('DD/MM/YYYY')
    const r = new Date();
    const filterDate = currentEvent.filter((item) => {
        return d == moment(item.start).format('DD/MM/YYYY')
    })

    const betweenDate = currentEvent.filter(item => {
        return r >= moment(item.start) && r < moment(item.end)
    })
    console.log('between', betweenDate)
    // window.location.reload();
    return (
        <>
            <Row>
                <Col span={6}>
                    <Card>
                        <div id="external-event">
                            <ul>
                                {department.map((item, index) =>
                                    <li
                                        className="fc-event"
                                        id={item.id}
                                        title={item.name}
                                        color={item.color}
                                        key={index}
                                        style={{ backgroundColor: item.color }}>
                                        {item.name}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </Card>
                    <Card>
                        <ol>
                            {currentEvent.map((item, index) =>
                                <li key={index}>
                                    {d == moment(item.start).format('DD/MM/YYYY')
                                        ? <>{moment(item.start).format('DD/MM/YYYY') + "-" + item.title}<Tag color="green">วันนี้</Tag></>
                                        : r >= moment(item.start) && r < moment(item.end)
                                            ? <>{moment(item.start).format('DD/MM/YYYY') + "-" + item.title}<Tag color="yellow">อยู่ระหว่างดำเนินการ</Tag></>
                                            : <>{moment(item.start).format('DD/MM/YYYY') + "-" + item.title}</>
                                    }
                                </li>
                            )}
                        </ol>
                    </Card>
                </Col>
                <Col span={18}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        events={events}
                        selectable={true}
                        select={handleSelect}
                        drop={handleRecieve}
                        datesSet={currentMonth}
                        eventClick={handleClick}
                        editable={true}
                        eventChange={handleChange}
                    />
                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <input name="title" value={values.title} onChange={onChangeValues} />
                        <select name="color" onChange={onChangeValues}>
                            <option key={999} value="">--กรุณาเลือกแผนก--</option>
                            {department.map((item, index) =>
                                <option key={index}
                                    value={item.color}
                                    style={{ backgroundColor: item.color }}
                                >{item.name}</option>
                            )}
                        </select>
                    </Modal>
                    <Modal
                        title="Basic Modal"
                        visible={isModalVisible1}
                        onOk={handleOk1}
                        onCancel={handleCancel1}
                        footer={[
                            <button onClick={handleOk1}>Submit</button>,
                            <button onClick={handleCancel1}>Cancel</button>,
                            <button onClick={handleRemove}>Delete</button>
                        ]}
                    >
                        <h1>รายละเอียด</h1>
                        <img src={`${process.env.REACT_APP_IMAGE}/${image}`} width="100%" />
                        <input type="file" onChange={handleFile} name="file" />
                    </Modal>
                    {/* datesSet={getCurrent} */}
                </Col>
            </Row>
        </>
    )
}

export default Index

