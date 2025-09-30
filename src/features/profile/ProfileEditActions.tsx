'use client';

import { useRef, useState } from 'react';
import ProfileField from './ProfileField';
import MobileDrawer from '../../components/common/Drawer';
import FullNameForm from './FullNameForm';
import { useChangeFullName } from '@/hooks/reactQuery/user/userUser';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Dialog from '../../components/common/Dialog';
import useIsMdUp from '@/hooks/useIsMdUp';
import ErrorState from './ErrorState';
import { useAppSelector } from '@/store/hooks';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useLoginUser } from '@/features/auth/hooks/useLoginUser';
import PrimaryButton from '@/components/common/PrimaryButton';

interface ProfileFieldType {
  label: string;
  value: string;
  status?: 'unverified' | 'not-set' | 'verified';
  onEdit?: () => void;
}

const ProfileEditActions = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const loginUser = useLoginUser();
  const { changeFullName, isChangeFullNameLoading } = useChangeFullName();
  const isMounted = useIsMounted();
  const isMdUp = useIsMdUp();
  const formRef = useRef<HTMLFormElement>(null);
  const [modalState, setModalState] = useState<{ type: string | null; isOpen: boolean }>({ type: null, isOpen: false });

  const profileData = {
    fullName: user?.full_name || '',
    mobile: user?.mobile || '',
  };

  const fields: ProfileFieldType[] = [
    {
      label: 'نام و نام خانوادگی',
      value: profileData.fullName,
      onEdit: () => setModalState({ type: 'fullName', isOpen: true }),
    },
    {
      label: 'شماره موبایل',
      value: profileData.mobile,
      status: 'verified',
    },
  ];

  const handleFormSubmit = async (values: { fullName: string }) => {
    if (!user) return;
    changeFullName(values, () => {
      loginUser({ ...user, full_name: values.fullName, mobile: user.mobile || '' });
      setModalState({ type: null, isOpen: false });
      formRef.current?.reset();
    });
  };
  const handleSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const renderFormContent = () => (
    <FullNameForm onSubmit={handleFormSubmit} ref={formRef} initialValues={{ fullName: profileData.fullName }} />
  );

  return (
    <>
      <div className="mb-8 space-y-4">
        {isLoading || !isMounted ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState />
        ) : (
          <>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {fields.map((field) => (
                <ProfileField key={field.label} label={field.label} value={field.value} status={field.status} onEdit={field.onEdit} />
              ))}
            </div>

            {isMdUp ? (
              <Dialog
                open={modalState.isOpen && modalState.type === 'fullName'}
                onOpenChange={(open) => setModalState({ type: 'fullName', isOpen: open })}
                title="تغییر نام و نام خانوادگی"
                actions={
                  <PrimaryButton
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1"
                    disabled={isChangeFullNameLoading}
                    isLoading={isChangeFullNameLoading}
                  >
                    {isChangeFullNameLoading ? '' : 'ثبت نام و نام خانوادگی'}
                  </PrimaryButton>
                }
              >
                {renderFormContent()}
              </Dialog>
            ) : (
              <MobileDrawer
                open={modalState.isOpen}
                onOpenChange={(open) => setModalState({ type: 'fullName', isOpen: open })}
                title="تغییر نام و نام خانوادگی"
                actions={
                  <PrimaryButton
                    type="button"
                    className="flex-1"
                    onClick={handleSubmit}
                    isLoading={isChangeFullNameLoading}
                    disabled={isChangeFullNameLoading}
                  >
                    {isChangeFullNameLoading ? '' : 'ثبت نام و نام خانوادگی'}
                  </PrimaryButton>
                }
              >
                {renderFormContent()}
              </MobileDrawer>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfileEditActions;
