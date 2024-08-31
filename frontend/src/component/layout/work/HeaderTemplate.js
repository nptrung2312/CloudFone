function HeaderTemplate({ icon, title }) {
    return (
        <div className="tabs-view-wrap">
            <span className="icon-tabs"><i className={`fa ${icon}`} aria-hidden="true"></i></span>&nbsp;
            <span className="title-tabs">{title}</span>
        </div>
    )
}

export default HeaderTemplate;