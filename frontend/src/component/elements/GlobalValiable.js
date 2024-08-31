const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

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

const jobData = [
    {
        jobName: 'Phát triển hệ thống ERP',
        assignedTo: 'Nguyễn Văn A',
        startDate: '2024-09-01',
        endDate: '2024-09-30',
        status: 1,
        department: 1
    },
    {
        jobName: 'Tối ưu hóa hiệu suất website',
        assignedTo: 'Trần Thị B',
        startDate: '2024-09-15',
        endDate: '2024-10-15',
        status: 2,
        department: 2
    },
    {
        jobName: 'Nâng cấp phần mềm kế toán',
        assignedTo: 'Lê Văn C',
        startDate: '2024-07-20',
        endDate: '2024-08-20',
        status: 3,
        department: 1
    },
    {
        jobName: 'Tạo báo cáo tài chính quý 3',
        assignedTo: 'Phạm Thị D',
        startDate: '2024-06-10',
        endDate: '2024-07-10',
        status: 4,
        department: 3
    },
    {
        jobName: 'Hỗ trợ khách hàng',
        assignedTo: 'Nguyễn Thị E',
        startDate: '2023-10-01',
        endDate: '2023-11-01',
        status: 0,
        department: 4
    },
    {
        jobName: 'Tuyển dụng nhân sự',
        assignedTo: 'Nguyễn Trung',
        startDate: '2024-10-01',
        endDate: '2024-11-01',
        status: 0,
        department: 4
    }
];

module.exports = {
    weekDays,
    months,
    listJob,
    ArrStatusJob,
    ArrColorStatus,
    ArrDepartment,
    jobData
}