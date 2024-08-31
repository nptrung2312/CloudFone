import React from 'react';
import FormElement from '../../elements/FormElement';
function EditWork(item) {
    let arrayPush = [];
    let arrayInput = [
        {
            'type': 'text',
            'name': 'workName',
            'text': 'Tên công việc',
            'require': 'required',
            'value': item.item.workName
        }, {
            'type': 'textarea',
            'name': 'workDetail',
            'text': 'Mô tả công việc',
            'require': 'required',
            'value': item.item.workDetail
        }, {
            'type': 'select',
            'name': 'typeOf',
            'text': 'Loại công việc',
            'require': 'required',
            'value': item.item.typeOf,
            'options': [
                { value: 0, name: 'Công việc trọng tâm' },
                { value: 1, name: 'Công việc phát sinh' },
                { value: 2, name: 'Công việc hàng ngày' }
            ]
        }, {
            'type': 'date',
            'name': 'startDate',
            'text': 'Ngày bắt đầu',
            'require': 'required',
            'value': item.item.startDate
        }, {
            'type': 'date',
            'name': 'endDate',
            'text': 'Ngày kết thúc',
            'require': 'required',
            'value': item.item.endDate
        }
    ]
    if (item.item.workType === 0) {
        arrayPush.push({
            'type': 'radio',
            'name': 'workType',
            'id': 'register-work',
            'value': 0,
            'check': 'check',
            'text': 'Đăng ký công việc',
        }, {
            'type': 'radio',
            'name': 'workType',
            'id': 'assign-work',
            'value': 1,
            'text': 'Giao việc',
        })
    } else {
        arrayPush.push({
            'type': 'radio',
            'name': 'workType',
            'id': 'register-work',
            'value': 0,
            'text': 'Đăng ký công việc',
        }, {
            'type': 'radio',
            'name': 'workType',
            'id': 'assign-work',
            'value': 1,
            'check': 'check',
            'text': 'Giao việc',
        })
    }
    arrayInput.splice(2, 0, ...arrayPush);
    return (
        <FormElement
            id={item.item.userId}
            api="editWork"
            titleForm="Sửa công việc"
            titleButton="Cập nhật"
            method="edit"
            workId={item.item.workId}
            arrInput={arrayInput} />
    );
}

export default EditWork;