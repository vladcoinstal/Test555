import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/metrics/metricsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditMetrics = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    value: '',

    branch: null,

    branches: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { metrics } = useAppSelector((state) => state.metrics);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { metricsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: metricsId }));
  }, [metricsId]);

  useEffect(() => {
    if (typeof metrics === 'object') {
      setInitialValues(metrics);
    }
  }, [metrics]);

  useEffect(() => {
    if (typeof metrics === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = metrics[el]));

      setInitialValues(newInitialVal);
    }
  }, [metrics]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: metricsId, data }));
    await router.push('/metrics/metrics-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit metrics')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit metrics'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='MetricName'>
                <Field name='name' placeholder='MetricName' />
              </FormField>

              <FormField label='Value'>
                <Field type='number' name='value' placeholder='Value' />
              </FormField>

              <FormField label='Branch' labelFor='branch'>
                <Field
                  name='branch'
                  id='branch'
                  component={SelectField}
                  options={initialValues.branch}
                  itemRef={'branches'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='branches' labelFor='branches'>
                <Field
                  name='branches'
                  id='branches'
                  component={SelectField}
                  options={initialValues.branches}
                  itemRef={'branches'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/metrics/metrics-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditMetrics.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_METRICS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMetrics;
