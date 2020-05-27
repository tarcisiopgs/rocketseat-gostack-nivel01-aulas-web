import React, {useState, useEffect} from 'react';

import api from './services/api';
import './App.css';

import Header from "./components/Header";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleAddProject() {
    api.post('projects', {title: `Novo projeto ${Date.now()}`, owner: 'teste'})
      .then(response => {
        setProjects([...projects, response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map((project, index) => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}
