function formatDate(Day) {
    const date = new Date(Day);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formatter = new Intl.DateTimeFormat('vi-VN', options);
    const parts = formatter.formatToParts(date);

    const day = parts.find(part => part.type === 'day').value;
    const month = parts.find(part => part.type === 'month').value;
    const year = parts.find(part => part.type === 'year').value;

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}

function handleDate(dateValue) { // Chuyển đổi định dạng ngày tháng năm
    const date = new Date(dateValue);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = {
    formatDate,
    handleDate
}