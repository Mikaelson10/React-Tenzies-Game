export default function DieComponent(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : 'white'
    }
    
    return (
        <>
            <button onClick={props.handleClick} style={styles} className="dice-buttons">{props.value}</button>
        </>
    )
}