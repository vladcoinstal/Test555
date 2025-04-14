import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import TestimonialsSection from '../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

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
      name: 'Unified Dashboard',
      description:
        "Access all your department's data in one place. Stay informed with real-time updates and insights to make informed decisions quickly.",
      icon: 'mdiViewDashboard',
    },
    {
      name: 'Lead Management',
      description:
        'Effortlessly track and manage leads through every stage. Prioritize follow-ups and ensure no opportunity is missed.',
      icon: 'mdiAccountMultiple',
    },
    {
      name: 'Document Collaboration',
      description:
        'Collaborate on legal documents seamlessly. Share, edit, and review files with your team, ensuring accuracy and efficiency.',
      icon: 'mdiFileDocumentEdit',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has revolutionized our workflow. The seamless integration between departments has saved us countless hours each week.',
      company: 'Legal Innovators Inc.',
      user_name: 'John Doe, Head of Operations',
    },
    {
      text: "The lead management feature is a game-changer. We've seen a 30% increase in conversions since implementing ${projectName}.",
      company: 'Justice Partners LLC',
      user_name: 'Jane Smith, Sales Director',
    },
    {
      text: 'Our team collaboration has never been better. ${projectName} makes document sharing and editing a breeze.',
      company: 'LawTech Solutions',
      user_name: 'Emily Johnson, Senior Attorney',
    },
    {
      text: 'I love how intuitive and user-friendly ${projectName} is. It has made my job so much easier and more efficient.',
      company: 'Advocate Alliance',
      user_name: 'Michael Brown, Customer Service Manager',
    },
    {
      text: 'The insights and analytics provided by ${projectName} are invaluable. We can now make data-driven decisions with confidence.',
      company: 'Legal Visionaries',
      user_name: 'Sarah Williams, Marketing Lead',
    },
    {
      text: "${projectName} has transformed our client interactions. The CRM's features are tailored perfectly for the legal industry.",
      company: 'Counsel Connect',
      user_name: 'David Lee, Client Relations Specialist',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`CRM Solutions for the Law Industry | Connect & Organize`}</title>
        <meta
          name='description'
          content={`Discover our CRM app tailored for the law industry, connecting departments like sales, customer service, and marketing. Streamline your operations and track leads efficiently.`}
        />
      </Head>
      <WebSiteHeader projectName={'Test 444'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Test 444'}
          image={['Law professionals collaborating efficiently']}
          mainText={`Revolutionize Your Legal Operations Today`}
          subTitle={`Experience seamless integration with ${projectName}, the CRM designed for the law industry. Connect departments, track leads, and organize effortlessly.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'Test 444'}
          image={['Dashboard showcasing CRM features']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Unlock the full potential of your legal operations with ${projectName}. Streamline processes, enhance collaboration, and drive efficiency.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'Test 444'}
          image={['Team collaborating in modern office']}
          mainText={`Empowering Legal Teams with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming the way legal professionals work. Our CRM is designed to connect departments, streamline operations, and enhance productivity across the board.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <TestimonialsSection
          projectName={'Test 444'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Test 444'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime. Our team is ready to assist you with any inquiries or support you need. Expect a response within 24 hours.`}
        />
      </main>
      <WebSiteFooter projectName={'Test 444'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
