export default function Button({width, height, text, bgColor, textColor, onClick}){
    return(
        <>
            <button 
                className={`${width} ${height} !border-2 !border-black !text-xl cursor-pointer`}
                style={{backgroundColor: bgColor, color: textColor}}
                onClick={onClick}
            >
                {text}
            </button>
        </>
    )
}