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
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Test555';

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

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us | Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Have questions or need assistance? Contact ${projectName} today. Our team is ready to help you with any inquiries or support you need.`}
        />
      </Head>
      <WebSiteHeader projectName={'Test555'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Test555'}
          image={['Customer support team assisting clients']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to assist you with any questions or support you need. Reach out to ${projectName} and let us help you enhance your legal operations.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Contact Us Now`}
        />

        <ContactFormSection
          projectName={'Test555'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person filling out contact form']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need support? Contact us anytime, and our team will respond within 24 hours to assist you.`}
        />
      </main>
      <WebSiteFooter projectName={'Test555'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
