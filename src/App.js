// src/App.js
import React, { useRef, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Accueil from './pages/Accueil';
import Projects from './pages/Projects';
import Competence from './pages/Competence';
import Contact from './pages/Contact';
import './App.css';

const { Header, Content, Footer } = Layout;

gsap.registerPlugin(ScrollToPlugin);

const App = () => {
  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const competenceRef = useRef(null);
  const contactRef = useRef(null);

  const skillRefs = useRef([]);
  const circleRef = useRef(null);

  const [currentSection, setCurrentSection] = useState('1');

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      if (scrollPosition >= contactRef.current.offsetTop) {
        setCurrentSection('4');
      } else if (scrollPosition >= competenceRef.current.offsetTop) {
        setCurrentSection('3');
      } else if (scrollPosition >= projectsRef.current.offsetTop) {
        setCurrentSection('2');
      } else {
        setCurrentSection('1');
      }
    };

    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (event) => {
      gsap.to(circleRef.current, {
        x: event.clientX - 100,
        y: event.clientY - 100,
        ease: 'power3.out',
        duration: 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (ref) => {
    gsap.to(window, { duration: 0, scrollTo: { y: ref.current.offsetTop - 64 } });
  };

  return (
    <Layout style={{ overflow: 'hidden' }}>
      <Header ref={headerRef} style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[currentSection]}>
          <Menu.Item key="1" onClick={() => scrollToSection(aboutRef)}>Accueil</Menu.Item>
          <Menu.Item key="2" onClick={() => scrollToSection(projectsRef)}>Projets</Menu.Item>
          <Menu.Item key="3" onClick={() => scrollToSection(competenceRef)}>Compétences</Menu.Item>
          <Menu.Item key="4" onClick={() => scrollToSection(contactRef)}>Contact</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64, overflowY: 'auto' }}>
        <Accueil ref={aboutRef} />
        <Projects ref={projectsRef} />
        <Competence ref={competenceRef} />
        <Contact ref={contactRef} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Rayan Ravelonirina ©2024</Footer>
      <div ref={circleRef} className="circle"></div>
    </Layout>
  );
};

export default App;
