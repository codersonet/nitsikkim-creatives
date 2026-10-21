import React from "react";
import "../styles.css";
import "../stylesheets/clubs.css";

// Standalone UI example for React hosts; the static HTML site does not import it.
const previewProjects = [
  {
    id: "rover",
    title: "AUTONOMOUS_ROVER",
    club: "ROBOTICS SOCIETY",
    status: "IN DEVELOPMENT",
    description: "A student-led robotics project exploring autonomous navigation.",
    progress: 72,
    stack: "ROS2, C++, Python"
  },
  {
    id: "campus-app",
    title: "CAMPUS_TOOLS",
    club: "WEB DEVELOPMENT CLUB",
    status: "PROTOTYPE",
    description: "A sample project card for campus-focused web applications.",
    progress: 48,
    stack: "HTML, CSS, JavaScript"
  }
];

export default function CreativeParkPreview({ projects = previewProjects }) {
  return (
    <section className="clubs-section" aria-labelledby="react-preview-heading">
      <div className="section-header">
        <div>
          <span className="label-mono">// REACT_COMPONENT_PREVIEW</span>
          <h2 className="headline-lg" id="react-preview-heading">Student projects</h2>
        </div>
      </div>

      <div className="grid-container projects-grid">
        {projects.map((project) => (
          <article className="glass-card project-card" key={project.id}>
            <div>
              <div className="card-header">
                <span className="label-mono text-muted">// {project.club}</span>
                <span className="label-mono text-primary">{project.status}</span>
              </div>
              <h3 className="card-title">{project.title}</h3>
              <p className="body-md">{project.description}</p>
            </div>

            <div className="progress-container">
              <div className="card-header">
                <span className="label-mono">PROGRESS</span>
                <span className="label-mono text-primary">{project.progress}%</span>
              </div>
              <div
                className="progress-bar"
                role="progressbar"
                aria-label={`${project.title} progress`}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={project.progress}
              >
                <div className="progress-fill" style={{ width: `${project.progress}%` }} />
              </div>
              <span className="label-mono text-muted">{project.stack}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
