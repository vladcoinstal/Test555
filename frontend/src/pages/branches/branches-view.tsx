import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/branches/branchesSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const BranchesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { branches } = useAppSelector((state) => state.branches);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View branches')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View branches')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/branches/branches-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{branches?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Branches</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.users_branches &&
                      Array.isArray(branches.users_branches) &&
                      branches.users_branches.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!branches?.users_branches?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Activities branches</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ScheduledAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.activities_branches &&
                      Array.isArray(branches.activities_branches) &&
                      branches.activities_branches.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/activities/activities-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='scheduled_at'>
                            {dataFormatter.dateTimeFormatter(item.scheduled_at)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!branches?.activities_branches?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Contacts branches</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>FirstName</th>

                      <th>LastName</th>

                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.contacts_branches &&
                      Array.isArray(branches.contacts_branches) &&
                      branches.contacts_branches.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/contacts/contacts-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='first_name'>{item.first_name}</td>

                          <td data-label='last_name'>{item.last_name}</td>

                          <td data-label='email'>{item.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!branches?.contacts_branches?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Leads Branch</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>LeadName</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.leads_branch &&
                      Array.isArray(branches.leads_branch) &&
                      branches.leads_branch.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/leads/leads-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!branches?.leads_branch?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Leads branches</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>LeadName</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.leads_branches &&
                      Array.isArray(branches.leads_branches) &&
                      branches.leads_branches.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/leads/leads-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!branches?.leads_branches?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Metrics Branch</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>MetricName</th>

                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.metrics_branch &&
                      Array.isArray(branches.metrics_branch) &&
                      branches.metrics_branch.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/metrics/metrics-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='value'>{item.value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!branches?.metrics_branch?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Metrics branches</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>MetricName</th>

                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.metrics_branches &&
                      Array.isArray(branches.metrics_branches) &&
                      branches.metrics_branches.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/metrics/metrics-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='value'>{item.value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!branches?.metrics_branches?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Notes branches</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {branches.notes_branches &&
                      Array.isArray(branches.notes_branches) &&
                      branches.notes_branches.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/notes/notes-view/?id=${item.id}`)
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!branches?.notes_branches?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/branches/branches-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

BranchesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_BRANCHES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default BranchesView;
