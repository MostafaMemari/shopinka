import Loader from '@/components/common/skeleton/Loader';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-background backdrop-blur-sm">
      <Loader />
    </div>
  );
}
