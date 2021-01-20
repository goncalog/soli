import React from 'react';
import IntroCard from './IntroCard';
import { Link } from 'react-router-dom';

export default function ProjectsContainer(props) {
    return (
        <div className="projects-container">
            {props.projects.map((project, index) => {
                const features = project.features.map((item) => {
                    const feature = { name: item.name, value: item.value.toString() };
                    return feature;
                });
                
                return (
                    <Link 
                        className="project-link" 
                        to={(props.match.params.id)
                                ? `/owner/${props.match.params.id}/project/${project.id}` 
                                : `/project/${project.id}`} 
                        key={index}
                    >
                        <IntroCard 
                            imagePath={project.imageUrls[0]} 
                            title={project.title} 
                            price={project.price.toString()} 
                            features={features}
                            key={index} 
                        />
                    </Link> 
                );
            })}
        </div>
    );
}
