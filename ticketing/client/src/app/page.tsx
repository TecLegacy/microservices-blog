'use client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Home() {
  return (
    <>
      <h1>Hello</h1>

      <Button
        variant="default"
        className=""
        // className=" bg-white  underline-offset-4 hover:underline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
    </>
  );
}
