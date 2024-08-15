 import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom'


 
export function SubmitButton({children}) {
  const { pending } = useFormStatus();

  return (
    <Button color='primary' type="submit" radius='full' className='mt-5' isDisabled={pending}>
      {children}
    </Button>
  );
}
