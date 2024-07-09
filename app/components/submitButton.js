 import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom'


 
export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button color='primary' type="submit" isDisabled={pending}>
      Add
    </Button>
  );
}
