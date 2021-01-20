import React from 'react';
import ProjectsContainer from '../../../components/support/ProjectsContainer';
import IntroCard from '../../../components/support/IntroCard';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('ProjectsContainer', () => {
    let props;
    let shallowProjectsContainer;
    const projectsContainer = () => {
        if (!shallowProjectsContainer) {
            shallowProjectsContainer = shallow(<ProjectsContainer {...props} />);
        }
        return shallowProjectsContainer;
    }

    // This reset the props and shallowProjectsContainer variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowProjectsContainer to undefined here, when the next test runs, 
    // if it calls projectsContainer, a new ProjectsContainer will be created with the current props
    beforeEach(() => {
        props = {
            projects: [
                {
                    imageUrls: ['/path/to/projectOne/image1', '/path/to/projectOne/image2'],
                    title: 'Text to test title property #1',
                    price: 10000,
                    features: [
                        { 
                            name: 'Text to test name property #1.1',
                            value: 100,
                        },
                        { 
                            name: 'Text to test name property #1.2',
                            value: 200,
                        },
                        { 
                            name: 'Text to test name property #1.3',
                            value: 300,
                        },
                    ],
                    id: '12',    
                },
                {
                    imageUrls: ['/path/to/projectTwo/image1', '/path/to/projectTwo/image2'],
                    title: 'Text to test title property #2',
                    price: 20000,
                    features: [
                        { 
                            name: 'Text to test name property #2.1',
                            value: 400,
                        },
                        { 
                            name: 'Text to test name property #2.2',
                            value: 500,
                        },
                        { 
                            name: 'Text to test name property #2.3',
                            value: 600,
                        },
                    ],    
                    id: '34',    
                },
                {
                    imageUrls: ['/path/to/projectThree/image1', '/path/to/projectThree/image2'],
                    title: 'Text to test title property #3',
                    price: 30000,
                    features: [
                        { 
                            name: 'Text to test name property #3.1',
                            value: 700,
                        },
                        { 
                            name: 'Text to test name property #3.2',
                            value: 800,
                        },
                        { 
                            name: 'Text to test name property #3.3',
                            value: 900,
                        },
                    ],
                    id: '56',    
                },
                {
                    imageUrls: ['/path/to/four/image1', '/path/to/four/image2'],
                    title: 'Text to test title property #4',
                    price: 40000,
                    features: [
                        { 
                            name: 'Text to test name property #4.1',
                            value: 1000,
                        },
                        { 
                            name: 'Text to test name property #4.2',
                            value: 1100,
                        },
                        { 
                            name: 'Text to test name property #4.3',
                            value: 1200,
                        },
                    ],
                    id: '78',    
                },
            ],
            match: {
                params: {
                    id: '',
                }
            }
        }
        shallowProjectsContainer = undefined;
    });

    test('has 4 children', () => {
        expect(projectsContainer().children().length).toEqual(4);
    });

    test('has 4 Link components rendered with passed properties', () => {
        const shallowWrapper = projectsContainer().find(Link);
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((link, i) => {
            expect(link.prop('to')).toBe(`/project/${props.projects[i].id}`);
            expect(link.children().key()).toBe(i.toString());
        });
    });

    test('has 4 IntroCard components rendered with passed properties', () => {
        const shallowWrapper = projectsContainer().find(IntroCard);
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((project, i) => {
            expect(project.prop('imagePath')).toBe(props.projects[i].imageUrls[0]);
            expect(project.prop('title')).toBe(props.projects[i].title);
            expect(project.prop('price')).toBe(props.projects[i].price.toString());
            project.prop('features').forEach((feature, j) => {
                expect(feature.name).toBe(props.projects[i].features[j].name);
                expect(feature.value).toBe(props.projects[i].features[j].value.toString());
            });
            expect(project.key()).toBe(i.toString());
        });
    });
});
