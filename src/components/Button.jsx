export default function Button({width, height, text, color, onClick}){
    return(
        <>
            <button 
                className={`${width} ${height} !border-2 !border-black !text-white !text-xl cursor-pointer`}
                style={{backgroundColor: color}}
                onClick={onClick}
            >
                {text}
            </button>
        </>
    )
}