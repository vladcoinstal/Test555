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

import { update, fetch } from '../../stores/branches/branchesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditBranches = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { branches } = useAppSelector((state) => state.branches);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { branchesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: branchesId }));
  }, [branchesId]);

  useEffect(() => {
    if (typeof branches === 'object') {
      setInitialValues(branches);
    }
  }, [branches]);

  useEffect(() => {
    if (typeof branches === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = branches[el]));

      setInitialValues(newInitialVal);
    }
  }, [branches]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: branchesId, data }));
    await router.push('/branches/branches-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit branches')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit branches'}
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
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
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
                  onClick={() => router.push('/branches/branches-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditBranches.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_BRANCHES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditBranches;
