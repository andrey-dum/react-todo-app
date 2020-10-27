import './index.scss'

const SidebarList = ({items}) => {
    return (
        <ul className="category__list">
            {/* <li className="todo__sidebar-title">
                <div className="todo__icon">
                    <BsList />
                </div>
                <span>All tasks</span>
            </li> */}
            {items.map(item => <li key={item.id} className={item.active ? 'active' : ''}>
                <div className="todo__icon">
                    {item.icon || <span className="colorIcon" style={{background: item.color}}></span>  }
                </div>
                <span>{item.name}</span>
            </li>)}
        </ul>
    );
}

export default SidebarList;