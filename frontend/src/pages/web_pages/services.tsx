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
  FeaturesDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const features_points = [
    {
      name: 'Lead Tracking',
      description:
        'Efficiently manage and track leads through every stage of the sales process. Prioritize follow-ups and never miss an opportunity.',
      icon: 'mdiAccountMultiple',
    },
    {
      name: 'Document Management',
      description:
        'Streamline document collaboration with secure sharing and editing features. Ensure accuracy and efficiency in all legal documents.',
      icon: 'mdiFileDocumentEdit',
    },
    {
      name: 'Analytics \u0026 Insights',
      description:
        'Gain valuable insights with real-time analytics. Make informed decisions and drive your practice forward with data-driven strategies.',
      icon: 'mdiChartLine',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has streamlined our operations and improved our efficiency. The lead tracking feature is particularly impressive.',
      company: 'Legal Innovators Group',
      user_name: 'Sophia Turner, Operations Manager',
    },
    {
      text: 'The document management system in ${projectName} is a game-changer. It has made collaboration seamless and secure.',
      company: 'Justice Solutions LLC',
      user_name: 'Liam Johnson, Senior Partner',
    },
    {
      text: 'Our team loves the analytics feature. ${projectName} provides insights that help us make informed decisions quickly.',
      company: 'Advocate Alliance',
      user_name: 'Olivia Brown, Data Analyst',
    },
    {
      text: 'The support from the ${projectName} team is exceptional. They truly understand the needs of the legal industry.',
      company: 'LawTech Enterprises',
      user_name: 'Noah Davis, IT Director',
    },
    {
      text: "${projectName} has transformed our client interactions. The CRM's features are tailored perfectly for the legal industry.",
      company: 'Counsel Connectors',
      user_name: 'Emma Wilson, Client Relations Manager',
    },
    {
      text: 'I appreciate the intuitive design of ${projectName}. It has made managing our client interactions so much easier.',
      company: 'Legal Marketers Inc.',
      user_name: 'James Smith, Marketing Director',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services | Enhance Your Legal Operations`}</title>
        <meta
          name='description'
          content={`Explore the range of services offered by ${projectName}. From lead management to document collaboration, discover how we can transform your legal practice.`}
        />
      </Head>
      <WebSiteHeader projectName={'Test 444'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Test 444'}
          image={['Legal professionals in a meeting']}
          mainText={`Transform Your Practice with ${projectName}`}
          subTitle={`Discover the comprehensive services offered by ${projectName} to streamline your legal operations. From lead management to seamless document collaboration, we have you covered.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'Test 444'}
          image={['Icons representing various services']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Services`}
          subTitle={`Unlock the full potential of your legal practice with our tailored services. Discover how ${projectName} can enhance your operations.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'Test 444'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Client Success Stories with ${projectName} `}
        />

        <ContactFormSection
          projectName={'Test 444'}
          design={ContactFormDesigns.HIGHLIGHTED_DIVERSITY || ''}
          image={['Person typing on a laptop']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`We're here to assist you. Contact us anytime, and our team will respond within 24 hours to address your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'Test 444'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
