import React, { useEffect, useState, useMemo } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Accordion, AccordionTab } from 'primereact/accordion';
import HeaderTemplate from "./HeaderTemplate";
import DatePicker from "react-multi-date-picker";
import '../../../assets/scss/HomeWork.scss';
import formatDate from '../../elements/formatDate';
import { months, weekDays } from '../../elements/GlobalValiable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkDemo } from '../../../redux/workSlice';
import Loader from '../../elements/Loader';

function HomeWork() {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0); // tabs view
    const [selectedCities, setSelectedCities] = useState(null); // option select
    const dataJob = useSelector((state) => state.work.listWorkDemo);
    const isError = useSelector((state) => state.work.error);
    const isLoading = useSelector((state) => state.work.loading);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const listJob = [
        { name: 'Từ chối thực hiện', code: '0' },
        { name: 'Chờ duyệt thực hiện', code: '1' },
        { name: 'Đang thực hiện', code: '2' },
        { name: 'Chờ duyệt hoàn thành', code: '3' },
        { name: 'Hoàn thành', code: '4' },
        { name: 'Đã hủy', code: '5' }
    ];

    const ArrStatusJob = [
        'Từ chối thực hiện',
        'Chờ duyệt thực hiện',
        'Đang thực hiện',
        'Chờ duyệt hoàn thành',
        'Hoàn thành',
        'Đã hủy'
    ];

    const ArrColorStatus = [
        '#ff7215',
        '#f5f82a',
        '#16c1f5',
        '#31f794',
        '#1eff43',
        '#b30000'
    ];

    const ArrDepartment = [
        'Kỹ thuật',
        'DV-CSKH',
        'HCTH',
        'Inbound',
        'Giám đốc',
        'Outbound',
        'Đào tạo'
    ];

    const [jobPresent, setJobPresent] = useState([]);
    const [jobPast, setJobPast] = useState([]);

    useEffect(() => {
        const jobData = [
            {
                jobName: 'Phát triển hệ thống ERP',
                assignedTo: 'Nguyễn Văn A',
                startDate: '2024-09-01',
                endDate: '2024-09-30',
                status: 1, // Từ chối thực hiện
                department: 1 // Phòng Kỹ thuật
            },
            {
                jobName: 'Tối ưu hóa hiệu suất website',
                assignedTo: 'Trần Thị B',
                startDate: '2024-09-15',
                endDate: '2024-10-15',
                status: 2, // Chưa bắt đầu
                department: 2 // Phòng Marketing
            },
            {
                jobName: 'Nâng cấp phần mềm kế toán',
                assignedTo: 'Lê Văn C',
                startDate: '2024-07-20',
                endDate: '2024-08-20',
                status: 3, // Hoàn thành
                department: 1 // Phòng Kỹ thuật
            },
            {
                jobName: 'Tạo báo cáo tài chính quý 3',
                assignedTo: 'Phạm Thị D',
                startDate: '2024-06-10',
                endDate: '2024-07-10',
                status: 4, // Đã thực hiện
                department: 3 // Phòng Tài chính
            },
            {
                jobName: 'Hỗ trợ khách hàng',
                assignedTo: 'Nguyễn Thị E',
                startDate: '2023-10-01',
                endDate: '2023-11-01',
                status: 0, // Chưa bắt đầu
                department: 4 // Phòng Hỗ trợ khách hàng
            }
        ];
        dispatch(fetchWorkDemo(jobData));
    }, [dispatch])

    const [dataFilter, setDataFilter] = useState({
        statusFilter: 0,
        dataFilter: '',
        statusJob: ''
    });

    const { newJobPresent, newJobPast } = useMemo(() => {
        const currentDate = new Date();
        const newJobPresent = [];
        const newJobPast = [];

        Object.entries(dataJob).map(([key, item]) => { // Xử lý chia dữ liệu thành 2 mảng
            let endDate = new Date(item.endDate);
            const timeDiff = endDate.getTime() - currentDate.getTime();
            const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
            item = { ...item, dayDiff: Math.round(dayDiff) }; // Tính số ngày còn lại
            if (endDate >= currentDate) {
                return newJobPresent.push(item);
            } else {
                return newJobPast.push(item);
            }
        })

        return { newJobPresent, newJobPast };

    }, [dataJob])


    useEffect(() => {
        setJobPresent(newJobPresent);
        setJobPast(newJobPast);
    }, [newJobPresent, newJobPast]);


    function handleDate(dateValue) { // Chuyển đổi định dạng ngày
        const date = new Date(dateValue);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const handleFilterDate = (dates) => {

        if (!dates || dates.length === 0) {
            // Xử lý trường hợp không có giá trị ngày được chọn
            setDataFilter({ dataFilter: '' });
            setJobPresent(newJobPresent);
            setJobPast(newJobPast);
            return;
        }

        const [start, end] = Array.isArray(dates) ? dates : [dates, null];
        setStartDate(start);
        setEndDate(end);

        const startDate = new Date(handleDate(dates[0]));
        var endDate;

        console.log(dates)
        if (dates.length === 2) {
            endDate = new Date(handleDate(dates[1]));
        }
        const dataFilterPresent = [];
        const dataFilterPast = [];
        dataJob.forEach(item => {
            let sD = new Date(item.startDate);
            let eD = new Date(item.endDate);
            const date = new Date();
            const timeDiff = eD.getTime() - date.getTime();
            const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
            item = { ...item, dayDiff: Math.round(dayDiff) };

            if ((sD - startDate) >= 0 && (eD - endDate) <= 0) {
                return dataFilterPresent.push(item);
            } else {
                return dataFilterPast.push(item);
            }
        })
        setJobPresent(dataFilterPresent);
        setJobPast(dataFilterPast);
        setDataFilter({ statusFilter: 1, dataFilter: dates })
    }

    const handleFilterStatus = (arrStatus) => {

        const filterStatusPresent = [];
        const filterStatusPast = [];

        arrStatus.forEach((item, index) => {
            setDataFilter({
                statusJob: { ...dataFilter.statusJob, [item.code]: item.name }
            })
            filterStatusPresent[index] = newJobPresent.filter(itemPresent => itemPresent.status === Number(item.code));
            filterStatusPast[index] = newJobPast.filter(itemPast => itemPast.status === Number(item.code));
        })

        setJobPresent(filterStatusPresent.flat()); // flat chuyển arrays thành 1 mảng phẳng
        setJobPast(filterStatusPast.flat());
        setDataFilter({ statusFilter: 1 })
    }
    return (
        <div className="home-work-wrapper flex-1">
            <div className='filter-tabs-wrapper'>
                <div className='filter-wrap'>
                    <span className='icon-filter'><i class="fa fa-filter" aria-hidden="true"></i></span>
                    <div className='datepicker'>
                        <DatePicker vselected={startDate}
                            onChange={handleFilterDate}
                            startDate={startDate}
                            endDate={endDate} name='filter-date' range rangeHover dateSeparator=" - " months={months} weekDays={weekDays} customInput={
                                <input
                                    readOnly
                                    className="custom-input"
                                />
                            } placeholder='Chọn ngày bắt đầu và kết thúc' />
                    </div>
                    <div className="multi-select card flex justify-content-center">
                        <MultiSelect value={selectedCities} name='filter-status' onChange={(e) => { setSelectedCities(e.value); handleFilterStatus(e.value) }} options={listJob} optionLabel="name"
                            placeholder="Trạng thái công việc" maxSelectedLabels={2} className="w-full md:w-20rem" />
                    </div>
                </div>

                <div className="tabs-view">
                    <Button onClick={() => setActiveIndex(0)} className="button-tab mr-4 w-2rem h-2rem p-0" rounded outlined={activeIndex !== 0} label={<HeaderTemplate icon={`fa-list`} title={`Danh sách`} />} />
                    <Button onClick={() => setActiveIndex(1)} className="button-tab w-2rem h-2rem p-0" rounded outlined={activeIndex !== 1} label={<HeaderTemplate icon={`fa-table`} title={`Bảng`} />} />
                </div>
            </div>

            <div className="content-tabs">

                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel>
                        {isError && !isLoading && <div>Đã xảy ra lỗi. Vui lòng thử lại</div>}

                        {isLoading && (<Loader />)}

                        {!isLoading && (
                            <Accordion multiple activeIndex={[0, 1]}>
                                <AccordionTab header="Tháng này">
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
                                                        <tr key={index}>
                                                            <td>{item.jobName}</td>
                                                            <td>{item.assignedTo}</td>
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
                                <AccordionTab header="Tháng trước">
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
                                                        <tr key={index}>
                                                            <td>{item.jobName}</td>
                                                            <td>{item.assignedTo}</td>

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
                        <p className="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                            ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                    </TabPanel>
                </TabView>


            </div>
        </div>
    )
}

export default HomeWork;

