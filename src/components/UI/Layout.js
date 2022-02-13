import classes from './Layout.module.css';

const Layout=(props)=>{
    console.log(props.className);
    let passedClasses=props.className?props.className:'';
    let totalClasses=`${classes.layout} ${passedClasses}`;
    return (
        <div className={totalClasses}>{props.children}</div>
    )
}

export default Layout;