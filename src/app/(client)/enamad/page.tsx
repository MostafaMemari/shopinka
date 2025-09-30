import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function page() {
  return (
    <Link referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=563648&Code=bGFPfEEW5xEdSpdeU3GkXfJcZzVeOvDs">
      <Image
        referrerPolicy="origin"
        src="https://trustseal.enamad.ir/logo.aspx?id=563648&Code=bGFPfEEW5xEdSpdeU3GkXfJcZzVeOvDs"
        alt="Enamad"
        style={{ cursor: 'pointer' }}
      />
    </Link>
  );
}

export default page;
