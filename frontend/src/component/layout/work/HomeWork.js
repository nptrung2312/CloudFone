import React, { useEffect, useState, useMemo } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Accordion, AccordionTab } from 'primereact/accordion';
import HeaderTemplate from "./HeaderTemplate";
import DatePicker from "react-multi-date-picker";
import '../../../assets/scss/HomeWork.scss';
import { formatDate, handleDate } from '../../elements/formatDate';
import { months, weekDays, listJob, ArrStatusJob, ArrColorStatus, ArrDepartment } from '../../elements/GlobalValiable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWork } from '../../../redux/workSlice';
import Loader from '../../elements/Loader';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import SlidingPanel from 'react-sliding-side-panel';
import FormElement from '../../elements/FormElement';
import EditWork from './EditWork';

function HomeWork() {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.user.userId);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCities, setSelectedCities] = useState(null);
    const dataJob = useSelector((state) => state.work.listWork);
    const isError = useSelector((state) => state.work.error);
    const isLoading = useSelector((state) => state.work.loading);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [jobPresent, setJobPresent] = useState([]);
    const [jobPast, setJobPast] = useState([]);
    const [openPanelAdd, setOpenPanelAdd] = useState(false);
    const [openPanelEdit, setOpenPanelEdit] = useState(false);
    const [itemEdit, setItemEdit] = useState();
    const [dataTabTable, setDataTabTable] = useState([]);

    useEffect(() => {
        dispatch(fetchWork(id));
    }, [id, dispatch])

    const { newJobPresent, newJobPast } = useMemo(() => {
        const currentDate = new Date();
        const newJobPresent = [];
        const newJobPast = [];

        Object.entries(dataJob).map(([key, item]) => {
            let endDate = new Date(item.endDate); // Chia mảng thành 2 mảng công việc sau đó tính thêm khoảng cách với ngày hiện tại
            const timeDiff = endDate.getTime() - currentDate.getTime();
            const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
            item = { ...item, dayDiff: Math.round(dayDiff) };
            if (endDate >= currentDate) {
                return newJobPresent.push(item);
            } else {
                return newJobPast.push(item);
            }
        })
        setDataTabTable([...newJobPresent, ...newJobPast])
        return { newJobPresent, newJobPast };

    }, [dataJob])

    useEffect(() => {
        setJobPresent(newJobPresent);
        setJobPast(newJobPast);
    }, [newJobPresent, newJobPast]);

    const handleFilterDateStatus = (dates, statuses) => { // Xử lý lọc dữ liệu
        let filteredJobsPresent = [...newJobPresent];
        let filteredJobsPast = [...newJobPast];

        if (dates && dates.length > 0) { // Xử lý lọc theo ngày bắt đầu và kết thúc
            const [start, end] = Array.isArray(dates) ? dates : [dates, null];
            setStartDate(start);
            setEndDate(end);

            const startDate = new Date(handleDate(start));
            const endDate = end ? new Date(handleDate(end)) : null;

            filteredJobsPresent = newJobPresent.filter(item => {
                const itemStartDate = new Date(item.startDate);
                const itemEndDate = new Date(item.endDate);
                return (!startDate || itemStartDate >= startDate) && (!endDate || itemEndDate <= endDate);
            });

            filteredJobsPast = newJobPast.filter(item => {
                const itemStartDate = new Date(item.startDate);
                const itemEndDate = new Date(item.endDate);
                return (!startDate || itemStartDate >= startDate) && (!endDate || itemEndDate <= endDate);
            });
        }

        if (statuses && statuses.length > 0) { // Xử lý lọc theo trạng thái
            filteredJobsPresent = filteredJobsPresent.filter(item =>
                statuses.some(status => Number(status.code) === item.status)
            );

            filteredJobsPast = filteredJobsPast.filter(item =>
                statuses.some(status => Number(status.code) === item.status)
            );
        }
        setJobPresent(filteredJobsPresent);
        setJobPast(filteredJobsPast);
        setDataTabTable([...filteredJobsPresent, ...filteredJobsPast])
    }

    // Tạo đối tượng lưu trữ các công việc theo trạng thái và tính toán số lượng
    const jobsByStatus = ArrStatusJob.reduce((acc, status, index) => {
        acc[index] = [];
        return acc;
    }, {});

    // Sắp xếp các công việc vào đối tượng jobsByStatus
    Object.entries(dataJob).forEach(([key, job]) => {
        if (jobsByStatus[job.status]) {
            jobsByStatus[job.status].push(job);
        }
    });

    return (
        <div className="home-work-wrapper flex-1">
            <div className='filter-tabs-wrapper'>
                <div className='filter-wrap'>
                    <span className='icon-filter'><i className="fa fa-filter" aria-hidden="true"></i></span>
                    <div className='datepicker'>
                        <DatePicker
                            selected={startDate}
                            onChange={(dates) => handleFilterDateStatus(dates, selectedCities)}
                            startDate={startDate}
                            endDate={endDate}
                            range rangeHover
                            dateFormat="dd/MM/yyyy"
                            months={months}
                            weekDays={weekDays}
                            placeholder="Chọn ngày bắt đầu và kết thúc"
                        />
                    </div>
                    <div className="multi-select card flex justify-content-center">
                        <MultiSelect
                            value={selectedCities}
                            name='filter-status'
                            onChange={(e) => { setSelectedCities(e.value); handleFilterDateStatus([startDate, endDate], e.value); }}
                            options={listJob}
                            optionLabel="name"
                            placeholder="Trạng thái công việc"
                            maxSelectedLabels={2}
                            className="w-full md:w-20rem"
                        />
                    </div>
                    <Tippy content="Thêm mới" placement="right">
                        <button className='btn-add-work' onClick={() => setOpenPanelAdd(true)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                    </Tippy>
                    <SlidingPanel
                        type={'right'}
                        isOpen={openPanelAdd}
                        size={50}
                        zIndex={50}
                        hideBackdrop={true} // Hiển thị backdrop
                        backdropClicked={() => setOpenPanelAdd(false)}
                    >
                        <div className='sidepanel-wrapper'>
                            <FormElement
                                id={id}
                                api="addWork"
                                titleForm="Thêm công việc"
                                titleButton="Lưu"
                                method="add"
                                arrInput={[
                                    {
                                        'type': 'text',
                                        'name': 'nameItem',
                                        'text': 'Tên công việc',
                                        'require': 'required'
                                    }, {
                                        'type': 'textarea',
                                        'name': 'desc',
                                        'text': 'Mô tả công việc',
                                        'require': 'required'
                                    }, {
                                        'type': 'radio',
                                        'name': 'workType',
                                        'id': 'register-work',
                                        'value': 0,
                                        'check': 'checked',
                                        'text': 'Đăng ký công việc'
                                    }, {
                                        'type': 'radio',
                                        'name': 'workType',
                                        'id': 'assign-work',
                                        'value': 1,
                                        'text': 'Giao việc'
                                    }, {
                                        'type': 'select',
                                        'name': 'typeOf',
                                        'text': 'Loại công việc',
                                        'require': 'required',
                                        'options': [
                                            { value: 0, name: 'Công việc trọng tâm' },
                                            { value: 1, name: 'Công việc phát sinh' },
                                            { value: 2, name: 'Công việc hàng ngày' }
                                        ]
                                    }, {
                                        'type': 'date',
                                        'name': 'startDate',
                                        'text': 'Ngày bắt đầu',
                                        'require': 'required'
                                    }, {
                                        'type': 'date',
                                        'name': 'endDate',
                                        'text': 'Ngày kết thúc',
                                        'require': 'required'
                                    }
                                ]} />
                            <Tippy content="Đóng" placement="left">
                                <button className='close-sidepanel' onClick={() => setOpenPanelAdd(false)}><i className="fa fa-times" aria-hidden="true"></i></button>
                            </Tippy>
                        </div>
                    </SlidingPanel>
                </div>

                <div className="tabs-view">
                    <Button onClick={() => setActiveIndex(0)} className="button-tab mr-4 w-2rem h-2rem p-0" rounded outlined={activeIndex !== 0} label={<HeaderTemplate icon={`fa-list`} title={`Danh sách`} />} />
                    <Button onClick={() => setActiveIndex(1)} className="button-tab w-2rem h-2rem p-0" rounded outlined={activeIndex !== 1} label={<HeaderTemplate icon={`fa-table`} title={`Bảng`} />} />
                </div>
            </div>
            <SlidingPanel
                type={'right'}
                isOpen={openPanelEdit}
                size={50}
                zIndex={50}
                hideBackdrop={true} // Hiển thị backdrop
                backdropClicked={() => setOpenPanelEdit(false)}
            >
                <div className='sidepanel-wrapper'>
                    <EditWork item={itemEdit} />
                    <Tippy content="Đóng" placement="left">
                        <button className='close-sidepanel' onClick={() => setOpenPanelEdit(false)}><i className="fa fa-times" aria-hidden="true"></i></button>
                    </Tippy>
                </div>
            </SlidingPanel>
            <div className="content-tabs">
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel>
                        {isError && !isLoading && <div>Đã xảy ra lỗi. Vui lòng thử lại</div>}

                        {isLoading && (<Loader />)}

                        {!isLoading && (
                            <Accordion multiple activeIndex={[0, 1]}>
                                <AccordionTab
                                    header={
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="title font-bold text-lg uppercase">
                                                Công việc hiện tại <span>({jobPresent.length})</span>
                                            </div>
                                        </div>
                                    }>
                                    {jobPresent.length ?
                                        <table className='list-info'>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '30%' }}>Tên công việc</th>
                                                    <th style={{ width: '20%' }}>Nhân sự</th>
                                                    <th style={{ width: '20%' }}>Ngày kết thúc</th>
                                                    <th style={{ width: '20%' }}>Trạng thái</th>
                                                    <th style={{ width: '10%' }}>Phòng / Ban</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    jobPresent.map((item, index) => (
                                                        <tr key={index} className='tabs-rows' onClick={() => { setItemEdit(item); setOpenPanelEdit(true) }} >

                                                            <td>{item.workName}</td>
                                                            <td>{item['user.firstName']} {item['user.lastName']}</td>
                                                            {item.status === 4
                                                                ?
                                                                <td>{formatDate(item.endDate)}</td>
                                                                :
                                                                <td>
                                                                    {formatDate(item.endDate)}
                                                                    &nbsp;<span className='date-present'>({`Còn ${Math.abs(item.dayDiff)} ngày`})</span>
                                                                </td>
                                                            }
                                                            <td style={{ color: ArrColorStatus[item.status] }}>{ArrStatusJob[item.status]}</td>
                                                            <td>{item.department ? ArrDepartment[item.department] : ''}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        :
                                        <div className='error-table'>Chưa có dữ liệu nào</div>
                                    }
                                </AccordionTab>
                                <AccordionTab
                                    header={
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="title font-bold text-lg uppercase">
                                                Công việc trước đó <span>({jobPast.length})</span>
                                            </div>
                                        </div>
                                    }>
                                    {jobPast.length ?
                                        <table className='list-info'>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '30%' }}>Tên công việc</th>
                                                    <th style={{ width: '20%' }}>Nhân sự</th>
                                                    <th style={{ width: '20%' }}>Ngày kết thúc</th>
                                                    <th style={{ width: '20%' }}>Trạng thái</th>
                                                    <th style={{ width: '10%' }}>Phòng / Ban</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    jobPast.map((item, index) => (
                                                        <tr onClick={() => { setItemEdit(item); setOpenPanelEdit(true) }} key={index} className='tabs-rows'>
                                                            <td>{item.workName}</td>
                                                            <td>{item['user.firstName']} {item['user.lastName']}</td>
                                                            {item.status === 4
                                                                ?
                                                                <td>{formatDate(item.endDate)}</td>
                                                                :
                                                                <td>
                                                                    {formatDate(item.endDate)}
                                                                    &nbsp;<span className='date-past'>({item.dayDiff < 0 ? `Trễ ${Math.abs(item.dayDiff)} ngày` : `Còn ${Math.abs(item.dayDiff)} ngày`})</span>
                                                                </td>
                                                            }

                                                            <td style={{ color: ArrColorStatus[item.status] }}>{ArrStatusJob[item.status]}</td>
                                                            <td>{item.department ? ArrDepartment[item.department] : ''}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        :
                                        <div className='error-table'>Chưa có dữ liệu nào</div>
                                    }
                                </AccordionTab>
                            </Accordion>
                        )}
                    </TabPanel>

                    <TabPanel>
                        <table className='list-info work-table-wrapper'>
                            <thead>
                                <tr>
                                    {
                                        ArrStatusJob.map((item, index) => (
                                            <th key={index} style={{ color: `${ArrColorStatus[index]}` }}>{item} {jobsByStatus[index] ? `(${jobsByStatus[index].length})` : `(0)`}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        ArrStatusJob.map((itemStatus, indexStatus) => (

                                            <td className='td-work-table' key={indexStatus} >
                                                {
                                                    dataTabTable && Object.entries(dataTabTable).map((item, index) => {
                                                        return item[1].status === indexStatus ?
                                                            < div className="item-box" key={index} onClick={() => { setItemEdit(item[1]); setOpenPanelEdit(true) }} >
                                                                <div className='info-job' style={{ borderColor: `${ArrColorStatus[indexStatus]}` }}>
                                                                    <div className='assigned'>
                                                                        <Tippy content={`${item[1]['user.firstName']} ${item[1]['user.lastName']}`} placement="top">
                                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                                        </Tippy>
                                                                    </div>
                                                                    <div className='date'>
                                                                        <Tippy content={formatDate(item[1].endDate)} placement="top">
                                                                            <i className="fa fa-calendar" aria-hidden="true"></i>
                                                                        </Tippy>
                                                                    </div>
                                                                </div>
                                                                <h3 className='name-job'>{item[1].workName}</h3>
                                                            </div>
                                                            :
                                                            ''
                                                    })
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </TabPanel>
                </TabView>
            </div>
        </div >
    )
}

export default HomeWork;
