import SidebarList from "./SidebarList/SidebarList";

const Sidebar = ({items}) => {
    return (
        <div className="todo__sidebar">
            <SidebarList items={items} />
        </div> 
    );
}

export default Sidebar;