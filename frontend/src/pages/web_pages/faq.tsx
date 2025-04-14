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
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'What features does ${projectName} offer?',
      answer:
        '${projectName} offers a range of features including lead tracking, document management, and real-time analytics. These tools are designed to streamline your legal operations and enhance collaboration.',
    },
    {
      question: 'How can ${projectName} benefit my legal practice?',
      answer:
        '${projectName} helps improve efficiency by connecting departments, organizing data, and providing insights. This allows legal professionals to focus on their core tasks and make informed decisions.',
    },
    {
      question: 'Is ${projectName} suitable for small law firms?',
      answer:
        'Yes, ${projectName} is scalable and can be tailored to meet the needs of both small and large law firms. Its user-friendly interface ensures easy adoption across teams.',
    },
    {
      question: 'How secure is the data stored in ${projectName}?',
      answer:
        '${projectName} prioritizes data security with robust encryption and regular backups. Your sensitive information is protected against unauthorized access.',
    },
    {
      question: "Can I customize ${projectName} to fit my firm's needs?",
      answer:
        "Absolutely! ${projectName} offers customization options to align with your firm's specific requirements, ensuring a personalized experience.",
    },
    {
      question: 'What kind of support does ${projectName} provide?',
      answer:
        'Our dedicated support team is available 24/7 to assist you with any questions or issues. We also offer comprehensive documentation and training resources.',
    },
    {
      question: 'How do I get started with ${projectName}?',
      answer:
        'Getting started is easy. Simply contact our team for a demo or sign up on our website to begin exploring the features of ${projectName}.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions | ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our services, features, and how we can assist your legal practice.`}
        />
      </Head>
      <WebSiteHeader projectName={'Test 444'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Test 444'}
          image={['Person reading FAQ on laptop']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn how our services can benefit your legal practice.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Test 444'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'Test 444'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
