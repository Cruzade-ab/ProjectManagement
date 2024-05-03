


export default function projectDetails({ project}) {
    return (
        <div className="border ">
            <h3 className="">{project.name}</h3>
            <p className="">{project.description}</p>
            <p className="">{project.status}</p>
        </div>
    );
}
