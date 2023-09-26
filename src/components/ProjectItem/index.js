import './index.css'

const ProjectItem = props => {
  const {project} = props
  const {name, imageUrl} = project

  return (
    <li className="list-item">
      <img src={imageUrl} alt={name} />
      <div className="name-container">
        <p>{name}</p>
      </div>
    </li>
  )
}

export default ProjectItem
