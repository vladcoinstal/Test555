import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Test 444';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has transformed our operations. The seamless integration and user-friendly interface have made a significant impact on our productivity.',
      company: 'Legal Pioneers Co.',
      user_name: 'Alice Thompson, Operations Manager',
    },
    {
      text: 'The support from the ${projectName} team is unparalleled. They truly understand the needs of the legal industry and provide exceptional service.',
      company: 'Justice Innovators Ltd.',
      user_name: 'Robert King, IT Director',
    },
    {
      text: "Our team collaboration has improved drastically since adopting ${projectName}. It's a must-have tool for any legal firm.",
      company: 'Advocate Solutions',
      user_name: 'Linda Green, Senior Partner',
    },
    {
      text: 'The insights we gain from ${projectName} are invaluable. It has empowered us to make data-driven decisions with confidence.',
      company: 'LawTech Enterprises',
      user_name: 'James White, Data Analyst',
    },
    {
      text: 'I appreciate the intuitive design of ${projectName}. It has made managing our client interactions so much easier.',
      company: 'Counsel Connectors',
      user_name: 'Emma Brown, Client Relations Manager',
    },
    {
      text: '${projectName} has been a game-changer for our marketing efforts. The lead tracking feature is particularly impressive.',
      company: 'Legal Marketers Inc.',
      user_name: 'Michael Johnson, Marketing Director',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us | Learn More About Our Mission and Team`}</title>
        <meta
          name='description'
          content={`Get to know the team behind ${projectName}. Learn about our mission, values, and how we are transforming the legal industry with our innovative CRM solutions.`}
        />
      </Head>
      <WebSiteHeader projectName={'Test 444'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Test 444'}
          image={['Team brainstorming in modern office']}
          mainText={`Meet the Visionaries Behind ${projectName}`}
          subTitle={`Discover the passion and dedication driving ${projectName}. Our team is committed to revolutionizing the legal industry with cutting-edge CRM solutions.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Story`}
        />

        <AboutUsSection
          projectName={'Test 444'}
          image={['Team members discussing project goals']}
          mainText={`Our Journey with ${projectName}`}
          subTitle={`At ${projectName}, we are driven by innovation and a commitment to excellence. Our mission is to empower legal professionals with tools that enhance efficiency and collaboration.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <TestimonialsSection
          projectName={'Test 444'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Satisfied Clients `}
        />

        <ContactFormSection
          projectName={'Test 444'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person using a smartphone']}
          mainText={`Connect with ${projectName} Today `}
          subTitle={`We're here to help. Reach out to us anytime, and our team will respond within 24 hours to assist with your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'Test 444'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
