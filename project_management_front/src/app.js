import ProjectCard from "./components/projectCard";
import ProjectContainer from "./components/projectContainer";

function Greeting({ name }) {
    return <h1>Hello, {name}</h1>;
  }

function Bye ({adios}){
    return<> 
        <h2> Adios, {adios}</h2>

    </>

    }


export default function App(){

    let cardInfo = 'Este proyecto, bla bla bla, guia patito'




    return (
    <>
    <Greeting name={'Genesis'}>

    </Greeting>
    
    <Bye adios={'Abimael'} />


    <ProjectCard name={'Ducketeers'} status={true} descripcion={cardInfo}></ProjectCard>
    <ProjectContainer/>
    </>
    )
    
    
}