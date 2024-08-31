import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import '../../assets/scss/DataTable.scss';

const MyDataTable = () => {
    // Dữ liệu mẫu
    const sampleData = [
        { id: 1, name: 'Nguyễn Văn A', email: 'nva@example.com', role: 'Quản trị viên', createdDate: '2023-01-01' },
        { id: 2, name: 'Trần Thị B', email: 'ttb@example.com', role: 'Người dùng', createdDate: '2023-02-15' },
        { id: 3, name: 'Lê Văn C', email: 'lvc@example.com', role: 'Người dùng', createdDate: '2023-03-20' },
        { id: 4, name: 'Phạm Thị D', email: 'ptd@example.com', role: 'Quản lý', createdDate: '2023-04-10' },
        { id: 5, name: 'Hoàng Văn E', email: 'hve@example.com', role: 'Người dùng', createdDate: '2023-05-05' },
        { id: 6, name: 'Đỗ Thị F', email: 'dtf@example.com', role: 'Người dùng', createdDate: '2023-06-30' },
        { id: 7, name: 'Bùi Văn G', email: 'bvg@example.com', role: 'Quản lý', createdDate: '2023-07-25' },
        { id: 8, name: 'Vũ Thị H', email: 'vth@example.com', role: 'Người dùng', createdDate: '2023-08-15' },
        { id: 9, name: 'Dương Văn I', email: 'dvi@example.com', role: 'Người dùng', createdDate: '2023-09-05' },
        { id: 10, name: 'Phan Thị J', email: 'ptj@example.com', role: 'Quản lý', createdDate: '2023-10-10' }
    ];

    const [data] = useState(sampleData);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedPageRows] = useState(10);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);


    const onSortChange = (e) => {
        setSortField(e.sortField);
        setSortOrder(e.sortOrder);
    };

    return (
        <div className='content-table-data'>
            <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search" />
                </span>
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Tìm kiếm"
                />
            </div>
            <DataTable
                value={data}
                paginator
                rows={selectedPageRows}
                rowsPerPageOptions={[5, 10, 25, 50]}
                globalFilter={globalFilter}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={onSortChange}
            >
                <Column
                    field="name"
                    header="Tên"
                    sortable
                />
                <Column
                    field="email"
                    header="Email"
                    sortable
                />
                <Column
                    field="role"
                    header="Vai trò"
                    sortable
                />
                <Column
                    field="createdDate"
                    header="Ngày tạo"
                    sortable
                />
            </DataTable>
        </div>
    );
};

export default MyDataTable;
