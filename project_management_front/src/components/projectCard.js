// const data = fetch('') {
// {if(res.True)    data = {name, descripcion, status}}
// 
// 


export default function ProjectCard({name, descripcion, status}){




    return(
        <>
        
        <div>
            <div>
                <h1> {name}</h1>
            </div>
            <div>
                {descripcion}
            </div>
            <p>
                {status}
            </p>
        </div>
        
        
        </>
    )

}