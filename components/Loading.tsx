interface LoadingOverlayProps {
    status: string;
  }
  
  export default function LoadingOverlay({ status }: LoadingOverlayProps) {
    const getStatusMessage = () => {
      switch (status) {
        case 'loading':
          return 'Loading...';
        case 'deleting':
          return 'Deleting...';
        case 'adding':
          return 'Adding...';
        case 'updating':
          return 'Updating...';
        default:
          return '';
      }
    };
  
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='loader text-lg font-bold text-black bg-white p-4 rounded-xl shadow-lg'>
          {getStatusMessage()}
        </div>
      </div>
    );
  }
  