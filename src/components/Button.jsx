export default function Button({width, height, text, color}){
    return(
        <>
            <button 
                className={`${width} ${height} !border-2 !border-black !text-white !text-xl`}
                style={{backgroundColor: color}}
            >
                {text}
            </button>
        </>
    )
}